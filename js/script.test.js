const calculatorLogic = require("./script.js");

describe("calculatorLogic", () => {
  beforeEach(() => {
    calculatorLogic.clearAll();
  });

  test("soma simples", () => {
    calculatorLogic.appendNumber("2");
    calculatorLogic.setOperation("add");
    calculatorLogic.appendNumber("3");
    calculatorLogic.calculate();
    expect(calculatorLogic.currentInput).toBe("5");
  });

  test("subtração simples", () => {
    calculatorLogic.appendNumber("7");
    calculatorLogic.setOperation("subtract");
    calculatorLogic.appendNumber("4");
    calculatorLogic.calculate();
    expect(calculatorLogic.currentInput).toBe("3");
  });

  test("multiplicação simples", () => {
    calculatorLogic.appendNumber("6");
    calculatorLogic.setOperation("multiply");
    calculatorLogic.appendNumber("7");
    calculatorLogic.calculate();
    expect(calculatorLogic.currentInput).toBe("42");
  });

  test("divisão simples", () => {
    calculatorLogic.appendNumber("8");
    calculatorLogic.setOperation("divide");
    calculatorLogic.appendNumber("2");
    calculatorLogic.calculate();
    expect(calculatorLogic.currentInput).toBe("4");
  });

  test("divisão por zero", () => {
    calculatorLogic.appendNumber("8");
    calculatorLogic.setOperation("divide");
    calculatorLogic.appendNumber("0");
    calculatorLogic.calculate();
    expect(calculatorLogic.currentInput).toBe("Erro");
  });

  test("porcentagem", () => {
    calculatorLogic.appendNumber("50");
    calculatorLogic.applyPercentage();
    expect(calculatorLogic.currentInput).toBe("0.5");
  });

  test("negação", () => {
    calculatorLogic.appendNumber("9");
    calculatorLogic.negate();
    expect(calculatorLogic.currentInput).toBe("-9");
  });
});
