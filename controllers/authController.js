const path = require('path');
const fs = require('fs');
const { create } = require('domain');

// CREAMOS LA CONSTANTE PRODUCTS PARA SU UTILIZACIÓN
const productsFilePath = path.resolve('./src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// CREAMOS LA CONSTANTE USERS PARA SU UTILIZACIÓN
const usersFilePath = path.resolve('./src/data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// Express-validator
const { validationResult } = require('express-validator');

const renderRegister = (req, res) => {
    return res.render('users/register');
};

const renderLogin = (req, res) => {
    return res.render('users/login');
};

const createUser = (req, res) => {
        const newUser = req.body;
        const newImage = req.files;
        newUser.id = users.length + 1
        newUser.id = String(newUser.id);
        newUser.img = newImage.user_logo[0].filename
        newUser.role = "user";
        users.push(newUser)
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        const userData = {users: newUser};
        const inSaleProducts = products.filter(product => product.category == 'in-sale');
        const viewData = {inSaleProducts, userData}
        return res.render("index", viewData);
};

const login = (req,res) => {
    const userLoginData = req.body;
    const userData = users;
    const inSaleProducts = products.filter(product => product.category == 'in-sale');
    const viewData = {inSaleProducts , userLoginData, userData}
    return res.render("index", viewData);
};

module.exports = {renderRegister, renderLogin, createUser, login};