import { useState, useRef, useEffect, useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import { Chess } from "chess.js";

export function resetTimer() {
  localStorage.removeItem("countdown");
}

export function useMatchTimer(initialTime: number = 60) {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newPrev = prev - 1;
          localStorage.setItem("countdown", newPrev.toString());
          return newPrev;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      stop();
    }
  }, [timeLeft]);

  const start = () => {
    console.log("START");
    const prevTime = localStorage.getItem("countdown");

    if (prevTime) {
      setTimeLeft(parseInt(prevTime));
    }

    localStorage.removeItem("countdown");

    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const stop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // const reset = () => {
  //   stop();
  //   setTimeLeft(initialTime);
  // };

  const [chessPosition] = useContext(BoardContext);

  const timerStarted = useRef(false);

  const [color, setColor] = useState<"white" | "black">("white");

  useEffect(() => {
    if (
      chessPosition != "8/8/4K3/8/4k3/8/8/8 b - - 0 1" &&
      !timerStarted.current
    ) {
      timerStarted.current = true;
      start();
      return;
    }

    if (timerStarted.current) {
      const chess = new Chess(chessPosition, { skipValidation: true });
      const turn = chess.turn();
      setColor(turn == "w" ? "white" : "black");
      setTimeLeft(60);
    }
  }, [chessPosition]);

  return {
    timeLeft,
    timeColor: color,
  };
}
