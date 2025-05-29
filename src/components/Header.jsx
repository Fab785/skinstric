import React from "react";

export default function Header() {
  return (
    <header className="flex items-center px-8 justify-between h-16">
      <h1 className="font-roobert font-bold text-[14px]">
        SKINSTRIC{" "}
        <span 
          className="inline-flex items-center text-[#737373] text-[10px] font-light font-roobert"
          style={{ 
            backgroundColor: 'white',
            borderRadius: '9999px',  // fully rounded pill shape
            padding: '0 0.4rem',      // horizontal padding
            height: '22px',          // fixed height to center vertically
            lineHeight: '22px',      // match height for vertical centering
            userSelect: 'none'
          }}
        >
          <span 
            style={{ 
              color: 'black', 
              fontSize: '17px', 
              lineHeight: '22px',
              marginRight: '0.15rem',
              userSelect: 'none',
            }}
          >
            [
          </span>
          INTRO
          <span 
            style={{ 
              color: 'black', 
              fontSize: '17px', 
              lineHeight: '22px',
              marginLeft: '0.15rem',
              userSelect: 'none',
            }}
          >
            ]
          </span>
        </span>
      </h1>

      <button className="bg-black text-white text-[10px] px-4 py-2">
        ENTER CODE
      </button>
    </header>
  );
}





