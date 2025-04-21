"use client";

import { saveScore } from "@/lib/dbLogic";
import { useEffect, useRef, useState } from "react";

export default function ClientGame({ setGameState, score, setScore }) {
  const [count, setCount] = useState(3);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const ballSize = 12;
  const paddleWidth = 10;
  const paddleHeight = 80;
  const fieldRef = useRef(null);
  const ballRef = useRef(null);
  const leftPaddleRef = useRef(null);
  const rightPaddleRef = useRef(null);
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 });
  const position = useRef({ x: 0, y: 0 });
  const velocity = useRef({ dx: 3, dy: 1.5 });
  const leftPaddleY = useRef(0);
  const rightPaddleY = useRef(0);
  const lastUpdateTime = useRef(0);
  const animationFrameId = useRef(0);
  const isDragging = useRef({ left: false, right: false });

  // Countdown effect
  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsGameStarted(true);
    }
  }, [count]);

  // Measure game field size and initialize paddle positions
  useEffect(() => {
    const updateFieldSize = () => {
      if (fieldRef.current) {
        const { offsetWidth, offsetHeight } = fieldRef.current;
        // Dynamically get border width
        const borderWidth =
          parseInt(getComputedStyle(fieldRef.current).borderBottomWidth, 10) ||
          2;
        // Subtract top and bottom borders for inner content height
        const innerHeight = offsetHeight - 2 * borderWidth;
        console.log({
          offsetHeight,
          borderWidth,
          innerHeight,
        }); // Debug dimensions
        setFieldSize({ width: offsetWidth, height: innerHeight });
        // Initialize paddle positions (centered vertically within inner height)
        leftPaddleY.current = (innerHeight - paddleHeight) / 2;
        rightPaddleY.current = (innerHeight - paddleHeight) / 2;
        updatePaddlePositions();
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
  }, [fieldSize, isGameStarted]);

  // Set initial velocity
  useEffect(() => {
    velocity.current = {
      dx: Math.random() < 0.5 ? 3 : -3,
      dy: Math.random() < 0.5 ? 1.5 : -1.5,
    };
  }, [isGameStarted]);

  // Update paddle positions in DOM
  const updatePaddlePositions = () => {
    if (leftPaddleRef.current) {
      leftPaddleRef.current.style.transform = `translateY(${leftPaddleY.current}px)`;
    }
    if (rightPaddleRef.current) {
      rightPaddleRef.current.style.transform = `translateY(${rightPaddleY.current}px)`;
    }
  };

  // Handle paddle dragging
  useEffect(() => {
    const handleMouseDown = (e) => {
      const mouseX = e.clientX;
      // Click on left half of window grabs left paddle, right half grabs right paddle
      if (mouseX < window.innerWidth / 2) {
        isDragging.current.left = true;
      } else {
        isDragging.current.right = true;
      }
    };

    const handleMouseUp = () => {
      isDragging.current.left = false;
      isDragging.current.right = false;
    };

    const handleMouseMove = (e) => {
      if (isDragging.current.left || isDragging.current.right) {
        const fieldRect = fieldRef.current.getBoundingClientRect();
        const mouseY = e.clientY - fieldRect.top;
        let deltaY = 0;
        const offset = 1; // Empirical 1px offset to prevent bottom overlap

        if (isDragging.current.left) {
          // Move left paddle
          const newLeftY = Math.max(
            0,
            Math.min(
              mouseY - paddleHeight / 2,
              fieldSize.height - paddleHeight - offset
            )
          );
          deltaY = newLeftY - leftPaddleY.current;
          leftPaddleY.current = newLeftY;
          // Move right paddle in opposite direction
          rightPaddleY.current = Math.max(
            0,
            Math.min(
              fieldSize.height - paddleHeight - offset,
              rightPaddleY.current - deltaY
            )
          );
        } else if (isDragging.current.right) {
          // Move right paddle
          const newRightY = Math.max(
            0,
            Math.min(
              mouseY - paddleHeight / 2,
              fieldSize.height - paddleHeight - offset
            )
          );
          deltaY = newRightY - rightPaddleY.current;
          rightPaddleY.current = newRightY;
          // Move left paddle in opposite direction
          leftPaddleY.current = Math.max(
            0,
            Math.min(
              fieldSize.height - paddleHeight - offset,
              leftPaddleY.current - deltaY
            )
          );
        }

        updatePaddlePositions();
      }
    };

    if (isGameStarted) {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isGameStarted, fieldSize]);

  // Move ball and handle collisions
  const moveBall = async (timestamp) => {
    if (!lastUpdateTime.current) lastUpdateTime.current = timestamp;
    const deltaTime = (timestamp - lastUpdateTime.current) / 1000;

    // Update position
    position.current.x += velocity.current.dx * deltaTime * 60;
    position.current.y += velocity.current.dy * deltaTime * 60;

    // Define ball rectangle for collision detection
    const ballRect = {
      left: position.current.x,
      right: position.current.x + ballSize,
      top: position.current.y,
      bottom: position.current.y + ballSize,
    };

    // Left paddle collision
    const leftPaddleRect = {
      left: 0,
      right: paddleWidth,
      top: leftPaddleY.current,
      bottom: leftPaddleY.current + paddleHeight,
    };
    if (
      ballRect.left <= leftPaddleRect.right &&
      ballRect.right >= leftPaddleRect.left &&
      ballRect.bottom >= leftPaddleRect.top &&
      ballRect.top <= leftPaddleRect.bottom &&
      velocity.current.dx < 0 // Ball moving left
    ) {
      velocity.current.dx *= -1;
      position.current.x = leftPaddleRect.right + 0.1; // Prevent sticking
      setScore((prev) => prev + 1);
      // Velocity adjustments
      const newScore = score + 1;
      if (newScore < 25) {
        velocity.current.dx *= 1.05;
        velocity.current.dy *= 1.05;
      }
      velocity.current.dx = Math.max(-10, Math.min(10, velocity.current.dx));
      velocity.current.dy = Math.max(-5, Math.min(5, velocity.current.dy));
    }

    // Right paddle collision
    const rightPaddleRect = {
      left: fieldSize.width - paddleWidth,
      right: fieldSize.width,
      top: rightPaddleY.current,
      bottom: rightPaddleY.current + paddleHeight,
    };
    if (
      ballRect.right >= rightPaddleRect.left &&
      ballRect.left <= rightPaddleRect.right &&
      ballRect.bottom >= rightPaddleRect.top &&
      ballRect.top <= rightPaddleRect.bottom &&
      velocity.current.dx > 0 // Ball moving right
    ) {
      velocity.current.dx *= -1;
      position.current.x = rightPaddleRect.left - ballSize - 0.1; // Prevent sticking
      setScore((prev) => prev + 1);
      // Velocity adjustments
      const newScore = score + 1;
      if (newScore < 25) {
        velocity.current.dx *= 1.05;
        velocity.current.dy *= 1.05;
      }
      velocity.current.dx = Math.max(-10, Math.min(10, velocity.current.dx));
      velocity.current.dy = Math.max(-5, Math.min(5, velocity.current.dy));
    }

    // Horizontal bounds check (left/right walls)
    if (
      position.current.x <= 0 &&
      (ballRect.bottom < leftPaddleRect.top ||
        ballRect.top > leftPaddleRect.bottom)
    ) {
      // Ball missed left paddle and hit left wall
      await handleGameOver(score);
      return;
    }
    if (
      position.current.x >= fieldSize.width - ballSize &&
      (ballRect.bottom < rightPaddleRect.top ||
        ballRect.top > rightPaddleRect.bottom)
    ) {
      // Ball missed right paddle and hit right wall
      await handleGameOver(score);
      return;
    }

    // Vertical bounds check (top/bottom walls)
    if (
      position.current.y <= 0 ||
      position.current.y >= fieldSize.height - ballSize
    ) {
      velocity.current.dy *= -1; // Reverse vertical direction
      position.current.y = Math.max(
        0,
        Math.min(position.current.y, fieldSize.height - ballSize)
      ); // Clamp position
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
    if (isGameStarted && fieldSize.width > 0 && fieldSize.height > 0) {
      lastUpdateTime.current = 0;
      animationFrameId.current = requestAnimationFrame(moveBall);
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isGameStarted, fieldSize, score]);

  // Handle game over
  async function handleGameOver(finalScore) {
    cancelAnimationFrame(animationFrameId.current);
    await saveScore(finalScore);
    setTimeout(() => {
      setGameState("over");
    }, 1000);
  }

  return (
    <>
      <h2>Score: {score}</h2>
      <div className="flex flex-col items-center mt-2">
        {count > 0 ? (
          <div className="flex items-center justify-center h-[300px] w-[65vw] bg-gray-800 border-2 border-pink-600">
            <span className="text-6xl font-bold text-white">{count}</span>
          </div>
        ) : (
          <div
            ref={fieldRef}
            className="w-[65vw] h-[300px] border-2 border-pink-600 bg-gray-800 relative"
          >
            <div
              ref={leftPaddleRef}
              className="absolute bg-blue-500"
              style={{
                width: `${paddleWidth}px`,
                height: `${paddleHeight}px`,
                left: 0,
                top: 0,
                willChange: "transform",
                transform: "translateZ(0)", // Force hardware acceleration
              }}
            />
            <div
              ref={rightPaddleRef}
              className="absolute bg-blue-500"
              style={{
                width: `${paddleWidth}px`,
                height: `${paddleHeight}px`,
                right: 0,
                top: 0,
                willChange: "transform",
                transform: "translateZ(0)", // Force hardware acceleration
              }}
            />
            <div
              ref={ballRef}
              className="rounded-full bg-orange-300 absolute"
              style={{
                width: `${ballSize}px`,
                height: `${ballSize}px`,
                willChange: "transform",
                transform: "translateZ(0)", // Force hardware acceleration
                boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
