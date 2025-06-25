import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const imageBase64 = location.state?.imageBase64;

  const [showRhombuses, setShowRhombuses] = useState(false);

  useEffect(() => {
    if (imageBase64) {
      localStorage.setItem("imageBase64", imageBase64);
    }

    setShowRhombuses(true);

    const timer = setTimeout(() => {
      navigate("/analysis-overview", {
        state: { imageBase64 },
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, imageBase64]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Animated Dotted Rhombuses */}
      {showRhombuses && (
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Largest */}
          <div
            style={{
              ...rhombusStyle(560, 0.1),
              animation: "spin1 20s linear infinite",
              zIndex: 1,
            }}
          />
          {/* Medium */}
          <div
            style={{
              ...rhombusStyle(440, 0.2),
              animation: "spin2 14s linear infinite",
              zIndex: 2,
            }}
          />
          {/* Smallest (but now still roomy) */}
          <div
            style={{
              ...rhombusStyle(320, 0.4),
              animation: "spin3 8s linear infinite",
              zIndex: 3,
            }}
          />
        </div>
      )}

      {/* Centered Text */}
      <p
        className="absolute text-black text-center z-20"
        style={{
          fontFamily: "Roobert TRIAL",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-2%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        PREPARING YOUR ANALYSIS ...
      </p>

      {/* Keyframes */}
      <style>{`
        @keyframes spin1 {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin2 {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin3 {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function rhombusStyle(size, opacity) {
  return {
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(45deg)",
    border: `2px dotted rgba(0, 0, 0, ${opacity})`,
  };
}




