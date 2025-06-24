import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const imageBase64 = location.state?.imageBase64;

  useEffect(() => {
    if (imageBase64) {
      localStorage.setItem("imageBase64", imageBase64);
    }

    const timer = setTimeout(() => {
      navigate("/analysis-overview", {
        state: { imageBase64 },
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, imageBase64]);

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      {[180, 240, 300].map((size, i) => (
        <div
          key={i}
          className="absolute border border-dotted border-gray-400"
          style={{
            width: size,
            height: size,
            transform: "rotate(45deg)",
            opacity: 0.3 + i * 0.2,
          }}
        />
      ))}
      <p
        className="uppercase text-black text-center z-10"
        style={{
          fontFamily: "Roobert TRIAL",
          fontWeight: 600,
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "-2%",
        }}
      >
        Loading your results....
      </p>
    </div>
  );
}

