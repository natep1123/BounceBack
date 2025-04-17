"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ClientGame() {
  const [count, setCount] = useState(3); // Countdown timer
  const [score, setScore] = useState(0); // Score tracking
  const ballSize = 12; // Ball dimensions: 12px
  const fieldRef = useRef(null); // Reference to game field
  const ballRef = useRef(null); // Reference to ball element
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 }); // Game field dimensions
  const position = useRef({ x: 0, y: 0 }); // Ball position
  const velocity = useRef({ dx: 3, dy: 1.75 }); // Ball velocity
  const lastUpdateTime = useRef(0); // Last update time for delta time
  const animationFrameId = useRef(0); // Animation frame ID
  const shiftCount = useRef(0); // Counter for velocity shifts

  // Countdown effect
  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
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
  }, [count]);

  // Set initial ball position and velocity
  useEffect(() => {
    if (fieldSize.width > 0 && fieldSize.height > 0) {
      position.current = {
        x: (fieldSize.width - ballSize) / 2,
        y: (fieldSize.height - ballSize) / 2,
      };
      velocity.current = {
        dx: Math.random() < 0.5 ? 3 : -3,
        dy: Math.random() < 0.5 ? 1.75 : -1.75,
      };
      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      }
    }
  }, [fieldSize, count]);

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
        setScore((prev) => prev + 1); // Increment score once
        scoreIncremented = true;

        // Dynamic velocity changes from old code
        let velocityShift = Math.random() < 0.5 ? 1.05 : 1.1; // Randomize velocity increase
        if (score <= 25) {
          velocity.current.dx *= velocityShift; // Increase velocity x
          velocity.current.dy *= velocityShift; // Increase velocity y
          shiftCount.current++;
          console.log(
            `SHIFT COUNT: ${shiftCount.current}
            V-Shift: ${velocityShift}
            V: (${velocity.current.dx}, ${velocity.current.dy})`
          );
        } else if (score > 25 && score % 5 === 0) {
          // Velocity change-up every 5 points after 25
          let random = Math.random();
          let coinFlip = Math.random() < 0.5 ? "x" : "y";
          if (random < 0.5) {
            velocityShift = 1.1;
            if (coinFlip === "x") velocity.current.dx *= velocityShift;
            if (coinFlip === "y") velocity.current.dy *= velocityShift;
          } else if (random >= 0.5) {
            velocityShift = 0.9;
            if (coinFlip === "x") velocity.current.dx *= velocityShift;
            if (coinFlip === "y") velocity.current.dy *= velocityShift;
          }

          // Keep velocity within bounds
          let randomVx = Math.random() * (17 - 15 + 1) + 15; // Value between 15 and 17
          let randomVy = Math.random() * (15 - 13 + 1) + 13; // Value between 13 and 15

          // Dx checks for greater than -14 and less than 14
          if (velocity.current.dx < 0 && velocity.current.dx > -14) {
            velocity.current.dx = randomVx * -1;
          } else if (velocity.current.dx > 0 && velocity.current.dx < 14) {
            velocity.current.dx = randomVx;
          }
          // Dy checks for greater than -10 and less than 10
          if (velocity.current.dy < 0 && velocity.current.dy > -10) {
            velocity.current.dy = randomVy * -1;
          } else if (velocity.current.dy > 0 && velocity.current.dy < 10) {
            velocity.current.dy = randomVy;
          }
          // Dx checks for greater than 20 and less than -20
          if (velocity.current.dx > 20) {
            velocity.current.dx = randomVx;
          } else if (velocity.current.dx < -20) {
            velocity.current.dx = randomVx * -1;
          }
          // Dy checks for greater than 16 and less than -16
          if (velocity.current.dy > 16) {
            velocity.current.dy = randomVy;
          } else if (velocity.current.dy < -16) {
            velocity.current.dy = randomVy * -1;
          }

          shiftCount.current++;
          console.log(
            `SHIFT COUNT: ${shiftCount.current}
            V${coinFlip}-Shift: ${velocityShift}
            V: (${velocity.current.dx}, ${velocity.current.dy})`
          );
        }
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

  return (
    <>
      <h2>Score: {score}</h2>
      <div className="flex flex-col items-center mt-4">
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
      <Link href="/game/over">
        <button className="mt-4 px-4 py-2 text-white bg-pink-600 border-2 border-gray-800 rounded-lg cursor-pointer">
          End Game
        </button>
      </Link>
    </>
  );
}
