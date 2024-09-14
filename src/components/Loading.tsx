"use client";

export default function LoadingAnimate() {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <svg viewBox="25 25 50 50" className="loading-spinner">
          <circle
            r="20"
            cy="50"
            cx="50"
            className="loading-circle"
          ></circle>
        </svg>
        <style jsx>{`
          .loading-spinner {
            width: 4rem; /* 16 * 1rem = 4rem */
            height: 4rem; /* 16 * 1rem = 4rem */
            transform-origin: center;
            animation: rotate4 2s linear infinite;
          }
  
          .loading-circle {
            fill: none;
            stroke: hsl(214, 97%, 59%);
            stroke-width: 2;
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            stroke-linecap: round;
            animation: dash4 1.5s ease-in-out infinite;
          }
  
          @keyframes rotate4 {
            100% {
              transform: rotate(360deg);
            }
          }
  
          @keyframes dash4 {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }
  
            50% {
              stroke-dasharray: 90, 200;
              stroke-dashoffset: -35px;
            }
  
            100% {
              stroke-dashoffset: -125px;
            }
          }
        `}</style>
      </div>
    );
  }
  