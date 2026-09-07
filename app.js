import express from "express"
import { startDb } from "./src/config/database.js"

const app=express()
const port=3000

app.listen(port, async()=>{
    await startDb()
    console.log(`servidor corriendo en el puerto ${port}`)
})