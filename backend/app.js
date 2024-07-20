// IMPORTACIONES
// Montaje servidor
import express from 'express'
// variables de entorno
import dotenv from 'dotenv'
// conexión MDB (modulo)
import connectionMongo from './config/connectionDB.js';

// CONFIGURACIÓN DE USO DE IMPORTACIONES
// express (servidor)
const app = express();

// variables de entorno
dotenv.config();
const port = process.env.PORT;

// Conexión MDB
connectionMongo();

//Para que se pueda leer y enviar datos en formato json
app.use(express.json());

// ESCUCHAR SERVIDOR
app.listen(port, ()=> {
    console.log(`El servidor se está escuchando en : http://localhost:${port}`)
})