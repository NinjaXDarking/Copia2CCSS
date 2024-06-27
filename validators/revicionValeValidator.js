// validators/revicionValeValidator.js
const { check } = require('express-validator');

const validateRevicionVale = [
    check('IdVale')
        .exists().withMessage("Falta la propiedad IdVale en el JSON")
        .notEmpty().withMessage("El IdVale está vacío")
        .isInt().withMessage("El IdVale debe ser un número entero"),

    check('IdUnidad')
        .exists().withMessage("Falta la propiedad IdUnidad en el JSON")
        .notEmpty().withMessage("El IdUnidad está vacío")
        .isInt().withMessage("El IdUnidad debe ser un número entero"),

    check('IdChofer')
        .exists().withMessage("Falta la propiedad IdChofer en el JSON")
        .notEmpty().withMessage("El IdChofer está vacío")
        .isInt().withMessage("El IdChofer debe ser un número entero"),

    check('IdFuncionario')
        .exists().withMessage("Falta la propiedad IdFuncionario en el JSON")
        .notEmpty().withMessage("El IdFuncionario está vacío")
        .isInt().withMessage("El IdFuncionario debe ser un número entero"),

    check('FechaRevision')
        .exists().withMessage("Falta la propiedad FechaRevision en el JSON")
        .notEmpty().withMessage("La FechaRevision está vacía")
        .isISO8601().toDate().withMessage("FechaRevision debe ser una fecha válida en formato ISO8601"),

    check('Observaciones')
        .optional()
        .isString().withMessage("Las Observaciones deben ser una cadena de texto")
        .isLength({ max: 255 }).withMessage("Las Observaciones no pueden tener más de 255 caracteres")
];

module.exports = {
    validateRevicionVale
};
