import { expect } from 'chai';
import Routine from '../src/models/routine.model.js'; // Asegúrate de que la ruta sea correcta
import Exer from '../src/models/exercise.model.js'; // Asegúrate de que la ruta sea correcta
import User from '../src/models/user.model.js'; // Asegúrate de que la ruta sea correcta
import './setup.js';

let testUser;
let testExer;
let testRoutine;

before(async () => {
  // Crear un usuario de prueba
  testUser = await User.create({
    email: 'testuser1@example.com',
    password: '123456',
    username: 'testuser1',
    age: '30',
    weight: '70',
    gender: 'masculino',
  });

  // Crear un ejercicio de prueba
  testExer = await Exer.create({
    name: 'Push Up',
    description: 'A basic upper body exercise',
    user: testUser._id,
  });

  // Crear una rutina de prueba asociada al usuario y ejercicio
  testRoutine = await Routine.create({
    exer: testExer._id,
    user: testUser._id,
  });
});

describe('----ROUTINE MODEL TESTS----', () => {
  it('Should create a new routine', async () => {
    const routineData = {
      exer: testExer._id,
      user: testUser._id,
    };

    const routine = await Routine.create(routineData);

    expect(routine).to.have.property('_id');
    expect(routine.exer.toString()).to.equal(testExer._id.toString());
    expect(routine.user.toString()).to.equal(testUser._id.toString());
  });

  it('Should fail to create a routine without an exercise (exer)', async () => {
    const routineData = {
      user: testUser._id,
    };

    try {
      await Routine.create(routineData);
      throw new Error('Routine without an exercise should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should fail to create a routine without a user', async () => {
    const routineData = {
      exer: testExer._id,
    };

    try {
      await Routine.create(routineData);
      throw new Error('Routine without a user should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should update a routine', async () => {
    const updatedRoutineData = {
      exer: testExer._id,
    };

    const updatedRoutine = await Routine.findByIdAndUpdate(
      testRoutine._id,
      updatedRoutineData,
      { new: true }
    );

    expect(updatedRoutine).to.have.property('_id');
    expect(updatedRoutine.exer.toString()).to.equal(testExer._id.toString());
    expect(updatedRoutine.user.toString()).to.equal(testUser._id.toString());
  });

  it('Should delete a routine', async () => {
    const routineToDelete = await Routine.create({
      exer: testExer._id,
      user: testUser._id,
    });

    await Routine.findByIdAndDelete(routineToDelete._id);

    // Verificamos que la rutina haya sido eliminada
    const deletedRoutine = await Routine.findById(routineToDelete._id);
    expect(deletedRoutine).to.be.null; // La rutina debería haber sido eliminada
  });

  it('Should fetch all routines for a user', async () => {
    // Creamos 2 rutinas adicionales para el usuario de prueba
    const routineData1 = {
      exer: testExer._id,
      user: testUser._id,
    };

    await Routine.create(routineData1);

    // Verificamos que las 3 rutinas han sido guardadas correctamente
    const routines = await Routine.find({ user: testUser._id });

    expect(routines).to.have.lengthOf(3); // Ahora debería haber 3 rutinas para este usuario
    expect(routines[0].user.toString()).to.equal(testUser._id.toString());
    expect(routines[1].user.toString()).to.equal(testUser._id.toString());
    expect(routines[2].user.toString()).to.equal(testUser._id.toString());
  });

  it('Should return an error if routine not found', async () => {
    try {
      await Routine.findById('nonexistentroutineid');
      throw new Error('Routine should not be found');
    } catch (error) {
      expect(error)
        .to.have.property('message')
        .that.includes('Cast to ObjectId failed');
    }
  });
});
