const { validationResult } = require('express-validator');

/**
 * Middleware that reads express-validator results and short-circuits
 * with a 422 response if any validation errors are present.
 *
 * Place this AFTER an array of validation rules in a route, e.g.:
 *   router.post('/', [body('email').isEmail()], validate, controller)
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }

  next();
};

module.exports = validate;
