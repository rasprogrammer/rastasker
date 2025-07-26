const Joi = require('joi');

const validateMemberInput = (req, res, data, edit = false) => {
    const { name, email, password, phone, team } = data;

    const objectSchema = Joi.object({
        name: Joi.string().required(),
        email: edit ?
            Joi.string().email({ tlds: { allow: true } }) :
            Joi.string().email({ tlds: { allow: true } }).required(),
        password: edit ?
            Joi.string() :
            Joi.string().required(),
        phone: Joi.string().required(),
        team: Joi.string(),
    });

    const validateData = { name, email, phone, team };
    if (edit) {
        validateData.password = password;
    }

    const { error } = objectSchema.validate(validateData);

    if (error) {
        res.status(409).json({
            success: false,
            result: null,
            message: error.message,
            erorr: error,
            errorMessage: error.message
        });
        return true;
    }
    return false;

}

module.exports = {
    validateMemberInput
}