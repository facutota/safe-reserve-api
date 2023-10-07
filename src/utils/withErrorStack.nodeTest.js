const { describe, it } = require('node:test');
const assert = require('node:assert');
const withErrorStack = require("./withErrorStack");

describe("[ utils / withErrorStack ]", () => {//en test queremos testear la entrada y la salida no lo q pasa adentro de la funcion
    it("should return the error with Stack", () => {// este es el primer caso de test
        //Patron Triple A (Arrange, Act, Assert)

        //Arrange
        const error = {message: "Error"};
        const stack = { TypeError: "Line 32"};
        const expected = {message: "Error", stack: {TypeError: "Line 32"}};

        //Act
        const result = withErrorStack(error, stack, true)

        //Assert
       
        assert.deepStrictEqual(result, expected);

    });

    
})