import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";


configDotenv()



const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:"mysql",
        logging:false
    }
)

export const startDb=async()=>{
    try{
        await sequelize.authenticate()
        const { configureAssociations } = await import('../models/associations.js');
    configureAssociations();
        await sequelize.sync({ force:false})
        console.log("conexion exitosa a la base de datos")
    } catch(error){
        console.log("error a conectar la base de datos", error.mesage
        )
    }
}

export default sequelize