import express from "express"
import ProductManager from "./ProductManager.js"

const app = express()

const productManager = new ProductManager()

app.listen(8080, () => {
    console.log("Servidor escuchando al puerto 8080")
})

app.get("/products", async (req, res) => {
    const {limit} = req.query
    if(limit){
        const products = await productManager.getProducts()
        const productsLimit = products.slice(0, limit)
        res.json({productsLimit})
    }else{
    const products = await productManager.getProducts()
    res.json({products})}
})

app.get("/products/:pid", async(req, res)=>{
    const {pid} = req.params
    const productById = await productManager.getProductsById(parseInt(pid))
    res.json({productById})
})