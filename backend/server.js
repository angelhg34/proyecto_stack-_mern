import pkg from 'colors';
import dotenv from 'dotenv';
import express from 'express';
import pruebaRouter from './routes/pruebaRoutes.js';
import authRouter from './routes/authRouter.js';
import connectDB from './config/bd.js';
const {colors} = pkg;

//crear objeto aplicacion de express
const app=express()
app.use(express.json()) //configuracion para que pueda aceptar "bodys" tipo json

//LEER DEL .ENV
dotenv.config()
connectDB()
const PORT=process.env.PORT
app.use('/api/pruebas', pruebaRouter)
app.use('/api/auth', authRouter)

//crear servidor de express
app.listen(
    PORT,()=>{
        console.log(`Servidor ejecutando en el puerto ${PORT}`.bgWhite.red.bold)
    }
)


