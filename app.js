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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use("/", partialsRouters);
app.use("/products", productsRouters);
app.use("/users", usersRouters);


//app.use("/users", usersController);

app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
})





