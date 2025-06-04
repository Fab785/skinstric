import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

export default function SettingUpCamera() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/camera-preview");
    }, 2000); // Delay to simulate camera setup
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      {/* Diamond Background */}
      {[300, 240, 180].map((size, i) => (
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

      {/* Icon */}
      <div className="z-10 w-24 h-24 flex items-center justify-center rounded-full border-2 border-black text-black text-3xl bg-white">
        <FaCamera />
      </div>

      {/* Label */}
      <p className="mt-4 text-xs text-black uppercase tracking-wide z-10">
        Setting up camera ...
      </p>

      {/* Tips */}
      <div className="absolute bottom-24 flex gap-6 text-xs uppercase text-black z-10">
        <p>◦ Neutral Expression</p>
        <p>◦ Frontal Pose</p>
        <p>◦ Adequate Lighting</p>
      </div>
    </div>
  );
}
