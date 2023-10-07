const config = require("../config");

function withErrorStack(error, stack, _isStackShown = config.dev) {
    if (_isStackShown) { //estamos haciendo inyeccion de dependencias para hacer el test
       return { ...error, stack }; //stack es todo el detalle del error, se le pone ...error como es un objeto para que aparezca todo la info del objeto
   }
   return error
}

module.exports = withErrorStack;