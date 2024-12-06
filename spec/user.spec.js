import mongoose from 'mongoose';
import { expect } from 'chai';
import User from '../src/models/user.model.js'; // Asegúrate de que la ruta sea correcta
import './setup.js';

let testUser;

before(async () => {
  // Creamos un usuario de prueba
  testUser = await User.create({
    email: 'admin@example.com',
    password: '123456',
    username: 'admin',
    age: '30',
    weight: '70',
    gender: 'masculino',
  });
});

describe('----USER MODEL TESTS----', () => {
  it('Should create a new user', async () => {
    const userData = {
      email: 'newuser@example.com',
      password: 'password123',
      username: 'newuser',
      age: '25',
      weight: '65',
      gender: 'femenino',
    };

    const user = await User.create(userData);

    expect(user).to.have.property('_id');
    expect(user.email).to.equal('newuser@example.com');
    expect(user.username).to.equal('newuser');
    expect(user.age).to.equal('25');
    expect(user.weight).to.equal('65');
    expect(user.gender).to.equal('femenino');
  });

  it('Should fail to create a user without an email', async () => {
    const userData = {
      password: 'password123',
      username: 'noemailuser',
      age: '25',
      weight: '65',
      gender: 'femenino',
    };

    try {
      await User.create(userData);
      throw new Error('User without email should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should fail to create a user without a username', async () => {
    const userData = {
      email: 'nousername@example.com',
      password: 'password123',
      age: '25',
      weight: '65',
      gender: 'masculino',
    };

    try {
      await User.create(userData);
      throw new Error('User without username should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should fail to create a user with an invalid email', async () => {
    const userData = {
      email: 'invalid-email',
      password: 'password123',
      username: 'invaliduser',
      age: '25',
      weight: '65',
      gender: 'femenino',
    };

    try {
      await User.create(userData);
      throw new Error('Invalid email format should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'Error');
    }
  });

  it('Should fail to create a user without a valid age', async () => {
    const userData = {
      email: 'validuser@example.com',
      password: 'password123',
      username: 'validuser',
      age: '15', // Edad menor de 18
      weight: '70',
      gender: 'masculino',
    };

    try {
      await User.create(userData);
      throw new Error('User with age less than 18 should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'Error');
    }
  });

  it('Should fail to create a user without a valid weight', async () => {
    const userData = {
      email: 'validuser1@example.com',
      password: 'password123',
      username: 'validuser1',
      age: '30',
      weight: '0', // Peso no válido
      gender: 'masculino',
    };

    try {
      await User.create(userData);
      throw new Error('User with invalid weight should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'Error');
    }
  });

  it('Should fail to create a user without a gender', async () => {
    const userData = {
      email: 'validuser@example.com',
      password: 'password123',
      username: 'validuser',
      age: '30',
      weight: '70',
      gender: '', // Sin género
    };

    try {
      await User.create(userData);
      throw new Error('User without gender should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should fetch a user by username', async () => {
    const user = await User.findOne({ username: 'testuser' });

    expect(user).to.have.property('_id');
    expect(user.username).to.equal('testuser');
    expect(user.email).to.equal('testuser@example.com');
  });

  it('Should update a user', async () => {
    const updatedData = {
      email: 'updateduser@example.com',
      username: 'updateduser',
      age: '35',
      weight: '75',
      gender: 'masculino',
    };

    const updatedUser = await User.findByIdAndUpdate(
      testUser._id,
      updatedData,
      { new: true }
    );

    expect(updatedUser.email).to.equal('updateduser@example.com');
    expect(updatedUser.username).to.equal('updateduser');
    expect(updatedUser.age).to.equal('35');
    expect(updatedUser.weight).to.equal('75');
    expect(updatedUser.gender).to.equal('masculino');
  });

  it('Should delete a user', async () => {
    const userToDelete = await User.create({
      email: 'deletableuser@example.com',
      password: 'password123',
      username: 'deletableuser',
      age: '25',
      weight: '60',
      gender: 'femenino',
    });

    await User.findByIdAndDelete(userToDelete._id);

    // Verificamos que el usuario haya sido eliminado
    const deletedUser = await User.findById(userToDelete._id);
    expect(deletedUser).to.be.null; // El usuario debería haber sido eliminado
  });

  it('Should return an error if user not found', async () => {
    try {
      await User.findById('nonexistentuserid');
      throw new Error('User should not be found');
    } catch (error) {
      expect(error)
        .to.have.property('message')
        .that.includes('Cast to ObjectId failed');
    }
  });
});
