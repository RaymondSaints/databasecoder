const express = require('express');
const ProductManager = require('./ProductManager.js')
//import express from "express";
//import ProductManager from "./ProductManager";

const PUERTO = 8080;
const app = express();
const server = app.listen(PUERTO,()=>console.log(`SERVER RUN IN ${PUERTO}`));



app.use(express.urlencoded({extended:true}))


const products = new ProductManager();
const readProducts = products.getProducts();


app.get('/', async (req, res)=>{//INDEX PAGE
    res.send("WELCOME TO MAIN PAGE")

});

//solicitamos productos
app.get("/products", async (req,res)=>{
    let limit = parseInt(req.query.limit);//CAPTURAMOS EL LIMITE

    if(!limit) return res.send(await readProducts);//PREGUNTAMOS SI HAY LIMITE
    //console.log(limit)
    const allProducts = await readProducts;
    const productLimit = allProducts.slice(0, limit)
    return res.send(productLimit);
});

app.get(app.get("/products/:id", async (req,res)=>{//capturamos el id por params
    let id = parseInt(req.params.id);
    const allProducts = await readProducts;
    console.log(id)
    let productsById = allProducts.find(products => products.id === id )
    res.send(productsById)
}))



server.on("error", (error)=>console.log(`error del servidor ${error}`));
