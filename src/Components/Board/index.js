import { useState } from "react";
import "./style.css";
import Confetti from "react-confetti";

function App() {
  let [boxes, setBoxes] = useState(["", "", "", "", "", "", "", "", ""]);
  let [currentPlayer, setCurrentPlayer] = useState("X");
  let [winner, setWinner] = useState("");
  let [history, setHistory] = useState([]);

  let handleBox = (i) => {
    if (boxes[i] || winner) {
      return;
    }
    let newBoxes = [...boxes];
    newBoxes[i] = currentPlayer;
    let newWinner = calculateWinner(newBoxes);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setBoxes(newBoxes);
    setWinner(newWinner);
    setHistory(history.concat([newBoxes]));
    console.log(newBoxes[i]);
    console.log(newBoxes);
  };

  let calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  let handleReset = () => {
    setCurrentPlayer("X");
    setBoxes(["", "", "", "", "", "", "", "", ""]);
    setWinner("");
    setHistory([]);
  };

  let handleStep = (i) => {
    setBoxes(history[i]);
  };

  return (
    <>
      <div className="app">
        <div className="container ">
         
          <div className="flex">
            <h1>Tic-Tac-Toe</h1>
          </div>
          
          <div className="flex">
             <div className="board">
              {boxes.map((box, i) => (
                <div key={i} onClick={() => handleBox(i)} className="box">
                  {box}
                </div>
              ))}
              <button onClick={handleReset}>Reset </button>
            </div>

            <div className="board-details">
              <h2
                className={winner === null || winner === "" ? "show" : "hide"}
              >
                Next Player: {currentPlayer}
              </h2>
              <h3
                className={winner === null || winner === "" ? "hide" : "show"}
              >
                Winner is : {winner}
              </h3>
              {history.map((elm, i) => (
                <button onClick={() => handleStep(i)} className="sec-btn">
                  Go to step {i + 1}
                </button>
              ))}
            </div>
          </div>
          {winner ? <Confetti /> : null}
        </div>
      </div>
    </>
  );
}
export default App;
