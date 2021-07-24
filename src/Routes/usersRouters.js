const express = require("express");
const usersController = require("../Controllers/usersController");
const path = require('path');
const multer = require('multer');


const { body } = require('express-validator');
const router = express.Router();

const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');

router.get("/registro", usersController.registro);

router.post('/registro', uploadFile.single('avatar'), validations, usersController.processRegister);


router.get("/login", usersController.login);

router.get('/profile/:userId', usersController.profile);


module.exports = router;