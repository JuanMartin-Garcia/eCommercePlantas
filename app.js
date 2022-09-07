const partialsRouters = require("./src/Routes/partialsRouters");
const productsRouters = require("./src/Routes/productsRouters");
const usersRouters = require("./src/Routes/usersRouters");
const usuarioLogeadoMiddleware = require("./src/middlewares/usuarioLogeadoMiddleware")
const apiRouters = require("./src/Routes/apiRouters");
const cors = require('cors');

const { Router } = require('express');
const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const session= require("express-session");
app.use(session({secret: "esto es secreto!"}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));


const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(usuarioLogeadoMiddleware)
app.use("/", partialsRouters);
app.use("/products", productsRouters);
app.use("/users", usersRouters);

app.use("/v1", apiRouters)


app.use(cors())

//app.use("/users", usersController);

app.listen(process.env.PORT || 3306, function() {
    console.log("Servidor corriendo");
})





