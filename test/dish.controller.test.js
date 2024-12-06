import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Dish from '../src/models/dish.model.js';
import User from '../src/models/user.model.js';
import { expect } from 'chai';

let mongoServer;

describe('Dish Controller Tests', () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  let user;

  beforeEach(async () => {
    // Crear un usuario para usar en los tests
    user = new User({
      email: 'testuser@example.com',
      password: 'password123',
      username: 'testuser',
      age: 25,
      weight: 70,
      gender: 'masculino',
    });
    await user.save();
  });

  afterEach(async () => {
    // Limpiar la base de datos después de cada test
    await mongoose.connection.db.dropDatabase();
  });

  it('debería crear un nuevo plato', async () => {
    const res = await chai
      .request(app)
      .post('/api/dishes') // Ajusta según la ruta
      .set('Authorization', `Bearer ${token}`)
      .send({ food: 'Pizza' }); // Asegúrate de enviar el campo requerido
  
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.food).to.equal('Pizza');
  });
  

  it('debería requerir un usuario para el plato', async () => {
    const dishWithoutUser = new Dish({
      name: 'Salad',
      calories: 150,
      ingredients: 'Lettuce, Tomato, Cucumber',
    });

    let error;
    try {
      await dishWithoutUser.save();
    } catch (err) {
      error = err;
    }

    expect(error).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(error.errors.user).to.exist;
  });
  
  it('debería obtener todos los platos de un usuario', async () => {
    await Dish.create({ name: 'Salad', calories: 150, ingredients: 'Lettuce, Tomato, Cucumber', user: user._id });
    await Dish.create({ name: 'Pizza', calories: 300, ingredients: 'Cheese, Tomato Sauce, Pepperoni', user: user._id });

    const res = await chai
      .request(app)
      .get('/api/dishes') // Ajusta según la ruta
      .set('Authorization', `Bearer ${token}`);
  
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(2);
  });

  it('debería obtener un plato específico por su ID', async () => {
    const dish = new Dish({
      name: 'Salad',
      calories: 150,
      ingredients: 'Lettuce, Tomato, Cucumber',
      user: user._id,
    });
    const savedDish = await dish.save();

    const res = await chai
      .request(app)
      .get(`/api/dishes/${savedDish.id}`) // Ajusta según la ruta
      .set('Authorization', `Bearer ${token}`);
  
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.equal('Salad');
  });
});