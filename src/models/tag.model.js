import sequelize  from "../config/database.js";
import { DataTypes } from "sequelize";

const tagmodel=sequelize.define("Tag", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }, 
    name:{
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:true
    }

},
{
    timestamps:true,
    paranoid:true,
    underscored:true
})

export default tagmodel