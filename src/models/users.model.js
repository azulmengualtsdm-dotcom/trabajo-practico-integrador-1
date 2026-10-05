import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const usermodel= sequelize.define("User", {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
    username:{
        type:DataTypes.STRING(20),
        allowNull:false,
        unique:true,
    },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING(255),
            allowNull:false
        },
        role:{
            type:DataTypes.ENUM("user", "admin"),
            toDefaultValue:"user",
            allowNull:false
        }
    },
{
    timestamps:true,
    paranoid:true,
    underscored:true
})

export default usermodel

