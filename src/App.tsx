import { useState } from "react";
import { useRef } from "react";
import "./App.css";
import { formatTime } from "./utils/formatTime";

function App() {
  const [inputTime, setInputTime] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const intervalId = useRef<number | null>(null);

  function handleStart() {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }

    setTimeLeft(Number(inputTime));

    intervalId.current = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
  }

  function handleBreak() {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }

  function handleReset() {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    setTimeLeft(0);
    setInputTime("");
  }

  return (
    <>
      <section>
        <h1>Timer set</h1>
        <div className="timer-container">
          <input
            className="timer-input"
            type="number"
            min="1"
            placeholder="sek"
            value={inputTime}
            onChange={(event) => {
              setInputTime(event.target.value);
            }}
          />
          <h2>Time left</h2>
          <span className="timeInSec">{formatTime(timeLeft)}</span>
        </div>
        <div className="button-container">
          <button onClick={handleStart}>Start</button>
          <button onClick={handleBreak}>Break</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </section>
    </>
  );
}

export default App;
