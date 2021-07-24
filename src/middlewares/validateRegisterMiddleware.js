const { body } = require('express-validator');
const path = require('path');
module.exports = [
    body('fullName').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un email').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('country').notEmpty().withMessage('Tienes que elegir un pais'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');

        }else{
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones del archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })
]