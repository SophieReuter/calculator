import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");
  const [currentChar, setChar] = useState("");
  const [calculation, setCalculation] = useState([]);

  const chars = [
    { id: "divide", char: "/" },
    { id: "multiply", char: "*" },
    { id: "seven", char: "7" },
    { id: "eight", char: "8" },
    { id: "nine", char: "9" },
    { id: "subtract", char: "-" },
    { id: "four", char: "4" },
    { id: "five", char: "5" },
    { id: "six", char: "6" },
    { id: "add", char: "+" },
    { id: "one", char: "1" },
    { id: "two", char: "2" },
    { id: "three", char: "3" },
    { id: "decimal", char: "." },
    { id: "zero", char: "0" },
  ];

  const operators = ["/", "*", "-", "+"];
  const specialCharacters = ["/", "*", "-", "+", "."];

  const charButtons = [];

  const isOperator = (value) => {
    return operators.includes(value);
  };

  const isNumber = (value) => {
    return !specialCharacters.includes(value);
  };

  const deleteCalculation = () => {
    setDisplay("");
    setChar("");
    setCalculation([]);
  };

  const addInput = (input) => {
    //debugger;
    const lastChar = calculation[calculation.length - 1];
    const secondLastChar = calculation[calculation.length - 2];
    if (lastChar === "0" && isNumber(input)) return;
    if (
      (!isOperator(lastChar) && !isOperator(input) && lastChar !== undefined) ||
      (lastChar === "-" &&
        !isOperator(input) &&
        (!isNumber(secondLastChar) || secondLastChar == undefined))
    ) {
      const newNumber = lastChar + input;
      setCalculation((prev) => {
        const newArray = [...prev];
        newArray[newArray.length - 1] = newNumber;
        return newArray;
      });
      setDisplay((prev) => prev + input);
      setChar(newNumber);
    } else {
      setDisplay((prev) => prev + input);
      setCalculation((prev) => [...prev, input]);
      setChar(input);
    }
  };

  for (let value of chars) {
    const identifier = `${value.id}`;
    charButtons.push(
      <button
        key={identifier}
        id={identifier}
        className="numbers"
        onClick={() => {
          addInput(value.char);
        }}
      >
        {value.char}
      </button>
    );
  }

  const calculateResult = () => {
    const newArray = [...calculation];
    setDisplay((prev) => prev + "=");
    debugger;
    if (!isNumber(newArray[newArray.length - 1])) {
      alert("Every calculation needs to end with a numeric value!");
      deleteCalculation();
      return;
    }
    for (let i = 0; i <= newArray.length - 1; i++) {
      const currentValue = newArray[i];
      if (currentValue === "/" && newArray[i + 1] == "0") {
        alert("It is not possible to divide by zero!");
        deleteCalculation();
        return;
      }
      if (currentValue === "*" || currentValue === "/") {
        const firstNumber = parseFloat(newArray[i - 1]);
        const secondNumber = parseFloat(newArray[i + 1]);
        let result = "";
        switch (currentValue) {
          case "*":
            result = String(firstNumber * secondNumber);
            break;
          case "/":
            result = String(firstNumber / secondNumber);
            break;
        }
        newArray.splice(i - 1, 3, result);
        i = 0;
      }
    }
    for (let i = 0; i <= newArray.length - 1; i++) {
      const currentValue = newArray[i];
      if (currentValue === "+" || currentValue === "-") {
        const firstNumber = parseFloat(newArray[i - 1]);
        const secondNumber = parseFloat(newArray[i + 1]);
        let result = "";
        switch (currentValue) {
          case "+":
            result = String(firstNumber + secondNumber);
            break;
          case "-":
            result = String(firstNumber - secondNumber);
            break;
        }
        newArray.splice(i - 1, 3, result);
        i = 0;
      }
    }
    setChar(newArray);
    setDisplay((prev) => prev + newArray);
  };

  return (
    <>
      <h1 id="headline">Calculator</h1>
      <div className="upper" id="input">
        {display}
      </div>
      <div className="upper" id="display">
        {currentChar}
      </div>
      <div id="buttons">
        <button id="clear" onClick={deleteCalculation}>
          AC
        </button>
        {charButtons}
        <button id="equals" className="numbers" onClick={calculateResult}>
          =
        </button>
      </div>
    </>
  );
}

export default App;
