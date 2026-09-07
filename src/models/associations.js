import usermodel from "./users.model.js";
import tag from "./tag.model.js";
import articletag from "./articletag.model.js";
import article from "./article.model.js";
import profile from "./profile.model.js";

export const configassocations=()=>{
usermodel.hasOne(profile, {foreignKey:'user_id', as:'Profile', onDelete:'CASCADE'})
profile.belongsTo(usermodel, {foreignKey:'user_id', as:'user'})

usermodel.hasMany(article, {foreignKey:"user_id", as:"articles", onDelete:"CASCADE"})
article.belongsTo(usermodel,{foreignKey:"user_id", as:"author"})

article.belongsToMany(tag, {through:articletag, foreignKey:"article_id", as:"tags", onDelete:"CASCADE"})
tag.belongsToMany(article, {through:articletag, foreignKey:"tag_id", as:"articles"})

}