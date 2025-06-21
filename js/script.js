// Estado da calculadora
let currentInput = "0";
let previousInput = "";
let operation = null;
let resetOnNextInput = false;

// Elementos DOM
const display = document.getElementById("display");
const historyList = document.getElementById("history");
const emptyHistory = document.getElementById("empty-history");

// Inicializar a calculadora
function initCalculator() {
  // Carregar histórico do localStorage
  loadHistory();

  // Configurar event listeners para botões numéricos
  document.querySelectorAll("[data-number]").forEach((button) => {
    button.addEventListener("click", () => {
      appendNumber(button.getAttribute("data-number"));
      animateButton(button);
    });
  });

  // Configurar event listeners para botões de ação
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      handleAction(button.getAttribute("data-action"));
      animateButton(button);
    });
  });

  // Configurar botão de limpar histórico
  document.getElementById("clear-history").addEventListener("click", () => {
    clearHistory();
    animateButton(document.getElementById("clear-history"));
  });

  // Atualizar display inicial
  updateDisplay();
}

// Adicionar número ao display
function appendNumber(number) {
  if (resetOnNextInput) {
    currentInput = "0";
    resetOnNextInput = false;
  }

  if (number === "." && currentInput.includes(".")) return;

  if (currentInput === "0" && number !== ".") {
    currentInput = number;
  } else {
    currentInput += number;
  }

  updateDisplay();
}

// Manipular ações (operações, clear, etc)
function handleAction(action) {
  switch (action) {
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      setOperation(action);
      break;
    case "calculate":
      calculate();
      break;
    case "clear":
      clearAll();
      break;
    case "backspace":
      backspace();
      break;
    case "percentage":
      applyPercentage();
      break;
    case "negate":
      negate();
      break;
  }
}

// Definir operação
function setOperation(op) {
  if (currentInput === "") return;

  if (previousInput !== "") {
    calculate();
  }

  operation = op;
  previousInput = currentInput;
  currentInput = "";
  resetOnNextInput = false;
  updateDisplay();
}

// Calcular resultado
function calculate() {
  if (operation === null || previousInput === "") return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "add":
      result = prev + current;
      break;
    case "subtract":
      result = prev - current;
      break;
    case "multiply":
      result = prev * current;
      break;
    case "divide":
      if (current === 0) {
        currentInput = "Erro";
        updateDisplay();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // Formatar resultado para evitar exponenciais
  let resultStr = result.toString();
  if (resultStr.length > 12) {
    resultStr = result.toPrecision(8);
  }

  // Adicionar ao histórico
  addToHistory(
    `${previousInput} ${getOperationSymbol(
      operation
    )} ${currentInput} = ${resultStr}`
  );

  currentInput = resultStr;
  operation = null;
  previousInput = "";
  resetOnNextInput = true;
  updateDisplay();
}

// Limpar tudo
function clearAll() {
  currentInput = "0";
  previousInput = "";
  operation = null;
  resetOnNextInput = false;
  updateDisplay();
}

// Voltar um caractere
function backspace() {
  if (
    currentInput.length === 1 ||
    (currentInput.length === 2 && currentInput.startsWith("-"))
  ) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

// Aplicar porcentagem
function applyPercentage() {
  const value = parseFloat(currentInput);
  if (isNaN(value)) return;

  currentInput = (value / 100).toString();
  updateDisplay();
}

// Negar valor
function negate() {
  currentInput = (parseFloat(currentInput) * -1).toString();
  updateDisplay();
}

// Atualizar display
function updateDisplay() {
  if (display) {
    let expressao = "";
    if (previousInput && operation) {
      expressao = `${previousInput} ${getOperationSymbol(operation)} `;
    }
    expressao += currentInput;
    display.textContent = expressao;

    // Animação de atualização
    gsap.to(display, {
      scale: 1.05,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
  }
}

// Obter símbolo da operação
function getOperationSymbol(op) {
  switch (op) {
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "×";
    case "divide":
      return "÷";
    default:
      return "";
  }
}

// Adicionar ao histórico
function addToHistory(entry) {
  const history = getHistory();
  history.unshift(entry);

  // Limitar histórico a 20 itens
  if (history.length > 20) {
    history.pop();
  }

  localStorage.setItem("calculatorHistory", JSON.stringify(history));
  renderHistory();
}

// Obter histórico do localStorage
function getHistory() {
  return JSON.parse(localStorage.getItem("calculatorHistory")) || [];
}

function saveHistory(history) {
  localStorage.setItem("calculatorHistory", JSON.stringify(history));
}

// Renderizar histórico
function renderHistory() {
  const history = getHistory();
  const historyDiv = document.getElementById("history");
  const emptyHistory = document.getElementById("empty-history");
  historyDiv.innerHTML = "";
  if (history.length === 0) {
    emptyHistory.classList.remove("hidden");
  } else {
    emptyHistory.classList.add("hidden");
    history.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = item;
      historyDiv.appendChild(div);
    });
  }
}

// Carregar histórico
function loadHistory() {
  renderHistory();
}

// Deletar item do histórico
function deleteHistoryItem(index) {
  const history = getHistory();
  if (index >= 0 && index < history.length) {
    history.splice(index, 1);
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
    renderHistory();
  }
}

// Limpar histórico
function clearHistory() {
  localStorage.removeItem("calculatorHistory");
  renderHistory();

  // Animação de limpeza
  gsap.to(historyList, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      gsap.set(historyList, { opacity: 1 });
    },
  });
}

