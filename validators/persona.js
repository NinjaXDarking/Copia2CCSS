const { check, param } = require('express-validator');
const { validateResult } = require('./validateHelper');

// Validaciones para los campos de la tabla Persona
const validatePersona = [
    check('Nombre')
        .exists().withMessage("Falta la propiedad Nombre en el json")
        .notEmpty().withMessage("El nombre está vacío")
        .isString().withMessage("El nombre debe ser un texto")
        .isLength({ max: 50 }).withMessage("El nombre no puede tener más de 50 caracteres"),

    check('Apellido1')
        .exists().withMessage("Falta la propiedad Apellido1 en el json")
        .notEmpty().withMessage("El primer apellido está vacío")
        .isString().withMessage("El primer apellido debe ser un texto")
        .isLength({ max: 50 }).withMessage("El primer apellido no puede tener más de 50 caracteres"),

    check('Apellido2')
        .exists().withMessage("Falta la propiedad Apellido2 en el json")
        .notEmpty().withMessage("El segundo apellido está vacío")
        .isString().withMessage("El segundo apellido debe ser un texto")
        .isLength({ max: 50 }).withMessage("El segundo apellido no puede tener más de 50 caracteres"),

    check('Identificacion')
        .exists().withMessage("Falta la propiedad Identificacion en el json")
        .notEmpty().withMessage("La identificación está vacía")
        .isString().withMessage("La identificación debe ser un texto")
        .isLength({ max: 20 }).withMessage("La identificación no puede tener más de 20 caracteres"),

    check('Tipo_identificacion')
        .exists().withMessage("Falta la propiedad Tipo_identificacion en el json")
        .notEmpty().withMessage("El tipo de identificación está vacío")
        .isString().withMessage("El tipo de identificación debe ser un texto")
        .isLength({ max: 20 }).withMessage("El tipo de identificación no puede tener más de 20 caracteres"),

    check('Genero')
        .exists().withMessage("Falta la propiedad Genero en el json")
        .notEmpty().withMessage("El género está vacío")
        .isString().withMessage("El género debe ser un texto")
        .isLength({ max: 20 }).withMessage("El género no puede tener más de 20 caracteres"),

    check('Telefono1')
        .isInt().withMessage("El teléfono 1 debe ser un número entero")
        .isLength({ max: 15 }).withMessage("El teléfono 1 no puede tener más de 15 caracteres"),

    check('Telefono2')
        .optional()
        .isInt().withMessage("El teléfono 2 debe ser un número entero")
        .isLength({ max: 15 }).withMessage("El teléfono 2 no puede tener más de 15 caracteres"),

    check('Tipo_seguro')
        .exists().withMessage("Falta la propiedad Tipo_seguro en el json")
        .notEmpty().withMessage("El tipo de seguro está vacío")
        .isString().withMessage("El tipo de seguro debe ser un texto")
        .isLength({ max: 20 }).withMessage("El tipo de seguro no puede tener más de 20 caracteres"),

    check('Direccion')
        .isString().withMessage("La dirección debe ser un texto"),

    check('Latitud')
        .isFloat().withMessage("La latitud debe ser un número"),

    check('Longitud')
        .isFloat().withMessage("La longitud debe ser un número"),

    check('Tipo_sangre')
        .isString().withMessage("El tipo de sangre debe ser un texto"),

    (req, res, next) => {
        validateResult(req, res, next);
    }
];

const validateID = [
    param('id')
        .exists().withMessage("Falta la propiedad id en el json")
        .not()
        .isEmpty().withMessage("La id esta vacia")
        .isNumeric().withMessage("La id solo puede contener numeros")
        .custom((value, { req }) => value > 0).withMessage("El id no puede contener numeros negativos"),

    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validatePersona, validateID };
