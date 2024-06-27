const { check, param } = require('express-validator');
const { validateResult } = require('./validateHelper');

// Validaciones para los campos de la tabla Paciente
const validatePaciente = [
    check('IdPersona')
        .exists().withMessage("Falta la propiedad IdPersona en el json")
        .notEmpty().withMessage("El IdPersona está vacío")
        .isInt().withMessage("El IdPersona debe ser un número entero"),

    check('Criticidad')
        .exists().withMessage("Falta la propiedad Criticidad en el json")
        .notEmpty().withMessage("La Criticidad está vacía")
        .isString().withMessage("La Criticidad debe ser un texto")
        .isLength({ max: 50 }).withMessage("La Criticidad no puede tener más de 50 caracteres"),

    check('Encamado')
        .exists().withMessage("Falta la propiedad Encamado en el json")
        .notEmpty().withMessage("El Encamado está vacío")
        .isString().withMessage("El Encamado debe ser un texto")
        .isLength({ max: 20 }).withMessage("El Encamado no puede tener más de 20 caracteres"),

    check('Traslado')
        .exists().withMessage("Falta la propiedad Traslado en el json")
        .notEmpty().withMessage("El Traslado está vacío")
        .isString().withMessage("El Traslado debe ser un texto")
        .isLength({ max: 20 }).withMessage("El Traslado no puede tener más de 20 caracteres"),

    check('Estado')
        .exists().withMessage("Falta la propiedad Estado en el json")
        .notEmpty().withMessage("El Estado está vacío")
        .isString().withMessage("El Estado debe ser un texto")
        .isLength({ max: 10 }).withMessage("El Estado no puede tener más de 10 caracteres"),

    check('Prioridad')
        .exists().withMessage("Falta la propiedad Prioridad en el json")
        .isBoolean().withMessage("La propiedad Prioridad debe ser un boolean"),


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

module.exports = { validatePaciente, validateID };
