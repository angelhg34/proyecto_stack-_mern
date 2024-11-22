import mongoose from "mongoose"
import User from "../entities/user.entity.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const userRegister = async(req,res)=>{
    const {
        firstName,
        lastName,
        email,
        password,
        isAdmin,
    }=req.body
    //verificar si el usuario existe con el email
    const vUser= await User.findOne({email: req.body.email})
    if(vUser){
        res.status(400).json({message: "Ya esxite el usuario"})
    }else{
        const sal = await bcrypt.genSalt(10)
        const bcPassword= await bcrypt.hash(password,sal)
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: bcPassword,
            isAdmin
        })
        const token = generarToken(newUser._id);
        res.status(201).json({... newUser._doc,token})
    }

}



const generarToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

export const loginUser= async(req,res)=>{
    //desestructurar
    const { email, password} = req.body
    const user= await User.findOne({email:email})
    //si el usuario existe comprara los hash en la base de datos
    if(user){
        if(await bcrypt.compare(password,user.password)){
            res.status(200).json({
                id:user._id,
                name:user.firstName,
                token:generarToken(user._id)
            })
        }else{
            res.send("Credenciales invalidad")
        }
    }else{
        res.status(404).json({
            "message":"credenciales invalidas"
        })
    }

  
}