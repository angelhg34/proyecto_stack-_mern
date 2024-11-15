import mongoose from "mongoose";
import color from 'colors'
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Conexion exitosa a mongo: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error al conectar a mongo ${error}`)
        process.exit(1)
    }
}

export default connectDB