import mongoose from 'mongoose';
import Dish from '../models/dish.model.js'; // Asegúrate de que este sea el modelo de Dish.
import Food from '../models/food.model.js'; // Modelo de comida (suponiendo que lo tienes).
import User from '../models/user.model.js'; // Modelo de usuario.
import { expect } from 'chai';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/app.js'

let user;
let food;

beforeEach(async () => {
  // Crear un usuario válido
  user = new User({
    email: 'user@example.com',
    password: 'password123',
    username: 'testuser',
    age: 25,
    weight: 70,
    gender: 'masculino'
  });
  await user.save();

  // Crear un alimento ficticio
  food = new Food({
    name: 'Pizza',
    calories: '250',  // Asegúrate de que la calificación sea válida (string o number)
    ingredients: 'Tomato, Cheese, Dough'
  });
  await food.save();
});

describe('Dish API', () => {
  it('debería crear un plato correctamente', async () => {
    const response = await request(app)
      .post('/api/dishes')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        food: food._id,  // Usa el ObjectId del alimento creado
        user: user._id
      });

    expect(response.status).to.equal(200);
    expect(response.body.food).to.equal(food._id.toString());
    expect(response.body.user).to.equal(user._id.toString());
  });

  it('debería devolver un error si no se pasa un ObjectId válido para food', async () => {
    const response = await request(app)
      .post('/api/dishes')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        food: 'invalid_food_id',  // ID inválido
        user: user._id
      });

    expect(response.status).to.equal(400);  // Esperamos un error 400 por ID inválido
    expect(response.body.message).to.include('Cast to ObjectId failed');  // Esto es específico de Mongoose.
  });

  it('debería devolver un error si el alimento no se encuentra', async () => {
    const invalidFoodId = new mongoose.Types.ObjectId(); // ID ficticio
    const response = await request(app)
      .post('/api/dishes')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        food: invalidFoodId,
        user: user._id
      });

    expect(response.status).to.equal(404);  // Si no encuentra el alimento
    expect(response.body.message).to.equal('Food not found');
  });

  it('debería obtener los platos de un usuario', async () => {
    const dish = new Dish({
      food: food._id,
      user: user._id
    });
    await dish.save();

    const response = await request(app)
      .get('/api/dishes')
      .set('Authorization', `Bearer ${user.token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array').that.is.not.empty;
    expect(response.body[0].food.toString()).to.equal(food._id.toString());
    expect(response.body[0].user.toString()).to.equal(user._id.toString());
  });
});

