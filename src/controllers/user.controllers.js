import usermodel from "../models/users.model";
import profile from "../models/profile.model";
import { matchedData } from "express-validator";
import bcrypt from 'bcrypt'
import article from "../models/article.model";

export const getalluser=async (req, res )=>{
try {
const users=await usermodel.findAll({
    attributes:[
        'id', 'username' , 'email', 'role' 
    ], include:{model:profile, as:'profile'}
})
res.status(200).json(users)
}catch(error){
    res.status(404).json({error:"hubo un error al obtener los usuarios", detalles:error.message})

}
}

export const getUserbyId=async(req, res)=>{
    try{
    const {id}=req.params
    const user=await usermodel.findByPk(id,{attributes:['id','username', 'email', 'role'],
        include:[{model:profile, as:'profile'},{model:article, as:"article"}]
    })
    if(!user){
        res.status(404).json({error:"no existe el usuario"})
    }
    res.status(200).json(user)
}catch(error){
res.status(500).json({error:"hay un error al obtener el usuario", detalles:error.message})
}
}

const createUser=async(req, res)=>{
    try{
        limData=matchedData(req)
    const {username, email, password, last_name, first_name}=req.body
    const salt=await bcrypt.genSalt(10)
    const encryptedpassword=await bcrypt.hash(password, salt)
        const newUser = await usermodel.create({
      username,
      email,
      password: encryptedpassword
    });

    const newProfile=await profile.create({
        user_id:newUser.id,
        last_name,
        first_name
    })

        res.status(201).json({
      mensaje: 'Usuario y perfil creados con éxito',
      usuario: { id: newUser.id, username: newUser.username, email: newUser.email, profile: newProfile }
    })
}catch(error){
    res.status(500).json({error:"hubo un error al crear el usuario y el perfil", detalles:error.message})
}

}

export const updateUser=async(req, res)=>{
    try {
    const { id } = req.params;
    const limData = matchedData(req);

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (limData.password) {
      const salt = await bcrypt.genSalt(10);
      limData.password = await bcrypt.hash(limData.password, salt);
    }

    await user.update(limData);
    res.status(200).json({ mensaje: 'Usuario actualizado con éxito', usuario: user });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el usuario', detalles: error.message });
  }
};



