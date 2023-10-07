const { expect } = require('@jest/globals');
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
        expect(result).toEqual(expected);

    });

    it("should return the error withOUT Stack", () => {// este es el segundo caso de test retornar sin el stack
//Patron Triple A (Arrange, Act, Assert)

        //Arrange
        const error = {message: "Error"};
        const stack = { TypeError: "Line 32"};
        const expected = {message: "Error"};

        //Act
        const result = withErrorStack(error, stack, false)

        //Assert
        expect(result).toEqual(expected);

    });
})