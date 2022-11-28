const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routers/mainRouter');
const productsRouter = require('./routers/productsRouter');
const authRouter = require('./routers/authRouter');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: false})); //Para poder trabajar con los datos del JSON
app.use(express.json())

app.use(express.static('public')); // Carpeta publica 'public'

/* CONFIGURACION VIEW ENGINE A EJS */
app.set('view engine','ejs');

/* CONFIGURACION PARA PUERTO RANDOM O PUERTO 2000 - PARA PODER RENDERIZAR */
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Servidor corriendo en el puerto ' + port));

app.use(mainRouter);

app.use(productsRouter);

app.use(authRouter);