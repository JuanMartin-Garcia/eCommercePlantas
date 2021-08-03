const express = require('express');
const router = express.Router();
const usersController = require("../Controllers/usersController");
const path = require('path');
const multer = require('multer');


const { body } = require('express-validator');


const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/registro", guestMiddleware, usersController.registro);
router.post('/registro', uploadFile.single('imagen'), validations, usersController.processRegister);


router.get("/login", guestMiddleware, usersController.login);

router.post("/login", usersController.loginProcess);


router.get('/profile', authMiddleware, usersController.profile);


module.exports = router;