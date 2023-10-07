const boom = require("@hapi/boom");
const withErrorStack = require("../../utils/withErrorStack");


function logErrors(err, req, res, next) { //esta funcion lo unico q hace es mostrar el error por consoleLog
    console.log(err);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }

    next(err);
    
    //Con la libreria Boom podemos eliminar esto y eliminar lineas de codigo
    // const badImplementationError = {
    //     stack: err.stack,
    //     output: {
    //         statusCode: 500,
    //         payload:{
    //             error: "Internal Server Error",
    //             message: err.message,
    //         },
    //     },
    // };
    //next(badImplementationError); //pasa al otro midleware con el error envuelto al formato que queremos
}

function errorHandler(err, req, res, next) { //un manejador de errores
    const { stack, output } = err;
    res.status(output.statusCode).json(withErrorStack(output.payload, stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    errorHandler,
};