import { useState, useRef } from "react";

export function useTimer() {
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
    }, 100);
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

  return {
    inputTime,
    setInputTime,
    timeLeft,
    setTimeLeft,
    handleStart,
    handleBreak,
    handleReset,
  };
}
