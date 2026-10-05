import { verifyToken } from "../helpers/jwt.helper.js"


export const authMiddleware=async(req, res, next)=>{
    try{
    const token=req.cookies.token //busca en cookies el encriptado relacionado al usuario
    if(!token){
        return res.status(401).json({error:'acceso denegado o no iniciado'})
    }

    const decode=verifyToken(token) //verifica el encriptado
    if(!decode){
        return res.status(401).json({error:'invalido o expirado'})
    }
    req.user=decode
    next()
    }catch(error){
        res.status(500).json({error:'error en la autenticacion', detalles:error.message})
    }

}

export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'acceso denegado, se requieren permisos de administrador' });
  }
  next();
};


export const ownerMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params
    const targetArticle = await article.findByPk(id)

    if (!targetArticle) {
      return res.status(404).json({ error: 'el articulo no existe' })
    }

    if (req.user.role !== 'admin' && targetArticle.user_id !== req.user.id) {
      return res.status(403).json({ error: 'acceso denegado, no eres el propietario de este recurso' })
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'error al verificar propiedad del recurso', detalles: error.message })
  }
};