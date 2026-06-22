import "./App.css";
import { formatTime } from "./utils/formatTime";
import { useTimer } from "./components/hooks/useTimer";

function App() {
  const {
    inputTime,
    setInputTime,
    timeLeft,
    handleStart,
    handleBreak,
    handleReset,
  } = useTimer();

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
