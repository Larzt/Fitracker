import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Food from '../src/models/food.model.js';
import User from '../src/models/user.model.js';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js';  // Asumiendo que la aplicación está exportada desde 'app.js'

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

describe('Food API', () => {
  let user;

  beforeEach(async () => {
    // Crear un usuario válido para usar como referencia en los tests
    user = new User({
      email: 'testuser@example.com',
      password: 'password123',
      username: 'testuser',
      age: 20,
      weight: 70,
      gender: 'masculino',
    });
    await user.save();
  });

  it('debería crear y guardar un alimento correctamente', async () => {
    const validFood = new Food({
      name: 'Apple',
      calories: '95',
      ingredients: 'Apple',
      user: user._id,
    });

    const savedFood = await validFood.save();

    expect(savedFood._id).to.exist;
    expect(savedFood.name).to.equal('Apple');
    expect(savedFood.calories).to.equal('95');
    expect(savedFood.ingredients).to.equal('Apple');
    expect(savedFood.user.toString()).to.equal(user._id.toString());
  });

  it('debería requerir un nombre para el alimento', async () => {
    const foodWithoutName = new Food({
      calories: '100',
      ingredients: 'Sugar, Flour',
      user: user._id,
    });

    let err;
    try {
      await foodWithoutName.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).to.exist;
  });

  it('debería requerir un usuario para el alimento', async () => {
    const foodWithoutUser = new Food({
      name: 'Banana',
      calories: '105',
      ingredients: 'Banana',
    });

    let err;
    try {
      await foodWithoutUser.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(err.errors.user).to.exist;
  });

  it('debería permitir un alimento sin ingredientes', async () => {
    const foodWithoutIngredients = new Food({
      name: 'Orange',
      calories: '62',
      user: user._id,
    });

    const savedFood = await foodWithoutIngredients.save();

    expect(savedFood._id).to.exist;
    expect(savedFood.name).to.equal('Orange');
    expect(savedFood.ingredients).to.be.undefined; // Campo opcional
  });
});
