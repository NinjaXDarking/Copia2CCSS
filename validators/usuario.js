const { check, param } = require('express-validator');
const { validateResult } = require('./validateHelper');

// Validaciones para los campos de la tabla Usuario
const validateUsuario = [
    check('Identificacion')
        .exists().withMessage("Falta la propiedad Identificacion en el JSON")
        .notEmpty().withMessage("La identificación está vacía")
        .isString().withMessage("La identificación debe ser un texto")
        .isLength({ max: 20 }).withMessage("La identificación no puede tener más de 20 caracteres"),

    check('Nombre')
        .exists().withMessage("Falta la propiedad Nombre en el JSON")
        .notEmpty().withMessage("El nombre está vacío")
        .isString().withMessage("El nombre debe ser un texto")
        .isLength({ max: 50 }).withMessage("El nombre no puede tener más de 50 caracteres"),

    check('Apellido1')
        .exists().withMessage("Falta la propiedad Apellido1 en el JSON")
        .notEmpty().withMessage("El primer apellido está vacío")
        .isString().withMessage("El primer apellido debe ser un texto")
        .isLength({ max: 50 }).withMessage("El primer apellido no puede tener más de 50 caracteres"),

    check('Apellido2')
        .exists().withMessage("Falta la propiedad Apellido2 en el JSON")
        .notEmpty().withMessage("El segundo apellido está vacío")
        .isString().withMessage("El segundo apellido debe ser un texto")
        .isLength({ max: 50 }).withMessage("El segundo apellido no puede tener más de 50 caracteres"),

    check('Rol')
        .exists().withMessage("Falta la propiedad Rol en el JSON")
        .notEmpty().withMessage("El rol está vacío")
        .isString().withMessage("El rol debe ser un texto")
        .isLength({ max: 20 }).withMessage("El rol no puede tener más de 20 caracteres"),

    check('Contrasena')
        .exists().withMessage("Falta la propiedad Contrasena en el JSON")
        .notEmpty().withMessage("La contraseña está vacía")
        .isString().withMessage("La contraseña debe ser un texto"),

    check('Correo')
        .exists().withMessage("Falta la propiedad Correo en el JSON")
        .notEmpty().withMessage("El correo está vacío")
        .isEmail().withMessage("El correo electrónico no es válido")
        .isLength({ max: 100 }).withMessage("El correo no puede tener más de 100 caracteres"),

    check('Estado')
        .optional()
        .isString().withMessage("El estado debe ser un texto")
        .isIn(['Activo', 'Inactivo']).withMessage("El estado solo puede ser 'Activo' o 'Inactivo'"),

    check('CambiarContrasena')
        .optional()
        .isBoolean().withMessage("El CambiarContrasena debe ser true o false"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateID = [
    param('id')
        .exists().withMessage("Falta la propiedad id en el JSON")
        .notEmpty().withMessage("El ID está vacío")
        .isNumeric().withMessage("El ID debe ser numérico")
        .custom((value, { req }) => value > 0).withMessage("El ID debe ser mayor que cero"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];
const validateLogin = [
    check('Identificacion')
        .exists().withMessage("Falta la propiedad Identificacion en el JSON")
        .notEmpty().withMessage("La identificación está vacía")
        .isString().withMessage("La identificación debe ser un texto")
        .isLength({ max: 20 }).withMessage("La identificación no puede tener más de 20 caracteres"),

    check('Contrasena')
        .exists().withMessage("Falta la propiedad Contrasena en el JSON")
        .notEmpty().withMessage("La contraseña está vacía")
        .isString().withMessage("La contraseña debe ser un texto"),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateUsuario, validateID, validateLogin };
