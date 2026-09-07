import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv()



export const sequelize=new Sequelize(
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
        await sequelize.sync({ force:false})
        console.log("conexion exitosa a la base de datos")
    } catch(error){
        console.log("error a conectar la base de datos", error.mesage
        )
    }
}