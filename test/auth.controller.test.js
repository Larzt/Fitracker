import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js'
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../src/models/user.model.js'; // Asegúrate de importar el modelo correcto

let server;
let token;
let userId;

const userData = {
  email: 'test@example.com',
  password: 'password123',
  username: 'testuser',
  age: 25,
  weight: 70,
  gender: 'masculino'
};

describe('User API', () => {
  
  context('POST /register', () => {
    it('should successfully register a user', async () => {
      await request(app).post('/api/register').send({
        email: 'test31@example.com',
        password: 'password123',
        username: 'testuser31',
        age: 25,
        weight: 70,
        gender: 'masculino'
      }).expect(200);
    });
  });

  context('POST /login', () => {
    it('should successfully login with valid credentials', async () => {
      // Registrar un usuario primero
      await request(app).post('/api/register').send({
        email: 'test31@example.com',
        password: 'password123',
        username: 'testuser31',
        age: 25,
        weight: 70,
        gender: 'masculino'
      }).expect(200);

      await request(app).post('/api/login').send({
        password: 'password123',
        username: 'testuser31',
      }).expect(200);
    });

    it('should return an error if the username is not found', async () => {
      await request(app).post('/api/login').send({
        username: 'testuser90909',
        password: 'password123'
    }).expect(400);
  });

    it('should return an error if the password is incorrect', async () => {
      // Registrar un usuario primero 
      await request(app).post('/api/register').send({
        email: 'testpepepepe@pepe.com',
        password: 'password123',
        username: 'testpepepepe',
        age: 25,
        weight: 70,
        gender: 'masculino'
      }).expect(200);

      await request(app).post('/api/login').send({
        username: 'testpepepepe',
        password: 'password1234'
      }).expect(400);
  });

  context('GET /profile', () => {
    it('should return user profile with valid token', async () => {
      // Registrar un usuario primero
      const resRegister = await request(app)
        .post('/api/register')
        .send(userData)
        .expect(200);

      token = resRegister.body.token;

      // Obtener el perfil del usuario usando el token
      const resProfile = await request(app)
        .get('/api/profile')
        .set('Cookie', `token=${token}`)
        .expect(401);
    }).timeout(3000);

    it('should return an error if the user is not authenticated', async () => {
      const res = await request(app)
        .get('/api/profile')
        .set('Cookie', 'token=invalidtoken')
        .expect(401);

      expect(res.body).to.have.property('message').equal('Invalid token');
    });
  });

  context('POST /logout', () => {
    it('should successfully log out', async () => {
      // Registrar un usuario primero
      const resRegister = await request(app)
        .post('/api/register')
        .send(userData)
        .expect(200);

      token = resRegister.body.token;

      // Realizar logout
      const resLogout = await request(app)
        .post('/api/logout')
        .set('Cookie', `token=${token}`)
        .expect(200);
    }).timeout(3000);
  });

});});
