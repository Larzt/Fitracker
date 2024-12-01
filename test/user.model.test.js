import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../src/models/user.model.js';
import * as chai from 'chai'; // Importa todo el módulo chai
const expect = chai.expect;

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

describe('User model', () => {
  it('debería crear y guardar un usuario correctamente', async () => {
    const validUser = new User({
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
      age: 20,
      weight: 70,
      gender: 'masculino'
    });

    const savedUser = await validUser.save();

    expect(savedUser._id).to.exist;
    expect(savedUser.email).to.equal('test@example.com');
    expect(savedUser.password).to.equal('password123');
    expect(savedUser.username).to.equal('testuser');
    expect(savedUser.gender).to.equal('masculino');
    expect(savedUser.age).to.equal(20);
    expect(savedUser.weight).to.equal(70);
  });

  it('debería requerir un email', async () => {
    const userWithoutEmail = new User({
      password: 'password123',
      username: 'testuser',
      age: 20,
      weight: 70,
      gender: 'masculino'
    });

    let err;
    try {
      await userWithoutEmail.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).to.exist;
  });

  it('debería requerir un password', async () => {
    const userWithoutPassword = new User({
      email: 'test@example.com',
      username: 'testuser',
      age: 20,
      weight: 70,
      gender: 'masculino'
    });

    let err;
    try {
      await userWithoutPassword.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).to.exist;
  });

  it('debería requerir un username', async () => {
    const userWithoutUsername = new User({
      email: 'test@example.com',
      password: 'password123',
      age: 20,
      weight: 70,
      gender: 'masculino'
    });

    let err;
    try {
      await userWithoutUsername.save();
    } catch (error) {
      err = error;
    }

    expect(err).to.be.instanceOf(mongoose.Error.ValidationError);
    expect(err.errors.username).to.exist;
  });


  it('debería requerir que el username sea único', async () => {
    const user1 = new User({
      email: 'test1@example.com',
      password: 'password123',
      username: 'testuser',
      age: 20,
      weight: 70,
      gender: 'masculino'
    });
    await user1.save();

    const user2 = new User({
      email: 'test2@example.com',
      password: 'password456',
      username: 'testuser',
      age: 20,
      weight: 70,
      gender: 'masculino'
    });

    // cuando se intente guardar el segundo usuario, debería lanzar una excepción
    let err;
    try {
      await user2.save();
    } catch (error) {
      err = error;
    }
  });
});
