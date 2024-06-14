import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");
  const [currentChar, setChar] = useState("");
  const [calculation, pushToArray] = useState([]);

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

  const isSpecialCharacter = (value) => {
    return specialCharacters.includes(value);
  };

  const deleteCalculation = () => {
    setDisplay("");
    setChar("");
    pushToArray([]);
  };

  const calculateResult = () => {
    if (isSpecialCharacter(calculation[calculation.length - 1])) {
      alert("Every calculation needs to end with a numeric value!");
      deleteCalculation();
      return;
    }
    for (let i = 0; i <= calculation.length - 1; i++) {
      const currentValue = calculation[i];
      if (currentValue === "*" || currentValue === "/") {
        let firstNumber = 0;
        let secondNumber = 0;
        const firstIndex = 0;
        const lastIndex = 0;
        let result = 0;
        for (let x = i - 1; x >= 0; x--) {
          if (isOperator(x)) {
            firstIndex = x + 1;
            break;
          } else {
            firstNumber = calculation[x] + firstNumber;
          }
        }
        firstNumber = parseFloat(firstNumber);
        for (let x = i + 1; x <= calculation.length - 1; x++) {
          if (isOperator(x)) {
            lastIndex = x - 1;
            break;
          } else {
            secondNumber = secondNumber + calculation[x];
          }
        }
        secondNumber = parseFloat(secondNumber);
        switch (currentValue) {
          case "*":
            result = firstNumber * secondNumber;
            break;
          case "/":
            result = firstNumber / secondNumber;
            break;
        }
        pushToArray((prev) => {
          [...prev, result];
        });
        calculation = calculation.splice(firstIndex, lastIndex - 1);
        console.log(calculation);
      }
    }
  };

  const addInput = (input) => {
    debugger;
    const lastChar = calculation[calculation.length - 1];
    if (currentChar === "/" && input == "0") {
      alert("It is not possible to divide by zero!");
      deleteCalculation();
      return;
    } else if (
      (lastChar === "0" && !specialCharacters.includes(input)) || //Fehler weil 300 oder 303 nicht möglich
      (isSpecialCharacter(input) && isSpecialCharacter(lastChar))
    )
      return;
    else {
      if (
        !isOperator(lastChar) &&
        !isOperator(input) &&
        lastChar !== undefined
      ) {
        const newNumber = String(parseFloat(lastChar + input));
        const updatedArray = calculation.map((value, index) => {
          if (index === calculation.length - 1) {
            return newNumber;
          }
        });
        setDisplay((prev) => prev + input);
        pushToArray((prev) => updatedArray);
        setChar((prev) => newNumber);
      } else {
        setDisplay((prev) => prev + input);
        pushToArray((prev) => [...prev, input]);
        setChar((prev) => input);
      }
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

  return (
    <>
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
