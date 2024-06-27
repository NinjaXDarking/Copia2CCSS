const { check, param } = require('express-validator');
const { validateResult } = require('../validators/validateHelper');

const validateAcompanante = [

  check('IdPaciente')
    .exists().withMessage("Falta la propiedad IdPaciente en el json")
    .notEmpty().withMessage("EL IdPaciente está vacío")
    .isInt().withMessage("El IdPaciente debe ser un número entero"),

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

  check('Parentesco')
    .exists().withMessage("Falta la propiedad Parentesco en el JSON")
    .notEmpty().withMessage("El Parentesco no puede estar vacío")
    .isString().withMessage("El Parentesco debe ser una cadena de texto")
    .isLength({ max: 50 }).withMessage("El Parentesco no puede tener más de 50 caracteres"),

  check('Telefono1')
    .isInt().withMessage("El teléfono 1 debe ser un número entero")
    .isLength({ max: 15 }).withMessage("El teléfono 1 no puede tener más de 15 caracteres"),

  check('Telefono2')
    .optional()
    .isInt().withMessage("El teléfono 2 debe ser un número entero")
    .isLength({ max: 15 }).withMessage("El teléfono 2 no puede tener más de 15 caracteres"),

  check('Estado')
    .optional()  // Es opcional porque tiene un valor por defecto
    .notEmpty().withMessage("El Estado no puede estar vacío")
    .isString().withMessage("El Estado debe ser una cadena de texto")
    .isIn(['Activo', 'Inactivo']).withMessage("El Estado solo puede ser 'Activo' o 'Inactivo'"),

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

module.exports = { validateAcompanante, validateID };
