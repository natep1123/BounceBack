"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ClientGame() {
  const [count, setCount] = useState(3);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const ballSize = 12;
  const fieldRef = useRef(null);
  const ballRef = useRef(null);
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 });
  const position = useRef({ x: 0, y: 0 });
  const velocity = useRef({ dx: 3, dy: 1.5 });
  const lastUpdateTime = useRef(0);
  const animationFrameId = useRef(0);
  const router = useRouter();

  // Countdown effect
  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsGameStarted(true); // Set gameStart to true when countdown reaches 0
    }
  }, [count]);

  // Measure game field size
  useEffect(() => {
    const updateFieldSize = () => {
      if (fieldRef.current) {
        const { offsetWidth, offsetHeight } = fieldRef.current;
        setFieldSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateFieldSize();
    window.addEventListener("resize", updateFieldSize);
    return () => window.removeEventListener("resize", updateFieldSize);
  }, [isGameStarted]);

  // Set initial ball position
  useEffect(() => {
    if (fieldSize.width > 0 && fieldSize.height > 0) {
      position.current = {
        x: (fieldSize.width - ballSize) / 2,
        y: (fieldSize.height - ballSize) / 2,
      };
      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      }
    }
  }, [fieldSize, count]);

  // Set initial velocity
  useEffect(() => {
    velocity.current = {
      dx: Math.random() < 0.5 ? 3 : -3,
      dy: Math.random() < 0.5 ? 1.5 : -1.5,
    };
  }, [count]);

  // Move ball function
  const moveBall = (timestamp) => {
    if (!lastUpdateTime.current) lastUpdateTime.current = timestamp;
    const deltaTime = (timestamp - lastUpdateTime.current) / 1000; // Convert to seconds

    // Update position with delta-time-based movement
    position.current.x += velocity.current.dx * deltaTime * 60; // Normalize to 60fps
    position.current.y += velocity.current.dy * deltaTime * 60;
    let scoreIncremented = false;

    // Horizontal bounds check (left/right walls)
    if (
      position.current.x <= 0 ||
      position.current.x >= fieldSize.width - ballSize
    ) {
      velocity.current.dx *= -1; // Reverse direction
      position.current.x = Math.max(
        0,
        Math.min(position.current.x, fieldSize.width - ballSize)
      ); // Clamp position
      if (!scoreIncremented) {
        setScore((prev) => prev + 1);
        scoreIncremented = true;
        // Velocity adjustments using incremented score
        const newScore = score + 1;
        if (newScore < 25) {
          velocity.current.dx *= 1.05;
          velocity.current.dy *= 1.05;
        }
        // Cap velocity at ±10 for dx, ±5 for dy
        velocity.current.dx = Math.max(-10, Math.min(10, velocity.current.dx));
        velocity.current.dy = Math.max(-5, Math.min(5, velocity.current.dy));
      }
    }

    // Vertical bounds check (top/bottom walls)
    if (
      position.current.y <= 0 ||
      position.current.y >= fieldSize.height - ballSize
    ) {
      velocity.current.dy *= -1; // Reverse direction
      position.current.y = Math.max(
        0,
        Math.min(position.current.y, fieldSize.height - ballSize)
      );
    }
    // Update ball position in DOM
    if (ballRef.current) {
      ballRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    }
    // Request next animation frame
    lastUpdateTime.current = timestamp;
    animationFrameId.current = requestAnimationFrame(moveBall);
  };

  // Handle ball movement
  useEffect(() => {
    if (count === 0 && fieldSize.width > 0 && fieldSize.height > 0) {
      lastUpdateTime.current = 0;
      animationFrameId.current = requestAnimationFrame(moveBall);
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [count, fieldSize]);

  // Handle game over
  const handleGameOver = () => {
    cancelAnimationFrame(animationFrameId.current);
    localStorage.setItem("gameScore", score.toString());
    router.push("/game/over");
  };

  return (
    <>
      <h2>Score: {score}</h2>
      <div className="flex flex-col items-center mt-2">
        {count > 0 ? (
          <div className="flex items-center justify-center h-[300px] w-[65vw] bg-gray-800 border-2 border-pink-600 rounded-lg">
            <span className="text-6xl font-bold text-white">{count}</span>
          </div>
        ) : (
          <div
            ref={fieldRef}
            className="w-[65vw] h-[300px] border-2 border-pink-600 bg-gray-800 relative"
          >
            <div
              ref={ballRef}
              className="rounded-full bg-orange-300 absolute"
              style={{
                width: `${ballSize}px`,
                height: `${ballSize}px`,
                willChange: "transform",
                boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        )}
      </div>
      <button
        className="mt-4 px-4 py-2 text-white bg-pink-600 border-2 border-gray-800 rounded-lg cursor-pointer"
        onClick={handleGameOver}
      >
        End Game
      </button>
    </>
  );
}
