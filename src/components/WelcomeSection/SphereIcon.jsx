function SphereIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Base from SVG file */}
      <circle cx="60" cy="60" r="55" stroke="#00ff88" strokeWidth="1.5" fill="none" opacity="0.2" />
      <circle cx="60" cy="60" r="45" stroke="#00ff88" strokeWidth="1" fill="none" opacity="0.15" />
      <circle cx="60" cy="60" r="35" stroke="#00ff88" strokeWidth="1" fill="none" opacity="0.1" />
      
      {/* Dots pattern for holographic effect */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 25 + (i % 3) * 5;
        const x = 60 + Math.cos(angle) * radius;
        const y = 60 + Math.sin(angle) * radius;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1.5"
            fill="#00ff88"
            opacity={0.6 + (i % 3) * 0.1}
          />
        );
      })}
      
      {/* Center dot */}
      <circle cx="60" cy="60" r="3" fill="#00ff88" opacity="0.9" />
    </svg>
  );
}

export default SphereIcon;
