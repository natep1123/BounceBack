"use client";

import { saveScore } from "@/lib/dbLogic";
import { useEffect, useRef, useState } from "react";

// This component handles the client-side game logic for a single-player pong-like game optimized for mobile devices with inverse paddle control.
export default function MobileClientGame({ setGameState, score, setScore }) {
  const [count, setCount] = useState(3);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const ballSize = 8;
  const paddleWidth = 6;
  const paddleHeight = 60;
  const fieldRef = useRef(null);
  const ballRef = useRef(null);
  const leftPaddleRef = useRef(null);
  const rightPaddleRef = useRef(null);
  const [fieldSize, setFieldSize] = useState({ width: 0, height: 0 });
  const position = useRef({ x: 0, y: 0 });
  const velocity = useRef({ dx: 2, dy: 1 });
  const leftPaddleY = useRef(0);
  const rightPaddleY = useRef(0);
  const lastUpdateTime = useRef(0);
  const animationFrameId = useRef(0);
  const touchId = useRef(null);

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
        const borderWidth =
          parseInt(getComputedStyle(fieldRef.current).borderBottomWidth, 10) ||
          2;
        const innerHeight = offsetHeight - 2 * borderWidth;
        setFieldSize({ width: offsetWidth, height: innerHeight });
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
      dx: Math.random() < 0.5 ? 2 : -2,
      dy: Math.random() < 0.5 ? 1 : -1,
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

  // Handle touch input for mobile with inverse paddle control
  useEffect(() => {
    const handleTouchStart = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchId.current = touch.identifier;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = Array.from(e.touches).find(
        (t) => t.identifier === touchId.current
      );
      if (!touch) return;
      const touchX = touch.clientX;
      const fieldRect = fieldRef.current.getBoundingClientRect();
      const touchY = touch.clientY - fieldRect.top;
      const offset = 1;
      let deltaY = 0;

      if (touchX < window.innerWidth / 2) {
        // Left paddle control
        const newLeftY = Math.max(
          0,
          Math.min(
            touchY - paddleHeight / 2,
            fieldSize.height - paddleHeight - offset
          )
        );
        deltaY = newLeftY - leftPaddleY.current;
        leftPaddleY.current = newLeftY;
        rightPaddleY.current = Math.max(
          0,
          Math.min(
            fieldSize.height - paddleHeight - offset,
            rightPaddleY.current - deltaY
          )
        );
      } else {
        // Right paddle control
        const newRightY = Math.max(
          0,
          Math.min(
            touchY - paddleHeight / 2,
            fieldSize.height - paddleHeight - offset
          )
        );
        deltaY = newRightY - rightPaddleY.current;
        rightPaddleY.current = newRightY;
        leftPaddleY.current = Math.max(
          0,
          Math.min(
            fieldSize.height - paddleHeight - offset,
            leftPaddleY.current - deltaY
          )
        );
      }
      updatePaddlePositions();
    };

    const handleTouchEnd = (e) => {
      const touch = Array.from(e.changedTouches).find(
        (t) => t.identifier === touchId.current
      );
      if (touch) {
        touchId.current = null;
      }
    };

    if (isGameStarted) {
      window.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isGameStarted, fieldSize]);

  // Move ball and handle collisions
  const moveBall = async (timestamp) => {
    if (!lastUpdateTime.current) lastUpdateTime.current = timestamp;
    const deltaTime = (timestamp - lastUpdateTime.current) / 1000;

    position.current.x += velocity.current.dx * deltaTime * 60;
    position.current.y += velocity.current.dy * deltaTime * 60;

    const ballRect = {
      left: position.current.x,
      right: position.current.x + ballSize,
      top: position.current.y,
      bottom: position.current.y + ballSize,
    };

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
      velocity.current.dx < 0
    ) {
      velocity.current.dx *= -1;
      position.current.x = leftPaddleRect.right + 0.1;
      setScore((prev) => prev + 1);
      const newScore = score + 1;
      if (newScore < 25) {
        velocity.current.dx *= 1.05;
        velocity.current.dy *= 1.05;
      }
      velocity.current.dx = Math.max(-7, Math.min(7, velocity.current.dx));
      velocity.current.dy = Math.max(-3.5, Math.min(3.5, velocity.current.dy));
    }

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
      velocity.current.dx > 0
    ) {
      velocity.current.dx *= -1;
      position.current.x = rightPaddleRect.left - ballSize - 0.1;
      setScore((prev) => prev + 1);
      const newScore = score + 1;
      if (newScore < 10) {
        velocity.current.dx *= 1.04;
        velocity.current.dy *= 1.04;
      } else if (newScore <= 30 && newScore % 2 === 0) {
        velocity.current.dx *= 1.04;
        velocity.current.dy *= 1.04;
      } else if (newScore > 30 && newScore <= 50 && newScore % 5 === 0) {
        velocity.current.dx *= 1.1;
        velocity.current.dy *= 1.1;
      }
      velocity.current.dx = Math.max(-7, Math.min(7, velocity.current.dx));
      velocity.current.dy = Math.max(-3.5, Math.min(3.5, velocity.current.dy));
    }

    if (
      position.current.x <= 0 &&
      (ballRect.bottom < leftPaddleRect.top ||
        ballRect.top > leftPaddleRect.bottom)
    ) {
      await handleGameOver(score);
      return;
    }
    if (
      position.current.x >= fieldSize.width - ballSize &&
      (ballRect.bottom < rightPaddleRect.top ||
        ballRect.top > rightPaddleRect.bottom)
    ) {
      await handleGameOver(score);
      return;
    }

    if (
      position.current.y <= 0 ||
      position.current.y >= fieldSize.height - ballSize
    ) {
      velocity.current.dy *= -1;
      position.current.y = Math.max(
        0,
        Math.min(position.current.y, fieldSize.height - ballSize)
      );
    }

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
      <h2 className="text-lg">Score: {score}</h2>
      <div className="flex flex-col items-center mt-2">
        {count > 0 ? (
          <div className="flex items-center justify-center h-[80vw] w-[90vw] bg-gray-800 border-2 border-pink-600">
            <span className="text-4xl font-bold text-white">{count}</span>
          </div>
        ) : (
          <div
            ref={fieldRef}
            className="w-[90vw] h-[80vw] border-2 border-pink-600 bg-gray-800 relative"
            style={{ maxWidth: "400px", maxHeight: "400px" }}
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
                transform: "translateZ(0)",
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
                transform: "translateZ(0)",
              }}
            />
            <div
              ref={ballRef}
              className="rounded-full bg-orange-300 absolute"
              style={{
                width: `${ballSize}px`,
                height: `${ballSize}px`,
                willChange: "transform",
                transform: "translateZ(0)",
                boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
