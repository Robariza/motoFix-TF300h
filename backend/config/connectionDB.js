// Importación mongoose
import mongoose from "mongoose";

// Lógica para la conexion con mongoose
const connectionMongo = async ()=>{
    await mongoose.connect(process.env.CONNECTION_MDB,{});
    try{
        console.log('Conexión exitosa DB')
    }catch(error){
        console.error('Conexión fallida:', error.masssage)
    }
}

// Exportación modulo conexión 
export default connectionMongo;