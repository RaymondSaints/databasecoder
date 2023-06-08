const fs = require('fs');
//import { promises as fs } from "fs";
 



/*export default*/ class ProductManager {
    constructor () {
        this.products = [];
        this.UnId = 0;
        this.path = './Db.JSON';
    }


    addProduct (title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {//Verifico los parametros, para saber si estan todos los campos
            console.log("!Warning!: All fields are required");
            return; 
        }

    const found = this.products.some(product => product.code === code);//Verifico si existe el mismo codigo
        if (found) {
            console.log(`!Warning!: ->${code}<- existing product code, please try again with a different `);
            return;
        }

    const ItemArray = {//Asignacion de valores al array
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id:this.UnId++
    }

    this.products.push (ItemArray);//Empujamos el valor a products
    console.log(`**PRODUCT SUCCESSFULLY ADDED**`);
        fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
            if (err) throw err;
            console.log(`DATA UPDATE SUCCES`);
        });
        
    }

    async getProducts() {//VUELVO ASYNCRONO EL GETPRODUCTS
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            //console.log(products);
            return products;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async getProductById(productId) {//metodo getproductbyid para buscar productos por id
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        const productsById = JSON.parse(data);
        const product = productsById.find(product => product.id === productId);
        if (product) {
            //console.log(product);
            return product; // Retorna el objeto
        } else {
            console.log(`product:${productId} not found - information cannot be displayed`);
        }
    } 

    async updateProduct (productId, field, updateData) {//METODO PARA SUBIR DATOS Y CAMBIARLOS DE UN PRODUCTO EXISTENTE, BUSCA POR ID
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        
        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
            console.log(`product ID not found`);
            return;
        }
        products[index][field] = updateData;

        fs.writeFile(this.path, JSON.stringify(products), err => {
            if (err) throw err;
            console.log(`*Your product has been uploaded*`)
        });
    }

    async deleteProduct (idRemove){//METODO PARA BORRAR POR ID
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);

        const deleteItemFilter = products.filter(product => product.id !== idRemove);

        if (deleteItemFilter.length === products.length) {
            console.log(`*product not found: ${idRemove}*`);
            return;
        }

        fs.writeFile(this.path, JSON.stringify(deleteItemFilter), err => {
            if (err) throw err;
            console.log(`*REMOVED PRODUCT*`);
        });
        
    }


}

//RUNNING PROGRAM
const manager = new ProductManager();


/* manager.addProduct("TV", "TV LG 24 pulgadas", 22654, "img1.jpg", "A01", 25);
manager.addProduct("TV", "TV SHARK 55 pulgadas", 22654, "img12.jpg", "A12", 12);
manager.addProduct("TV", "TV SAMSUNG 75 pulgadas", 150000, "img26.jpg", "A20", 103);
manager.addProduct("Tableta", "Sansumg 1TB almacenamiento", 70000, "img2.jpg", "A48", 12);
manager.addProduct("Relog", "Samsung Galaxi", 65000, "img3.jpg", "A99", 40);
manager.addProduct("Celular", "Samsung Watch", 8000, "img55.jpg", "D95", 40);
manager.addProduct("Celular", "Samsung Galaxi", 65000, "img3.jpg", "S5599", 40); */
//console.log(manager.getProducts());


//manager.addProduct("Relo inteligente", "New generation T800", 5500, "img7.jpg", "A48", 22);//Producto con codigo repetido
//manager.updateProduct(2,'description', 'Computadora new generation');//subida de datos a un producto
//manager.getProductById(3);//Ver producto por id
//manager.deleteProduct(1)//Borrar producto
//console.log(manager.getProductById(2).description);
//console.log(manager.getProducts);
//manager.deleteProduct(2);



//Exporto V
module.exports = ProductManager;
