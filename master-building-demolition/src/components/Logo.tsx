import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  darkBg?: boolean;
}

export default function Logo({ className = "h-12", iconOnly = false, darkBg = false }: LogoProps) {
  const darkColor = "#111111";
  const lightColor = "#FFFFFF";
  const contrastFill = darkBg ? lightColor : darkColor;
  const buildingFill = darkBg ? "#E4E4E7" : darkColor; // zinc-200 in darkBg
  const backgroundFill = darkBg ? "#27272A" : darkColor; // zinc-800 outline elements in dark bg

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* High-Fidelity SVG Replication of the Excavator & Building Logo */}
      <svg 
        viewBox="0 0 200 135" 
        className="h-full w-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Golden/Yellow Trapezoid Framing on the Left */}
        <path 
          d="M 40 100 L 25 50 L 55 54 L 55 57 L 29 53.5 L 42.5 98.5 Z" 
          fill="#E5A913" 
        />
        <path 
          d="M 37 99.5 L 28 53 L 29.5 53.2 L 38 98.5 Z" 
          fill={backgroundFill} 
        />

        {/* Outer Golden/Yellow Trapezoid Framing on the Right */}
        <path 
          d="M 160 100 L 175 50 L 145 54 L 145 57 L 171 53.5 L 157.5 98.5 Z" 
          fill="#E5A913" 
        />
        <path 
          d="M 163 99.5 L 172 53 L 170.5 53.2 L 162 98.5 Z" 
          fill={backgroundFill} 
        />

        {/* Curved Foundation Ground Arch at bottom of illustration */}
        <path 
          d="M 40 92 C 70 80, 130 80, 160 92 C 145 84, 95 84, 40 92 Z" 
          fill={buildingFill} 
        />

        {/* Left Tall Building Silhouette in Black/White depending on theme */}
        <path 
          d="M 72 87 L 72 40 L 89 47 L 89 85 Z" 
          fill={buildingFill} 
        />
        {/* Inner Building Window Highlights */}
        <rect x="75" y="45" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="75" y="52" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="75" y="59" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="75" y="66" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="75" y="73" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />

        <rect x="80" y="47" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="80" y="54" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="80" y="61" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="80" y="68" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="80" y="75" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />

        <rect x="85" y="49" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="85" y="56" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="85" y="63" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="85" y="70" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />
        <rect x="85" y="77" width="2" height="4" fill={darkBg ? "#18181B" : "#FFFFFF"} opacity="0.9" />

        {/* Right Building/Structure in Black & White Border */}
        <path 
          d="M 90 85 L 90 50 L 105 52 L 105 84 Z" 
          fill={buildingFill} 
        />
        <path 
          d="M 98 84 L 98 51.5 L 100 51.7 L 100 84 Z" 
          fill={darkBg ? "#18181B" : "#FFFFFF"} 
          opacity="0.2"
        />

        {/* Falling Rubble/Debris Detail under Excavator */}
        <path d="M 111 81 L 115 84 L 112 85 Z" fill={contrastFill} />
        <path d="M 118 78 L 120 81 L 117 82 Z" fill={contrastFill} />
        <path d="M 114 62 L 120 64 L 117 66 Z" fill={contrastFill} />
        <path d="M 112 70 L 115 72 L 113 74 Z" fill={contrastFill} />

        {/* Golden Excavator Arm & Body */}
        {/* Cab / Base */}
        <rect x="127" y="72" width="16" height="8" rx="2" fill="#E5A913" />
        <circle cx="131" cy="81" r="3" fill="#111111" />
        <circle cx="139" cy="81" r="3" fill="#111111" />
        <rect x="128" y="79" width="14" height="2" fill="#111111" />
        {/* Cabin Cover */}
        <path d="M 131 72 L 131 68 L 137 68 L 140 72 Z" fill="#111111" />
        
        {/* Hydraulic Boom Boom 1 (Lower Arm) */}
        <path d="M 135 70 L 124 55 L 127 53 L 137 68 Z" fill="#E5A913" />
        {/* Hydraulic Boom 2 (Upper Arm) */}
        <path d="M 124 55 L 109 43 L 107 45 L 121 57 Z" fill="#E5A913" />
        {/* Bucket */}
        <path d="M 109 43 C 105 40, 100 45, 105 48 C 107 47, 109 45, 109 43 Z" fill="#111111" />

        {/* "MASTER" Brand Typography */}
        <text 
          x="100" 
          y="112" 
          textAnchor="middle" 
          fill={contrastFill} 
          fontWeight="900" 
          fontSize="17" 
          fontFamily="'Space Grotesk', 'Inter', sans-serif"
          letterSpacing="4"
        >
          MASTΞR
        </text>

        {/* "EXCAVATION & DEMOLITION" Subtitle text */}
        <text 
          x="100" 
          y="126" 
          textAnchor="middle" 
          fill={contrastFill} 
          fontWeight="800" 
          fontSize="7.5" 
          fontFamily="'Inter', sans-serif" 
          letterSpacing="0.8"
        >
          EXCAVATION & DEMOLITION
        </text>
      </svg>

      {!iconOnly && (
        <div className="flex flex-col text-left select-none">
          <span className={`text-[14px] xs:text-base sm:text-lg md:text-xl font-display font-black leading-none tracking-tight ${darkBg ? 'text-white' : 'text-zinc-950'} group-hover:text-[#E5A913] transition-all duration-300`}>
            Master <span className="text-[#E5A913] font-black drop-shadow-sm tracking-wide">Building</span>
          </span>
          <span className={`text-[8.5px] xs:text-[9.5px] sm:text-[10px] ${darkBg ? 'text-zinc-400' : 'text-zinc-600'} font-sans tracking-[0.05em] xs:tracking-[0.15em] font-extrabold uppercase leading-none mt-1 sm:mt-1.5 flex items-center gap-1 shrink-0`}>
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full inline-block shrink-0 animate-pulse"></span>
            Excavation & Demolition
          </span>
        </div>
      )}
    </div>
  );
}
