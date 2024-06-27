const { validationResult } = require('express-validator')

/** 
 * using for validate result with the option required
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        return res.status(400).json({ errors: err.array() })

    }
}

module.exports = { validateResult }