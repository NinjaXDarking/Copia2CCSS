const { check } = require('express-validator');

const validateRevicionVale = [
    check('IdVale')
        .exists().withMessage("Falta la propiedad IdVale en el JSON")
        .notEmpty().withMessage("El IdVale está vacío")
        .isString().withMessage("El IdVale debe ser una cadena de texto")
        .isLength({ max: 20 }).withMessage("El IdVale no puede tener más de 20 caracteres"),

    check('IdUnidad')
        .exists().withMessage("Falta la propiedad IdUnidad en el JSON")
        .notEmpty().withMessage("El IdUnidad está vacío")
        .isInt({ min: 1 }).withMessage("El IdUnidad debe ser un número entero positivo"),

    check('IdChofer')
        .exists().withMessage("Falta la propiedad IdChofer en el JSON")
        .notEmpty().withMessage("El IdChofer está vacío")
        .isInt({ min: 1 }).withMessage("El IdChofer debe ser un número entero positivo"),

    check('Encargado')
        .exists().withMessage("Falta la propiedad Encargado en el JSON")
        .notEmpty().withMessage("El Encargado está vacío")
        .isString().withMessage("El Encargado debe ser una cadena de texto")
        .isLength({ max: 50 }).withMessage("El Encargado no puede tener más de 50 caracteres"),

    check('Observaciones')
        .optional()
        .isString().withMessage("Las Observaciones deben ser una cadena de texto")
        .isLength({ max: 255 }).withMessage("Las Observaciones no pueden tener más de 255 caracteres")
];

module.exports = {
    validateRevicionVale
};
