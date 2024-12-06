import { expect } from 'chai';
import Goal from '../src/models/goals.model.js'; // Asegúrate de que la ruta sea correcta
import User from '../src/models/user.model.js'; // Asegúrate de que la ruta sea correcta
import './setup.js';

let testUser;
let testGoal;

before(async () => {
  // Crear un usuario de prueba
  testUser = await User.create({
    email: 'testuser4@example.com',
    password: '123456',
    username: 'testuser4',
    age: '30',
    weight: '70',
    gender: 'masculino',
  });

  // Crear un logro de prueba asociado al usuario
  testGoal = await Goal.create({
    name: 'Achieve 100 Push-Ups',
    description: 'Complete 100 push-ups in one go.',
    user: testUser._id,
    id: 'goal100pushups',
  });
});

describe('----GOAL MODEL TESTS----', () => {
  it('Should create a new goal', async () => {
    const goalData = {
      name: 'Achieve 50 Squats',
      description: 'Complete 50 squats in one session.',
      user: testUser._id,
      id: 'goal50squats',
    };

    const goal = await Goal.create(goalData);

    expect(goal).to.have.property('_id');
    expect(goal.name).to.equal('Achieve 50 Squats');
    expect(goal.description).to.equal('Complete 50 squats in one session.');
    expect(goal.user.toString()).to.equal(testUser._id.toString());
    expect(goal.id).to.equal('goal50squats');
  });

  it('Should fail to create a goal without a name', async () => {
    const goalData = {
      description: 'Complete 50 squats in one session.',
      user: testUser._id,
      id: 'goal50squats',
    };

    try {
      await Goal.create(goalData);
      throw new Error('Goal without a name should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should fail to create a goal without a description', async () => {
    const goalData = {
      name: 'Achieve 50 Squats',
      user: testUser._id,
      id: 'goal50squats',
    };

    try {
      await Goal.create(goalData);
      throw new Error('Goal without a description should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should fail to create a goal without a user', async () => {
    const goalData = {
      name: 'Achieve 50 Squats',
      description: 'Complete 50 squats in one session.',
      id: 'goal50squats',
    };

    try {
      await Goal.create(goalData);
      throw new Error('Goal without a user should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should fail to create a goal without an id', async () => {
    const goalData = {
      name: 'Achieve 50 Squats',
      description: 'Complete 50 squats in one session.',
      user: testUser._id,
    };

    try {
      await Goal.create(goalData);
      throw new Error('Goal without an id should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should update a goal', async () => {
    const updatedGoalData = {
      name: 'Achieve 100 Squats',
      description: 'Complete 100 squats in one session.',
      id: 'goal100squats',
    };

    const updatedGoal = await Goal.findByIdAndUpdate(
      testGoal._id,
      updatedGoalData,
      { new: true }
    );

    expect(updatedGoal).to.have.property('_id');
    expect(updatedGoal.name).to.equal('Achieve 100 Squats');
    expect(updatedGoal.description).to.equal(
      'Complete 100 squats in one session.'
    );
    expect(updatedGoal.user.toString()).to.equal(testUser._id.toString());
    expect(updatedGoal.id).to.equal('goal100squats');
  });

  it('Should delete a goal', async () => {
    const goalToDelete = await Goal.create({
      name: 'Achieve 20 Pull-Ups',
      description: 'Complete 20 pull-ups in one go.',
      user: testUser._id,
      id: 'goal20pullups',
    });

    await Goal.findByIdAndDelete(goalToDelete._id);

    // Verificamos que el logro haya sido eliminado
    const deletedGoal = await Goal.findById(goalToDelete._id);
    expect(deletedGoal).to.be.null; // El logro debería haber sido eliminado
  });

  it('Should fetch all goals for a user', async () => {
    // Creamos 2 logros adicionales para el usuario de prueba
    const goalData1 = {
      name: 'Achieve 50 Squats 1',
      description: 'Complete 50 squats in one session.',
      user: testUser._id,
      id: 'goal50squats',
    };

    await Goal.create(goalData1);

    // Verificamos que los 3 logros han sido guardados correctamente
    const goals = await Goal.find({ user: testUser._id });

    expect(goals).to.have.lengthOf(3); // Ahora debería haber 3 logros para este usuario
    expect(goals[0].user.toString()).to.equal(testUser._id.toString());
    expect(goals[1].user.toString()).to.equal(testUser._id.toString());
    expect(goals[2].user.toString()).to.equal(testUser._id.toString());
  });

  it('Should return an error if goal not found', async () => {
    try {
      await Goal.findById('nonexistentgoalid');
      throw new Error('Goal should not be found');
    } catch (error) {
      expect(error)
        .to.have.property('message')
        .that.includes('Cast to ObjectId failed');
    }
  });
});
