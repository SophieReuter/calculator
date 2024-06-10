import { useState } from "react";
import "./App.css";

function App() {
  const [display, changeDisplay] = useState("");
  const [currentChar, changeChar] = useState("0");

  const chars = [
    { id: "slash", char: "/" },
    { id: "multiply", char: "*" },
    { id: "seven", char: "7" },
    { id: "eight", char: "8" },
    { id: "nine", char: "9" },
    { id: "minus", char: "-" },
    { id: "four", char: "4" },
    { id: "five", char: "5" },
    { id: "six", char: "6" },
    { id: "plus", char: "+" },
    { id: "one", char: "1" },
    { id: "two", char: "2" },
    { id: "three", char: "3" },
    { id: "point", char: "." },
    { id: "zero", char: "0" },
    { id: "equals", char: "=" },
  ];

  const charButtons = [];

  for (let value of chars) {
    const identifier = `${value.id}Button`;
    charButtons.push(
      <>
        <button
          key={identifier}
          id={identifier}
          className="numbers"
          onClick={() => {
            changeDisplay((prev) => prev + value.char),
              changeChar((prev) => value.char);
          }}
        >
          {value.char}
        </button>
      </>
    );
  }

  return (
    <>
      <input type="text" id="input" value={display} />
      <br></br>
      <input type="text" id="input" value={currentChar} />
      <br></br>
      <div id="buttons">
        <button
          id="deleteButton"
          onClick={() => {
            changeDisplay((prev) => "");
            changeChar((prev) => "0");
          }}
        >
          AC
        </button>
        {charButtons}
      </div>
    </>
  );
}

export default App;
