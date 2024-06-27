// validators/validateSolicitudVale.js
const { check, param } = require('express-validator');
const { validateResult } = require('./validateHelper'); // Ajusta la ruta según tu estructura

const validateSolicitudVale = [
  check('NombreSolicitante')
    .exists().withMessage("Falta la propiedad NombreSolicitante en el JSON")
    .notEmpty().withMessage("El NombreSolicitante está vacío")
    .isString().withMessage("El NombreSolicitante debe ser un texto")
    .isLength({ max: 100 }).withMessage("El NombreSolicitante no puede tener más de 100 caracteres"),

  check('Unidad')
    .exists().withMessage("Falta la propiedad Unidad en el JSON")
    .notEmpty().withMessage("La Unidad está vacía")
    .isString().withMessage("La Unidad debe ser un texto")
    .isLength({ max: 100 }).withMessage("La Unidad no puede tener más de 100 caracteres"),

  check('DestinoId')
    .exists().withMessage("Falta la propiedad DestinoId en el JSON")
    .notEmpty().withMessage("El DestinoId está vacío")
    .isString().withMessage("El DestinoId debe ser un texto")
    .isLength({ max: 10 }).withMessage("El DestinoId no puede tener más de 10 caracteres"),

  check('MotivoID')
    .exists().withMessage("Falta la propiedad MotivoID en el JSON")
    .notEmpty().withMessage("El MotivoID está vacío")
    .isInt().withMessage("El MotivoID debe ser un número entero"),

  check('ServicioID')
    .exists().withMessage("Falta la propiedad ServicioID en el JSON")
    .notEmpty().withMessage("El ServicioID está vacío")
    .isInt().withMessage("El ServicioID debe ser un número entero"),

  check('Fecha_Solicitud')
    .exists().withMessage("Falta la propiedad Fecha_Solicitud en el JSON")
    .notEmpty().withMessage("La Fecha_Solicitud está vacía")
    .isDate().withMessage("La Fecha_Solicitud debe ser una fecha válida"),

  check('Hora_Salida')
    .exists().withMessage("Falta la propiedad Hora_Salida en el JSON")
    .notEmpty().withMessage("La Hora_Salida está vacía")
    .isString().withMessage("La Hora_Salida debe ser un texto"),

  check('Detalle')
    .exists().withMessage("Falta la propiedad Detalle en el JSON")
    .notEmpty().withMessage("El Detalle está vacío")
    .isString().withMessage("El Detalle debe ser un texto"),

  check('IdUnidadProgramatica')
    .exists().withMessage("Falta la propiedad IdUnidadProgramatica en el JSON")
    .notEmpty().withMessage("El IdUnidadProgramatica está vacío")
    .isInt().withMessage("El IdUnidadProgramatica debe ser un número entero"),

  check('EstadoValeID')
    .exists().withMessage("Falta la propiedad EstadoValeID en el JSON")
    .notEmpty().withMessage("El EstadoValeID está vacío")
    .isInt().withMessage("El EstadoValeID debe ser un número entero"),

  (req, res, next) => {
    validateResult(req, res, next);
  }
];

const validateID = [
  param('id')
    .exists().withMessage("Falta la propiedad id en el JSON")
    .notEmpty().withMessage("La id está vacía")
    .isString().withMessage("La id debe ser una cadena de texto")
    .custom((value, { req }) => /^[0-9]{4}-\d{3}$/.test(value)).withMessage("El id debe seguir el formato 'aaaa-nnn'"),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateSolicitudVale };
