const path = require('path');
const fs = require('fs');

// CREAMOS LA CONSTANTE PRODUCTS PARA SU UTILIZACIÓN
const productsFilePath = path.resolve('./src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// CREAMOS LA CONSTANTE USERS PARA SU UTILIZACIÓN
const usersFilePath = path.resolve('./src/data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    index: (req,res) => {
        const inSaleProducts = products.filter(product => product.category == 'in-sale');
        const viewData = {inSaleProducts}
        return res.render("index", viewData);
    }
};

module.exports = {controller};