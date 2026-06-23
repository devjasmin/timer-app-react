import { useState, useRef } from "react";

export function useTimer() {
  //Hier wird der Bauplan eingetippt
  const [inputTime, setInputTime] = useState("");
  //Die verbleibende Zeit
  const [timeLeft, setTimeLeft] = useState(0);
  // die bereits geleistete Arbeitszeit
  const [elapsedTime, setElapsedTime] = useState(0);

  // ab hier: Hintergrund-Gedächtnis --
  //Der Arbeiter ID des Intervalls, das alle 50ms zum Schreibtisch rennt
  const intervalId = useRef<number | null>(null);
  // Die Armbanduhr: der exakte Zeitpunkt, Arbeitsbeginn
  const startTime = useRef<number | null>(null);
  // Der Spickzettel: Speichert die geschaffenen Minuten vor einer Kaffeepause
  const accumulatedTime = useRef<number>(0);

  // Startsignal: Arbeit beginnt oder geht nach einer Pause weiter
  function handleStart() {
    console.log("START");
    // console.log("accumulatedTime", accumulatedTime.current);
    // console.log("inputTime", inputTime);
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }

    startTime.current = performance.now() - accumulatedTime.current;

    // Arbeiter fragt alle 50ms nach dem Stand
    intervalId.current = setInterval(() => {
      // console.log("INTERVAL");
      if (startTime.current === null) return;

      const totalElapsedMs = performance.now() - startTime.current;

      setElapsedTime(totalElapsedMs);

      const totalDurationSeconds = Number(inputTime);
      const totalDurationMs = totalDurationSeconds * 1000;

      const remainingMs = Math.max(totalDurationMs - totalElapsedMs, 0);

      // console.log({
      //   elapsed: totalElapsedMs,
      //   remaining: remainingMs,
      //   timeLeft: remainingMs / 1000,
      //});

      setTimeLeft(remainingMs / 1000);

      if (remainingMs <= 0) {
        if (intervalId.current !== null) {
          clearInterval(intervalId.current);
          intervalId.current = null;
        }
      }
    }, 50);
  }

  // Kaffeepause: Arbeit wird gestoppt - aktuelle Fortschritt wird notiert
  function handleBreak() {
    console.log("BREAK");
    // console.log("accumulatedTime", accumulatedTime.current);
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    // Fortschritt auf dem Spickzettel einfrieren
    if (startTime.current !== null) {
      accumulatedTime.current = performance.now() - startTime.current;
      //   console.log(accumulatedTime.current);
      //   console.log("new startTime", startTime.current);
    }
  }

  // Aufräumen: alle Werte zurücksetzen
  function handleReset() {
    console.log("Alles wieder auf 0");
    if (intervalId.current !== null) {
      clearInterval(intervalId.current as number);
      intervalId.current = null;
    }

    startTime.current = null; // Armbanduhr löschen
    accumulatedTime.current = 0; // Spickzettel wegwerfen
    setTimeLeft(0); // Ziegelstapel weg
    setElapsedTime(0); // Sandhaufen weg
    setInputTime(""); // Tafel sauberwischen
  }

  return {
    inputTime,
    setInputTime,
    timeLeft,
    setTimeLeft,
    elapsedTime,
    setElapsedTime,
    accumulatedTime,
    handleStart,
    handleBreak,
    handleReset,
  };
}
