import { useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";

const SliderButton = ({ isModalOpen, setIsModalOpen }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef(null);

  const handleStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleEnd = () => {
    if (isDragging) {
      const buttonWidth = buttonRef.current.clientWidth;
      if (sliderPosition >= buttonWidth - 48) {
        // Execute function when slider reaches the end
        executeFunction();
      } else {
        // Reset slider position if not fully dragged
        setSliderPosition(0);
      }
      setIsDragging(false);
    }
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const newPosition = Math.min(
      Math.max(0, clientX - buttonRect.left - 24),
      buttonRect.width - 48
    );

    setSliderPosition(newPosition);
  };

  const executeFunction = () => {
    
    setIsModalOpen(!isModalOpen); 
  };

  return (
    <div
      className="flex items-center justify-center"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onTouchStart={handleStart}
    >
      <div
        ref={buttonRef}
        className="relative w-96 h-12 bg-yellow-400 rounded-full overflow-hidden shadow-md select-none"
      >
        {/* Slider Handle */}
        <div
          className={`absolute w-12 h-12 bg-gradient-to-br from-yellow-200 to-yellow-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer transform transition-transform duration-200 ${
            isDragging ? "ease-in" : "ease-out"
          }`}
          style={{ left: `${sliderPosition}px`, top: "0px" }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          {/* Arrow Icon */}
          <IoIosArrowForward className="text-white text-2xl" />
        </div>
        {/* Text Label */}
        <span className="absolute inset-0 flex items-center justify-center text-black font-bold pointer-events-none">
          Slide to Mine
        </span>
      </div>
    </div>
  );
};

export default SliderButton;
