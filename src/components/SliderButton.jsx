import { useState } from "react";

const WaterWaveButton = () => {
  const [isMinting, setIsMinting] = useState(false);

  const handleButtonClick = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false); // Reset after animation completes (optional)
    }, 4000); // Duration of the animation
  };

  return (
    <button
      onClick={handleButtonClick}
      className="relative overflow-hidden w-72 h-20 rounded-full border-2 border-white text-white text-2xl font-bold bg-blue-400"
    >
      Tap to Mint
      <div
        className={`absolute bottom-0 left-0 w-full h-full transition-transform duration-[4s] ${
          isMinting ? 'water-rise' : 'water-initial'
        }`}
      >
        <div className="wave"></div>
      </div>
    </button>
  );
};

export default WaterWaveButton;
