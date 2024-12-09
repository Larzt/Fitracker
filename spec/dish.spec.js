import { expect } from 'chai';
import Dish from '../src/models/dish.model.js'; // Asegúrate de que la ruta sea correcta
import Food from '../src/models/food.model.js'; // Asegúrate de que la ruta sea correcta
import User from '../src/models/user.model.js'; // Asegúrate de que la ruta sea correcta
import './setup.js';

let testUser;
let testFood;
let testDish;

before(async () => {
  // Crear un usuario de prueba
  testUser = await User.create({
    email: 'testuser@example.com',
    password: '123456',
    username: 'testuser',
    age: '30',
    weight: '70',
    gender: 'masculino',
  });

  // Crear un alimento de prueba
  testFood = await Food.create({
    name: 'Apple',
    calories: '95',
    user: testUser._id,
    ingredients: 'Apple',
  });

  // Crear un plato de prueba asociado al usuario y alimento
  testDish = await Dish.create({
    category: 'aperitivo',
    food: testFood._id,
    user: testUser._id,
  });
});

describe('----DISH MODEL TESTS----', () => {
  it('Should create a new dish', async () => {
    const dishData = {
      category: testDish.category,
      food: testFood._id,
      user: testUser._id,
    };

    const dish = await Dish.create(dishData);

    expect(dish).to.have.property('_id');
    expect(dish.food.toString()).to.equal(testFood._id.toString());
    expect(dish.user.toString()).to.equal(testUser._id.toString());
  });

  it('Should fail to create a dish without a food', async () => {
    const dishData = {
      user: testUser._id,
    };

    try {
      await Dish.create(dishData);
      throw new Error('Dish without food should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should fail to create a dish without a user', async () => {
    const dishData = {
      food: testFood._id,
    };

    try {
      await Dish.create(dishData);
      throw new Error('Dish without user should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should update a dish', async () => {
    const updatedDishData = {
      category: 'desayuno',
      food: testFood._id,
    };

    const updatedDish = await Dish.findByIdAndUpdate(
      testDish._id,
      updatedDishData,
      { new: true }
    );

    expect(updatedDish).to.have.property('_id');
    expect(updatedDish.food.toString()).to.equal(testFood._id.toString());
    expect(updatedDish.user.toString()).to.equal(testUser._id.toString());
  });

  it('Should delete a dish', async () => {
    const dishToDelete = await Dish.create({
      category: testDish.category,
      food: testFood._id,
      user: testUser._id,
    });

    await Dish.findByIdAndDelete(dishToDelete._id);

    // Verificamos que el plato haya sido eliminado
    const deletedDish = await Dish.findById(dishToDelete._id);
    expect(deletedDish).to.be.null; // El plato debería haber sido eliminado
  });

  it('Should fetch all dishes for a user', async () => {
    // Creamos 2 platos adicionales para el usuario de prueba
    const dishData1 = {
      category: testDish.category,
      food: testFood._id,
      user: testUser._id,
    };

    await Dish.create(dishData1);

    // Verificamos que los 3 platos han sido guardados correctamente
    const dishes = await Dish.find({ user: testUser._id });

    expect(dishes).to.have.lengthOf(3); // Ahora debería haber 3 platos para este usuario
    expect(dishes[0].user.toString()).to.equal(testUser._id.toString());
    expect(dishes[1].user.toString()).to.equal(testUser._id.toString());
    expect(dishes[2].user.toString()).to.equal(testUser._id.toString());
  });

  it('Should return an error if dish not found', async () => {
    try {
      await Dish.findById('nonexistentdishid');
      throw new Error('Dish should not be found');
    } catch (error) {
      expect(error)
        .to.have.property('message')
        .that.includes('Cast to ObjectId failed');
    }
  });
});
