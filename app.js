const express = require('express');
const ProductManager = require('./ProductManager.js')

const PUERTO = 8080;
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
       


app.get('/', async (req, res)=>{//INDEX PAGE
    res.send("WELCOME TO MAIN PAGE")

})

app.get('/productsBy/:id', async (req, res) => {//find to id
    const productManager = new ProductManager
    const id = req.params.id

     try {
        await productManager
        const product = await productManager.getProductById(id)
        

        if (!product) {
            res.send(`ID NOT FOUND:${id}`)
        } else {
            return res.send(product)
        }

    } catch (error) {
        res.send(error)
    } 
})




app.get('/products', async (req, res) => {//ALL PRODUCTS or YOUR NUMBERS OF PRODUCTS
    const cant = req.query.cant; //query
    const productManager = new ProductManager()

    try {
        await productManager
        let products = await productManager.getProducts()
        console.log(products)
        if (cant) {
            products = products.slice(0, parseInt(cant))
            res.send(products)
            
        }
        
        res.json(products)
    } catch (error) {
        res.send(error)
    }
})




//upload a user
app.post('/usersup', async (req, res)=>{
    res.send(`work in progress`)
    
    
})
//---------



app.listen(PUERTO, () => {
    console.log(`Server runing in port:${PUERTO}`)
})