// Animação de botão
function animateButton(button) {
  gsap.to(button, {
    scale: 0.9,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut",
  });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // Animação inicial
  gsap.from(".max-w-md", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  initCalculator();
});

function atualizarDisplay() {
  const display = document.getElementById("display");
  display.textContent = `${primeiroNumero || ""} ${operador || ""} ${
    segundoNumero || ""
  }`;
}

// Sempre que um número ou operador for pressionado, chame atualizarDisplay()
// Exemplo:
function pressionarNumero(numero) {
  if (!operador) {
    primeiroNumero += numero;
  } else {
    segundoNumero += numero;
  }
  atualizarDisplay();
}

function pressionarOperador(op) {
  if (primeiroNumero) {
    operador = op;
  }
  atualizarDisplay();
}

// Lógica da calculadora para testes
const calculatorLogic = {
  currentInput: "0",
  previousInput: "",
  operation: null,
  resetOnNextInput: false,

  appendNumber(number) {
    if (this.resetOnNextInput) {
      this.currentInput = "0";
      this.resetOnNextInput = false;
    }
    if (number === "." && this.currentInput.includes(".")) return;
    if (this.currentInput === "0" && number !== ".") {
      this.currentInput = number;
    } else {
      this.currentInput += number;
    }
  },

  setOperation(op) {
    if (this.currentInput === "") return;
    if (this.previousInput !== "") {
      this.calculate();
    }
    this.operation = op;
    this.previousInput = this.currentInput;
    this.currentInput = "";
    this.resetOnNextInput = false;
  },

  calculate() {
    if (this.operation === null || this.previousInput === "") return;
    let result;
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "add":
        result = prev + current;
        break;
      case "subtract":
        result = prev - current;
        break;
      case "multiply":
        result = prev * current;
        break;
      case "divide":
        if (current === 0) {
          this.currentInput = "Erro";
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }
    let resultStr = result.toString();
    if (resultStr.length > 12) {
      resultStr = result.toPrecision(8);
    }
    this.currentInput = resultStr;
    this.operation = null;
    this.previousInput = "";
    this.resetOnNextInput = true;
  },

  clearAll() {
    this.currentInput = "0";
    this.previousInput = "";
    this.operation = null;
    this.resetOnNextInput = false;
  },

  applyPercentage() {
    const value = parseFloat(this.currentInput);
    if (isNaN(value)) return;
    this.currentInput = (value / 100).toString();
  },

  negate() {
    this.currentInput = (parseFloat(this.currentInput) * -1).toString();
  },
};

// Exportar para testes
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = calculatorLogic;
}
