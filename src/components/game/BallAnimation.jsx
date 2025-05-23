"use client";

import { useEffect, useRef } from "react";
import { useGameContext } from "@/contexts/GameContext";

// This component animates a ball bouncing around a box.
export default function BallAnimation() {
  const { setGameState } = useGameContext();
  const ballSize = 10;
  const boxRef = useRef(null);
  const ballRef = useRef(null);
  const velocity = useRef({ dx: 8, dy: 4 });
  const position = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(0);
  const boxSize = useRef({ width: 0, height: 0 });
  const lastFrameTime = useRef(performance.now());

  // Measure box size
  useEffect(() => {
    const updateBoxSize = () => {
      if (boxRef.current) {
        const { offsetWidth, offsetHeight } = boxRef.current;
        boxSize.current = { width: offsetWidth, height: offsetHeight };
      }
    };

    updateBoxSize();
    window.addEventListener("resize", updateBoxSize);
    return () => window.removeEventListener("resize", updateBoxSize);
  }, []);

  // Set initial position
  useEffect(() => {
    if (boxSize.current.width > 0 && boxSize.current.height > 0) {
      position.current = {
        x: (boxSize.current.width - ballSize) / 2,
        y: (boxSize.current.height - ballSize) / 2,
      };
      updateBallPosition();
    }
  }, []);

  // Randomize initial velocity
  useEffect(() => {
    velocity.current = {
      dx: Math.random() < 0.5 ? 3 : -3,
      dy: Math.random() < 0.5 ? 1.5 : -1.5,
    };
  }, []);

  // Update ball position in DOM
  const updateBallPosition = () => {
    if (ballRef.current) {
      // Use toFixed for subpixel precision
      ballRef.current.style.transform = `translate(${position.current.x.toFixed(
        2
      )}px, ${position.current.y.toFixed(2)}px)`;
    }
  };

  // Move ball with delta-time for frame-rate independence
  const moveBall = (currentTime) => {
    const deltaTime = (currentTime - lastFrameTime.current) / 16.67; // Normalize to ~60fps
    lastFrameTime.current = currentTime;

    // Scale movement by deltaTime
    position.current.x += velocity.current.dx * deltaTime;
    position.current.y += velocity.current.dy * deltaTime;

    // Horizontal bounds check
    if (
      position.current.x <= 0 ||
      position.current.x >= boxSize.current.width - ballSize
    ) {
      velocity.current.dx *= -1;
      position.current.x = Math.max(
        0,
        Math.min(position.current.x, boxSize.current.width - ballSize)
      );
    }

    // Vertical bounds check
    if (
      position.current.y <= 0 ||
      position.current.y >= boxSize.current.height - ballSize
    ) {
      velocity.current.dy *= -1;
      position.current.y = Math.max(
        0,
        Math.min(position.current.y, boxSize.current.height - ballSize)
      );
    }

    updateBallPosition();
    animationFrameId.current = requestAnimationFrame(moveBall);
  };

  // Start animation
  useEffect(() => {
    if (boxSize.current.width > 0 && boxSize.current.height > 0) {
      lastFrameTime.current = performance.now();
      animationFrameId.current = requestAnimationFrame(moveBall);
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  // Function to stop the animation and set game state on click
  const handleClick = () => {
    cancelAnimationFrame(animationFrameId.current);
    setGameState("play");
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div
        ref={boxRef}
        className="w-[70vw] h-[45vh] border-2 border-pink-600 bg-gray-800 relative"
      >
        <div
          ref={ballRef}
          className="rounded-full bg-orange-300 absolute"
          style={{
            width: `${ballSize}px`,
            height: `${ballSize}px`,
            willChange: "transform",
            transform: "translateZ(0)",
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>
      <button
        className="mt-4 px-4 py-2 text-white bg-pink-600 rounded-lg cursor-pointer"
        onClick={() => handleClick()}
      >
        Start!
      </button>
    </div>
  );
}
