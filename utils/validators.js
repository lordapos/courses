const {body, validationResult} = require('express-validator/check')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Please enter a valid email')
        .custom(async (value, {req}) => {
            try {
                const candidate = await User.findOne({email: value})
                if (candidate) {
                    return Promise.reject('User with this email already exists!')
                }
            } catch (e) {
                console.log(e)
            }
        })
        .normalizeEmail(),
    body('password', 'Password must be at least 6 characters')
        .isLength({min: 6, max: 56}).isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match')
            }
            return true
        })
        .trim(),
    body('name')
        .isLength({min: 3}).withMessage('The name must be at least 3 characters')
        .trim(),
]