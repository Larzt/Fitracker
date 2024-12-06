import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Goal from '../src/models/goals.model.js';
import User from '../src/models/user.model.js';
import { expect } from 'chai';

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Goal API', () => {
  let user;

  beforeEach(async () => {
    // Crear un usuario válido con los campos requeridos por el modelo
    user = new User({
      email: 'testuser@example.com',
      password: 'password123',
      username: 'testuser',
      age: 25,             // Agregar `age`
      weight: 70,          // Agregar `weight`
      gender: 'masculino', // Agregar `gender`
    });
    await user.save();
  });

  it('debería crear y guardar un logro correctamente', async () => {
    const validGoal = new Goal({
      id: 'goal123',
      name: 'Run 5km',
      description: 'Run a total of 5 kilometers',
      user: user._id,
    });

    const savedGoal = await validGoal.save();

    expect(savedGoal._id).to.exist;
    expect(savedGoal.id).to.equal('goal123');
    expect(savedGoal.name).to.equal('Run 5km');
    expect(savedGoal.description).to.equal('Run a total of 5 kilometers');
    expect(savedGoal.user.toString()).to.equal(user._id.toString());
  });

  it('debería requerir un nombre para el logro', async () => {
    const goalWithoutName = new Goal({
      id: 'goal124',
      description: 'No name provided',
      user: user._id,
    });

    let err;
    try {
      await goalWithoutName.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).to.exist;
  });

  it('debería requerir un usuario para el logro', async () => {
    const goalWithoutUser = new Goal({
      id: 'goal125',
      name: 'Walk 10km',
      description: 'A goal without a user',
    });

    let err;
    try {
      await goalWithoutUser.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(err.errors.user).to.exist;
  });

  it('debería permitir un logro sin descripción', async () => {
    const goalWithoutDescription = new Goal({
      name: 'Run 15km',
      user: user._id,
    });

    const savedGoal = await goalWithoutDescription.save();

    expect(savedGoal._id).to.exist;
    expect(savedGoal.name).to.equal('Run 15km');
    expect(savedGoal.description).to.be.undefined; // Campo opcional
  });

  it('debería obtener todos los logros para el usuario autenticado', async () => {
    const res = await request(app)
      .get('/api/goals')
      .set('Authorization', `Bearer ${user._id}`);  // Asumiendo que tienes un middleware de autenticación

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].name).to.equal('Run 5km');
  });

  it('debería obtener un logro específico por su ID', async () => {
    const goal = new Goal({
      id: 'goal125',  // Asegúrate de proporcionar un valor único para el campo 'id'
      name: 'Swim 1km',
      description: 'A goal to swim 1 kilometer.',
      user: user._id,
    });

    const savedGoal = await goal.save();

    const res = await request(app)
      .get(`/api/goals/${savedGoal.id}`)  // Utilizar el 'id' para obtener el logro
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal('Swim 1km');
    expect(res.body.description).to.equal('A goal to swim 1 kilometer.');
  });

  it('debería eliminar un logro por su ID', async () => {
    const goal = new Goal({
      id: 'goal126',  // Asegúrate de proporcionar un valor único para el campo 'id'
      name: 'Walk 2km',
      description: 'A goal to walk 2 kilometers.',
      user: user._id,
    });

    const savedGoal = await goal.save();

    const res = await request(app)
      .delete(`/api/goals/${savedGoal.id}`)  // Utilizar el 'id' para eliminar el logro
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(204);
  });

  it('debería actualizar un logro correctamente', async () => {
    const goal = new Goal({
      id: 'goal127',  // Asegúrate de proporcionar un valor único para el campo 'id'
      name: 'Run 10km',
      description: 'A goal to run 10 kilometers.',
      user: user._id,
    });

    const savedGoal = await goal.save();

    const res = await request(app)
      .put(`/api/goals/${savedGoal.id}`)  // Utilizar el 'id' para actualizar el logro
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Run 20km',
        description: 'A goal to run 20 kilometers.',
      });

    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal('Run 20km');
    expect(res.body.description).to.equal('A goal to run 20 kilometers.');
  });
});
