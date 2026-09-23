import articletag from "../models/articletag.model.js";
import article from "../models/article.model.js";
import usermodel from "../models/users.model.js";

export const addtagArticle=async(req, res)=>{
    try{
    const {article_id, tag_id}=req.body
    const articleTag=await article.findByPk(article_id)
    if(!articleTag){
        return res.status(404).json({error:'no existe esa tag'})
    }

    if (req.user.role !== 'admin' && articleTag.user_id !== req.user.id){
        return res.status(403).json({error:'no eres el autor'})
    }

    const newAssociation=await articletag.create({article_id, tag_id})
     res.status(201).json({ 
      mensaje: 'Etiqueta agregada al artículo con éxito', 
      datos: newAssociation 
    });
  }catch (error) {
    res.status(500).json({ error: 'Error al asociar la etiqueta', detalles: error.message });
  }
}

export const removeTag=async(req, res)=>{
    try{
        const {id} = req.params
        const association=await articletag.findByPk(id)
        const articleTag = await article.findByPk(association.article_id);
    if (req.user.role !== 'admin' && articleTag.user_id !== req.user.id){
    return res.status(403).json({ error: 'Acceso denegado, no eres el autor de este artículo' });
    }
    await association.destroy();
    
    res.status(200).json( 'etiqueta removida del artículo con éxito' );
    }catch(error){
    res.status(500).json({error:'no se pudo eliminar', detalles:error.message})

    }
}
