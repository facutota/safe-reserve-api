const validate = require("../validate");
const boom = require("@hapi/boom"); //nos facilita el manejo de errores

// @param {object} validationSchema - { [K in "body" | "query" | "params"]: joiSchema}
function createValidationMidleware(validationSchema){
    const[[payloadKey, joiSchema]] = Object.entries(validationSchema);
   
    if(payloadKey !== "body" && payloadKey !== "params" && payloadKey !== "query"){
        throw new Error("Invalid payload key must be one of 'body, 'query' or 'params'");
    };

    return function validationMidleware(req, res, next){
        const error = validate(req[payloadKey], joiSchema);
        error ? next(boom.badRequest(error)) : next();        
    }
}

module.exports = createValidationMidleware;