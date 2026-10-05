import express from "express"
import { startDb } from "./src/config/database.js"
import routerAuth from "./src/routes/auth.routes.js"
import articleRouter from "./src/routes/article.routes.js"
import tagRouter from "./src/routes/tag.routes.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config();
const app=express()
app.use(express.json())
app.use(cookieParser());
const port=process.env.PORT || 3000

app.use('/api/auth', routerAuth);       
app.use('/api/articles', articleRouter); 
app.use('/api/tags', tagRouter);

app.listen(port, async()=>{
    await startDb()
    console.log(`servidor corriendo en el puerto ${port}`)
})