import { expect } from 'chai';
import Exer from '../src/models/exercise.model.js'; // Asegúrate de que la ruta sea correcta
import User from '../src/models/user.model.js'; // Asegúrate de que la ruta sea correcta
import './setup.js';

let testUser;
let testExer;

before(async () => {
  // Creamos un usuario para las pruebas
  testUser = await User.create({
    email: 'testuser0@example.com',
    password: '123456',
    username: 'testuser0',
    age: '30',
    weight: '70',
    gender: 'masculino',
  });

  // Creamos un ejercicio para utilizar en pruebas de actualización y eliminación
  testExer = await Exer.create({
    name: 'Push-up',
    description: 'A bodyweight exercise to strengthen the upper body.',
    user: testUser._id, // Asociamos el ejercicio al usuario creado
  });
});

describe('----EXER MODEL TESTS----', () => {
  it('Should create a new exercise', async () => {
    const exerData = {
      name: 'Squat',
      description: 'A lower body strength exercise.',
      user: testUser._id,
    };

    const exer = await Exer.create(exerData);

    expect(exer).to.have.property('_id');
    expect(exer.name).to.equal('Squat');
    expect(exer.description).to.equal('A lower body strength exercise.');
    expect(exer.user.toString()).to.equal(testUser._id.toString());
  });

  it('Should fail to create an exercise without a name', async () => {
    const exerData = {
      description: 'A cardio exercise.',
      user: testUser._id,
    };

    try {
      await Exer.create(exerData);
      throw new Error('Exercise without a name should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should update an exercise', async () => {
    const updatedExerData = {
      name: 'Updated Push-up',
      description: 'An updated description for push-ups.',
    };

    const updatedExer = await Exer.findByIdAndUpdate(
      testExer._id,
      updatedExerData,
      { new: true }
    );

    expect(updatedExer).to.have.property('_id');
    expect(updatedExer.name).to.equal('Updated Push-up');
    expect(updatedExer.description).to.equal(
      'An updated description for push-ups.'
    );
  });

  it('Should delete an exercise', async () => {
    const exerToDelete = await Exer.create({
      name: 'Lunge',
      description: 'A lower body exercise.',
      user: testUser._id,
    });

    await Exer.findByIdAndDelete(exerToDelete._id);

    // Verificamos que el ejercicio ya no esté en la base de datos
    const deletedExer = await Exer.findById(exerToDelete._id);
    expect(deletedExer).to.be.null; // El ejercicio debería haber sido eliminado
  });

  it('Should fetch all exercises for a user', async () => {
    // Creamos 2 ejercicios para el usuario de prueba
    const exerData1 = {
      name: 'Jumping Jacks',
      description: 'A cardio warm-up exercise.',
      user: testUser._id,
    };

    await Exer.create(exerData1);

    // Verificamos que los 3 ejercicios fueron guardados correctamente
    const exercises = await Exer.find({ user: testUser._id });

    expect(exercises).to.have.lengthOf(3); // Ahora debería haber 3 ejercicios para este usuario
    expect(exercises[0].user.toString()).to.equal(testUser._id.toString());
    expect(exercises[1].user.toString()).to.equal(testUser._id.toString());
    expect(exercises[2].user.toString()).to.equal(testUser._id.toString());
  });

  it('Should return an error if exercise not found', async () => {
    try {
      await Exer.findById('nonexistentexerciseid');
      throw new Error('Exercise should not be found');
    } catch (error) {
      expect(error)
        .to.have.property('message')
        .that.includes('Cast to ObjectId failed');
    }
  });
});
