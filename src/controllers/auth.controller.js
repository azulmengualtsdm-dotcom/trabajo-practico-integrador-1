import { matchedData } from "express-validator";
import usermodel from "../models/users.model.js";
import profile from "../models/profile.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";


export const register=async(req, res)=>{
    try{
        const limData=matchedData(req)
    const {first_name, last_name, username, password, email, role }=limData
    const encriptedPassword=await hashPassword(password)
    const newUser=await usermodel.create({
        username,
        email,
        password:encriptedPassword,
        role
    })
    const newProfile=await profile.create({
        user_id:newUser.id,
        first_name,
        last_name
    })

    res.status(201).json({
        usuario: {
            id:newUser.id,
            username:newUser.username,
            email:newUser.email,
            role:newUser.role || "user",
            profile:newProfile
        }

    })}catch(error){
        res.status(500).json({error:'no se pudo registrar el usuario', detalles:error.message})
    }
}

export const login=async(req, res )=>{
    try{
    const {email, password}=req.body
    const user=await usermodel.findOne({where:{email}})//busca coincidencias con el email guardado en el user
    if(!user){
        return res.status(400).json({error:'credenciales invalidas'}) 
    }

    const isMatch=await comparePassword(password, user.password)  //compara la contraseña con la guardada en la tabla de user
    if(!isMatch){
        return res.status(400).json({error:'credenciales invalidas'})
    }

    const token=generateToken({id:user.id, role:user.role}) //genera un encriptado de la id y el role, para ver sus permisos y tener un identificador unico
    //esto sirve para que un hacker no cambie el role facilmente y tener los permisos de admin

    res.cookie('token', token, {
      httpOnly: true, //esto prohibe que se toque lo generado en el node.js, no puede tocar el codigo interno desde el frotend de javascript
      secure: process.env.NODE_ENV === 'production', //esto es paraa comparar en que proceso esta el programa, si esta en production
      //solo te deja usar la red protegida hecha por la pagina, si es falso entonces podes usar la red local para probar los crud desde https//localhost 
      sameSite: 'strict', //le prohíbe al navegador regalar o adjuntar tu cookie si la petición no nació dentro de la misma dirección exacta de tu página web
      maxAge: 24 * 60 * 60 * 1000 //esto es las horas, minutos, segudos que se tienen al iniciar secion en un dispositivo, pasado este tiempo se cierra secion y pide
      //volver a iniciar secion
    });

    res.status(200).json({id:user.id, name:user.username, email:user.email, role:user.role })


}catch(error){
    res.status(500).json({error:'no se pudo iniciar secion', detalles:error.message})
}
}
export const logout=async(req, res)=>{
    try{
    res.clearCookie('token')
    res.status(200).json('cerrado de secion exitoso')
    }catch(error){
        res.status(500).json({error:'no se pudo cerrar secion', detalles:error.message})
    }
}

export const getUser=async(req, res)=>{
    try{
    const user=await usermodel.findByPk(req.user.id, {
        attributes:['id', 'username', 'email'], include:{model:profile, as:'Profile'}
    })
        if(!user){
            return res.status(404).json({error:'no se encontro el usuario'})
        }
        res.status(200).json(user)
    } catch(error){
        res.status(500).json({error:'no se pudo obtener el usuario', detalles:error.message})
    }
    }

    export const updateProfile = async (req, res) => {
        try {
            const limData = matchedData(req)
            const userProfile = await profile.findOne({ where: { user_id: req.user.id } });
            if (!userProfile) {
                return res.status(404).json({ error: 'Perfil no encontrado' });
            }
            await userProfile.update(limData);
            res.status(200).json({ mensaje: 'Perfil actualizado con éxito', perfil: userProfile });
        } catch (error) {
            res.status(400).json({ error: 'Error al actualizar el perfil', detalles: error.message });
        }
}


comparePassword
hashPassword
usermodel
profile
matchedData