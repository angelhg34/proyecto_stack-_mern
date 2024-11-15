import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:[true,"Nombre requerido"]
    },
    lastName:{
        type:String,
        require:[true,"Apellido requerido"]
    },
    email:{
        type:String,
        require:[true,"Nombre de usuario requerido"],
        unique:[true,"email no debe ser repetido"]
    },
    password:{
        type:String,
        require:[true,"Nombre de usuario requerido"],

    },
    isAdmin:{
        type:Boolean,
        require:[true,"Is admin es requerido"],
        default: false
    }

},
{
    timestamps:true
}
)

const User=mongoose.model("Users", UserSchema)
export default User