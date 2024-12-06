import { expect } from 'chai';
import Food from '../src/models/food.model.js'; // Asegúrate de que la ruta sea correcta
import User from '../src/models/user.model.js'; // Asegúrate de que la ruta sea correcta
import './setup.js';

let testUser;
let testFood;

before(async () => {
  // Creamos un usuario para las pruebas
  testUser = await User.create({
    email: 'testuser2@example.com',
    password: '123456',
    username: 'testuser2',
    age: '30',
    weight: '70',
    gender: 'masculino',
  });

  // Creamos un alimento para utilizar en pruebas de actualización y eliminación
  testFood = await Food.create({
    name: 'Apple1',
    calories: '95',
    user: testUser._id, // Asociamos el alimento al usuario creado
    ingredients: 'Apple',
  });
});

describe('----FOOD MODEL TESTS----', () => {
  it('Should create a new food item', async () => {
    const foodData = {
      name: 'Banana',
      calories: '105',
      user: testUser._id,
      ingredients: 'Banana',
    };

    const food = await Food.create(foodData);

    expect(food).to.have.property('_id');
    expect(food.name).to.equal('Banana');
    expect(food.calories).to.equal('105');
    expect(food.user.toString()).to.equal(testUser._id.toString());
  });

  it('Should fail to create a food without a name', async () => {
    const foodData = {
      calories: '100',
      user: testUser._id,
    };

    try {
      await Food.create(foodData);
      throw new Error('Food without a name should not be allowed');
    } catch (error) {
      expect(error).to.have.property('name', 'ValidationError');
    }
  });

  it('Should update a food item', async () => {
    const updatedFoodData = {
      name: 'Updated Apple',
      calories: '120',
    };

    const updatedFood = await Food.findByIdAndUpdate(
      testFood._id,
      updatedFoodData,
      { new: true }
    );

    expect(updatedFood).to.have.property('_id');
    expect(updatedFood.name).to.equal('Updated Apple');
    expect(updatedFood.calories).to.equal('120');
  });

  it('Should delete a food item', async () => {
    const foodToDelete = await Food.create({
      name: 'Orange',
      calories: '62',
      user: testUser._id,
    });

    await Food.findByIdAndDelete(foodToDelete._id);

    // Verificamos que el alimento ya no esté en la base de datos
    const deletedFood = await Food.findById(foodToDelete._id);
    expect(deletedFood).to.be.null; // El alimento debería haber sido eliminado
  });

  it('Should fetch all foods for a user', async () => {
    // Creamos 3 alimentos para el usuario de prueba
    const foodData1 = {
      name: 'Carrot',
      calories: '41',
      user: testUser._id,
      ingredients: 'Carrot',
    };

    await Food.create(foodData1);

    // Verificamos que los 3 alimentos fueron guardados correctamente
    const foods = await Food.find({ user: testUser._id });

    expect(foods).to.have.lengthOf(3); // Ahora debería haber 3 alimentos para este usuario
    expect(foods[0].user.toString()).to.equal(testUser._id.toString());
    expect(foods[1].user.toString()).to.equal(testUser._id.toString());
    expect(foods[2].user.toString()).to.equal(testUser._id.toString());
  });

  it('Should return an error if food not found', async () => {
    try {
      await Food.findById('nonexistentfoodid');
      throw new Error('Food should not be found');
    } catch (error) {
      expect(error)
        .to.have.property('message')
        .that.includes('Cast to ObjectId failed');
    }
  });
});
