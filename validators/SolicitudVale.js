// validators/validateSolicitudVale.js
const { check, param } = require('express-validator');
const { validateResult } = require('./validateHelper'); // Ajusta la ruta según tu estructura

const validateSolicitudVale = [
  check('NombreSolicitante')
    .exists().withMessage("Falta la propiedad NombreSolicitante en el JSON")
    .notEmpty().withMessage("El NombreSolicitante está vacío")
    .isString().withMessage("El NombreSolicitante debe ser un texto")
    .isLength({ max: 80 }).withMessage("El NombreSolicitante no puede tener más de 100 caracteres"),

  check('DestinoId')
    .exists().withMessage("Falta la propiedad DestinoId en el JSON")
    .notEmpty().withMessage("El DestinoId está vacío")
    .isString().withMessage("El DestinoId debe ser un texto")
    .isLength({ max: 10 }).withMessage("El DestinoId no puede tener más de 10 caracteres"),

  check('SalidaId')
    .exists().withMessage("Falta la propiedad SalidaId en el JSON")
    .notEmpty().withMessage("El SalidaId está vacío")
    .isString().withMessage("El SalidaId debe ser un texto")
    .isLength({ max: 10 }).withMessage("El SalidaId no puede tener más de 10 caracteres"),

  check('MotivoId')
    .exists().withMessage("Falta la propiedad MotivoId en el JSON")
    .notEmpty().withMessage("El MotivoId está vacío")
    .isInt().withMessage("El MotivoId debe ser un número entero"),

  check('ServicioId')
    .exists().withMessage("Falta la propiedad ServicioId en el JSON")
    .notEmpty().withMessage("El ServicioId está vacío")
    .isInt().withMessage("El ServicioId debe ser un número entero"),

  check('Fecha_Solicitud')
    .exists().withMessage("Falta la propiedad Fecha_Solicitud en el JSON")
    .notEmpty().withMessage("La Fecha_Solicitud está vacía")
    .isISO8601().withMessage("La Fecha_Solicitud debe ser una fecha ISO8601 válida"),

  check('Hora_Salida')
    .exists().withMessage("Falta la propiedad Hora_Salida en el JSON")
    .notEmpty().withMessage("La Hora_Salida está vacía")
    .isString().withMessage("La Hora_Salida debe ser un texto"),

  check('Detalle')
    .optional() // Permitimos que el Detalle sea opcional
    .isString().withMessage("El Detalle debe ser un texto"),

  check('IdUnidadProgramatica')
    .exists().withMessage("Falta la propiedad IdUnidadProgramatica en el JSON")
    .notEmpty().withMessage("El IdUnidadProgramatica está vacío")
    .isInt().withMessage("El IdUnidadProgramatica debe ser un número entero"),

  check('EstadoId')
    .exists().withMessage("Falta la propiedad EstadoId en el JSON")
    .notEmpty().withMessage("El EstadoId está vacío")
    .isInt().withMessage("El EstadoId debe ser un número entero"),

  (req, res, next) => {
    validateResult(req, res, next);
  }
];


module.exports = { validateSolicitudVale };
