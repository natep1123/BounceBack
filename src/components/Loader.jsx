import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-16 bg-gray-900">
      <div className="relative w-32 h-8">
        <div className="absolute w-4 h-4 bg-white rounded-full animate-bounce-ball"></div>
      </div>
      <style jsx>{`
        @keyframes bounce-ball {
          0% {
            left: 0;
          }
          50% {
            left: calc(100% - 1rem);
          }
          100% {
            left: 0;
          }
        }
        .animate-bounce-ball {
          animation: bounce-ball 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
