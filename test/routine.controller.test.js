import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app.js'; // Asegúrate de exportar correctamente tu aplicación
import Routine from '../src/models/routine.model.js';
import User from '../src/models/user.model.js';

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

describe('Routine API', () => {
  let user;
  let token;

  beforeEach(async () => {
    // Crear un usuario y autenticarse
    user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
      age: 25,
      weight: 70,
      gender: 'masculino',
    });
  
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
      
    token = response.body.token; // Guarda el token para usarlo en las pruebas
  });
  

  it('debería crear y guardar una rutina correctamente', async () => {
    const response = await request(app)
      .post('/api/routines')
      .set('Authorization', `Bearer ${token}`)
      .send({ exer: 'exerciseId' });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('_id');
    expect(response.body.user).to.equal(user._id.toString());
  });

  it('debería obtener todas las rutinas del usuario autenticado', async () => {
    await Routine.create({ exer: 'exerciseId', user: user._id });

    const response = await request(app)
      .get('/api/routines')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0].user).to.equal(user._id.toString());
  });

  it('debería eliminar una rutina correctamente', async () => {
    const routine = await Routine.create({ exer: 'exerciseId', user: user._id });

    const response = await request(app)
      .delete(`/api/routines/${routine._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(204);
  });

  it('debería devolver error si no encuentra la rutina', async () => {
    const response = await request(app)
      .delete('/api/routines/nonexistentId')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Routine not found');
  });

  it('debería devolver las rutinas creadas en una fecha específica', async () => {
    const date = new Date().toISOString().split('T')[0];
    await Routine.create({ exer: 'exerciseId', user: user._id, createdAt: new Date() });

    const response = await request(app)
      .get(`/api/routines/date/${date}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
  });
});
