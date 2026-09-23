import { matchedData } from "express-validator";
import article from "../models/article.model.js";
import usermodel from "../models/users.model.js";


export const getallArticle= async(req , res)=>{
    try{
    const articles=await article.findAll({where:{status:'published'}, 
        include:{model:usermodel, as:'author', attributes:['id','username', 'email']}})

        res.status(200).json(articles)
}catch(error){
    res.status(500).json({error:'no se pudieron traer los articulos', detalles:error.mesaage})
}
}

export const getbyidArticle=async(req, res )=>{
    try{
        const {id}=req.params
    const articleId = await article.findByPk(id, {
            include: { 
                model: usermodel, 
                as: 'author', 
                attributes: ['id', 'username', 'email']}})

         if(!articleId){
            return res.status(404).json({error:'no se encuentra el articulo'})
         }

         res.status(200).json(articleId)
}catch(error){
    res.status(500).json({error:'no se pudo traer el articulo, hay un error', detalles:error.message})
}
}

export const createArticle=async(req, res)=>{
    try{
    const limData=matchedData(req)
    const newArticle=await article.create({...limData, user_id:req.user.id})
    res.status(201).json(newArticle)
    }catch(error){
        res.status(500).json({error:'no se pudo crear el articulo', detalles:error.message})
    }
}

export const updateArticle=async(req, res)=>{
    try{
        const limData=matchedData(req)
        const {id}=req.params
        const articleUpdate= await article.findByPk(id)
        if(!articleUpdate){
            return res.status(404).json({error:'no se encontro ningun articulo que coincida'})
        }
        await articleUpdate.update(limData)
        res.status(200).json(articleUpdate)
    }catch(error){
        res.status(400).json({error:'no se pudo editar el articulo', detalles:error.message})
    }
}

export const deleteArticle=async(req, res)=>{
    try{
    const {id}=req.params
    const articleDelete=await article.findByPk(id)
    if(!articleDelete){
            return res.status(404).json({error:'no se encontro ningun articulo que coincida'})
        }
        await articleDelete.destroy()
         res.status(200).json({ mensaje: 'Artículo eliminado de forma correcta' })
    }catch(error){
        res.status(500).json({error:'no se pudo eliminar el articulo', detalles:error.message} 
        )
    }
}