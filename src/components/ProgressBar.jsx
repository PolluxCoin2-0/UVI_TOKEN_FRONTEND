import  { useState } from 'react';
import { HiMiniArrowRightCircle } from "react-icons/hi2";
import { HiMiniArrowLeftCircle } from "react-icons/hi2";
const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const increaseProgress = () => {
    if (progress < 100) {
      setProgress(prevProgress => prevProgress + 10);
    }
  };

  const resetProgress = () => {
    setProgress(0);
  };

  return (
    <div className="p-4">
     

      <div className="w-full bg-[#1B1B1B] h-12 mb-4 rounded-2xl border-[3px] border-white border-opacity-20 ">
        <div
          className="bg-gradient-to-r from-[#FFEC8F] via-[#E4C469] to-[#A98A32] h-full transition-width rounded-2xl duration-300 ease-in-out "
          
          style={{ width: `${progress}%` }}
        />
    
      </div>

      <button
        onClick={increaseProgress}
        className=" text-white px-4 py-2 rounded mr-2 hover:bg-gradient-to-r from-[#FFEC8F] via-[#E4C469] to-[#A98A32]"
      >
        <HiMiniArrowRightCircle size={24}/>
      </button>
      <button
        onClick={resetProgress}
        className=" text-white px-4 py-2 rounded hover:bg-gradient-to-r from-[#FFEC8F] via-[#E4C469] to-[#A98A32]"
      >
        <HiMiniArrowLeftCircle size={24}/>
      </button>
    </div>
  );
};

export default ProgressBar;
