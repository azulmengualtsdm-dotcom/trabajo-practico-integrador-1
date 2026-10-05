import usermodel from "./users.model.js";
import articletag from "./articletag.model.js";
import article from "./article.model.js";
import profile from "./profile.model.js";
import tagmodel from "./tag.model.js";

export const configureAssociations=()=>{
usermodel.hasOne(profile, {foreignKey:'user_id', as:'Profile', onDelete:'CASCADE'})
profile.belongsTo(usermodel, {foreignKey:'user_id', as:'user'})

usermodel.hasMany(article, {foreignKey:"user_id", as:"articles", onDelete:"CASCADE"})
article.belongsTo(usermodel,{foreignKey:"user_id", as:"author"})

article.belongsToMany(tagmodel, {through:articletag, foreignKey:"article_id", as:"tags", onDelete:"CASCADE"})
tagmodel.belongsToMany(article, {through:articletag, foreignKey:"tag_id", as:"articles"})

}