// IMPORTACIONES
// Montaje servidor
import express from 'express';
// Variables de entorno
import dotenv from 'dotenv';
// Conexión MDB (módulo)
import connectionMongo from './config/connectionDB.js';
// CORS
import cors from 'cors';
// ROUTES
import usersRouter from './routes/user.routes.js';
import adminsRouter from './routes/admin.routes.js';
import productsRouter from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import authRoutes from './routes/auth.routes.js';
import { loginService } from './services/login.service.js';
import { signinService } from './services/signin.service.js';

// CONFIGURACIÓN DE USO DE IMPORTACIONES
// express (servidor)
const app = express();

// variables de entorno
dotenv.config();
const port = process.env.PORT || 6000; // Valor predeterminado 3000 si no está definido en las variables de entorno

// Conexión MDB
connectionMongo();
app.use(express.json());

// Uso de CORS
app.use(cors());

// Rutas
app.use('/user', usersRouter);
app.use('/admin', adminsRouter);
app.use('/product', productsRouter);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);
app.use('/login', loginService);
app.use('/signin', signinService);

// ESCUCHAR SERVIDOR
app.listen(port,'137.184.16.192', () => {
    console.log(`El servidor se está escuchando en : http://137.184.16.192:${port}`);
});
