const path = require('path');
const fs = require('fs');
const { create } = require('domain');

// CREAMOS LA CONSTANTE PRODUCTS PARA SU UTILIZACIÓN
const productsFilePath = path.resolve('./src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// CREAMOS LA CONSTANTE USERS PARA SU UTILIZACIÓN
const usersFilePath = path.resolve('./src/data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
  
  //Mostrar todos los productos 
    index: (req, res)=>{
        res.render("products")
    },

    //Mostrar detalle de un producto
    detail: (req, res)=>{const productId = req.params.productId
		const productToFind = products.find((product) => product.id == productId)
			if(productToFind == undefined){
				return res.send('No se encontro el producto buscado')
			}
			
			return res.render((path.resolve('/views/products/productDetail.ejs')), {productToFind: productToFind })
	
			
		}, 


    //detalle de un producto
    create: (req, res)=>{
        return res.render(path.resolve('/views/products/createProduct.ejs'))
    },

    //formulario de creacion 
    store:(req, res)=>{
        res.render("adminProduct")
    },

    //formulario para editar
    edit: (req, res) => {
		const productId = req.params.productId
		const productToFind = products.find((product) => product.id == productId)
			if(productToFind == undefined){
				return res.send('No se encontro el producto buscado')
			}
			
			return res.render((path.resolve('views/products/form-edit.ejs')), {productToFind: productToFind })
	
			
		},


        update: (req, res) => {
            const update = req.body
            update.price = Number(update.price)
            //update.discount= Number(update.discount)
            
            const productIndex = products.findIndex((product)=>{
                return product.id == req.params.id
            })
            if(productIndex == -1){
                return res.send("No existe el producto")
            }
            products[productIndex] = {...products[productIndex], ...update}
    
            const jsonProduct = JSON.stringify(products)
            fs.writeFileSync(productsFilePath, jsonProduct) 
            
           return res.send(products[productIndex])
            
        },

    destroy: (req, res)=>{
        res.render()
    }
}


module.exports = controller


/*const renderProductsCart = (req, res) => {
    return res.render('products/productCart');
;

const renderProductsDetail = (req, res) => {
    return res.render('products/productDetail');
};

const renderCreateProduct = (req, res) => {
    return res.render('products/createProduct');
};

const renderAdminProduct = (req, res) => {
    return res.render('products/adminProduct');
};

const renderEditProduct = (req, res) => {
    return res.render('products/editProduct');
};

module.exports = {renderProductsCart, renderProductsDetail, renderCreateProduct, renderAdminProduct, renderEditProduct}**/