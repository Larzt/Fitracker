import { MongoMemoryServer } from 'mongodb-memory-server';

import mongoose from 'mongoose';
let mongoServer;

before(async () => {
  // Iniciamos el servidor Mongo en memoria
  mongoServer = await MongoMemoryServer.create(); // Versión más reciente

  // Obtenemos la URI para conectar
  const mongoUri = mongoServer.getUri();

  // Conectamos mongoose al servidor de MongoDB en memoria
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async () => {
  // Limpiamos la base de datos después de las pruebas
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();

  // Detenemos el servidor Mongo en memoria
  await mongoServer.stop();
});
