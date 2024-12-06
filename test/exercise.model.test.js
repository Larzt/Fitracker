import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Exer from '../src/models/exercise.model.js';
import User from '../src/models/user.model.js';
import { expect } from 'chai';
import request from 'supertest';

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

describe('Exer model', () => {
  let user;

  beforeEach(async () => {
    // Crear un usuario válido para usar como referencia en los tests
    user = new User({
      email: 'testuser@example.com',
      password: 'password123',
      username: 'testuser',
      age: 20,
      weight: 70,
      gender: 'masculino'
    });
    await user.save();
  });

  it('debería crear y guardar un ejercicio correctamente', async () => {
    const validExer = new Exer({
      name: 'Push-Up',
      description: 'A basic push-up exercise.',
      user: user._id,
    });

    const savedExer = await validExer.save();

    expect(savedExer._id).to.exist;
    expect(savedExer.name).to.equal('Push-Up');
    expect(savedExer.description).to.equal('A basic push-up exercise.');
    expect(savedExer.user.toString()).to.equal(user._id.toString());
  });

  it('debería requerir un nombre', async () => {
    const exerWithoutName = new Exer({
      description: 'Missing name test.',
      user: user._id,
    });

    let err;
    try {
      await exerWithoutName.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).to.exist;
  });

  it('debería requerir un usuario', async () => {
    const exerWithoutUser = new Exer({
      name: 'NoUserExercise',
      description: 'This exercise does not have a user.',
    });

    let err;
    try {
      await exerWithoutUser.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(err.errors.user).to.exist;
  });

  it('debería permitir un ejercicio sin descripción', async () => {
    const exerWithoutDescription = new Exer({
      name: 'NoDescriptionExercise',
      user: user._id,
    });

    const savedExer = await exerWithoutDescription.save();

    expect(savedExer._id).to.exist;
    expect(savedExer.name).to.equal('NoDescriptionExercise');
    expect(savedExer.description).to.be.undefined; // Campo opcional
  });
});