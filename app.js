const partialsRouters = require("./src/Routes/partialsRouters");
const productsRouters = require("./src/Routes/productsRouters");
const usersRouters = require("./src/Routes/usersRouters");

const { Router } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));


const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));



app.use("/", partialsRouters);
app.use("/products", productsRouters);
app.use("/users", usersRouters);
app.use(methodOverride('_method'));

//app.use("/users", usersController);

app.listen(3002, () => {
    console.log("Servidor 3002 corriendo pefecto")   
});



module.exports = app;

