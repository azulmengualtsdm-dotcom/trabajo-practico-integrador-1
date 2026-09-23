import tagmodel from "../models/tag.model.js";
import { matchedData } from "express-validator";


export const getalltag=async(req, res)=>{
    try{
    const tags= await tagmodel.findAll()
    res.status(200).json(tags)
}catch(error){
    res.status(500).json({error:"error al traer las etiquetas", detalles:error.message})
}
}

export const getbyIdTag=async(req,res)=>{
    try{
    const {id}=req.params
    const tag=await tagmodel.findByPk(id)

    if(!tag){
        return res.status(404).json({error:'no existe esa etiqueta'})
    }

    res.status(200).json(tag)


    }catch(error){
     res.status(500).json({error:'error traer la etiqueta'})
    }

}

export const createtag= async(req, res)=>{
    try{
    const limData= matchedData(req)
    const newTag=await tagmodel.create(limData)
    res.status(201).json(newTag)
}catch(error){
    res.status(500).json({error:'no se pudo crear', detalles:error.message})
}
}

export const updatetag=async(req, res)=>{
    try{
        const limData= matchedData(req)
    const {id}=req.params
    const tag=await tagmodel.findByPk(id)
    if (!tag) {
      return res.status(404).json({ error: 'Etiqueta no encontrada' });
    }

    await tag.update(limData);
    res.status(200).json(tag)
    }catch(error){
        res.status(400).json({error:'error al editar la etiqueta', detalles:error.message})
    }
}

export const deleteTag=async(req, res)=>{
    try{
        const {id}=req.params
        const tag=await tagmodel.findByPk(id)
        if(!tag){
            return res.status(404).json({error:'no existe esa etiqueta'})
        }

        await tag.destroy()
        res.status(200).json('se elimino la etiqueta')
    }catch(error){
        res.status(500).json({error:'no se pudo eliminar la etiqueta', detalles:error.message})
    }
}