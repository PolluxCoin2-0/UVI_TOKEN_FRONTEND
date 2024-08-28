import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { getCountOfUsers } from "../utils/axios";
import { AiOutlineClose } from "react-icons/ai";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";

const RegisteredCountModal = ({
  numberOfRegisteredUsers,
  userCountModal,
  setUserCountModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-20 z-50">
      <div className="relative bg-black m-8 p-8 rounded-lg shadow-2xl max-w-sm w-full ">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition duration-300"
          onClick={()=>setUserCountModal(!userCountModal)}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-white mb-4">Info</h2>
     
          <p className="text-gray-300 mb-6">
          Only <span className="font-bold text-white">{formatNumberWithCommas(10000 - numberOfRegisteredUsers)}</span> users left for start mining!
          </p>
        <button
          className={`w-full py-3 ${
            numberOfRegisteredUsers
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-500 cursor-not-allowed"
          } text-black font-semibold rounded transition duration-300`}
          onClick={()=>setUserCountModal(!userCountModal)}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

const SliderButton = ({ isModalOpen, setIsModalOpen }) => {
  const [numberOfRegisteredUsers, setNumberOfRegisteredUsers] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [userCountModal, setUserCountModal] = useState(false);
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

  const executeFunction = async () => {
    const registeredUsers = await getCountOfUsers();
    setNumberOfRegisteredUsers(registeredUsers?.data);

    if (registeredUsers?.data > 10000) {
      setIsModalOpen(!isModalOpen);
    } else {
      setUserCountModal(!userCountModal);
    }
  };

  return (
    <>
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
            className={`absolute w-12 h-12 bg-gradient-to-br from-yellow-200 to-yellow-600 rounded-full shadow-lg flex items-center justify-center 
            cursor-pointer transform transition-transform duration-200 ${
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
      {userCountModal && (
        <RegisteredCountModal
          numberOfRegisteredUsers={numberOfRegisteredUsers}
          setUserCountModal={setUserCountModal}
          userCountModal={userCountModal}
        />
      )}
    </>
  );
};

export default SliderButton;
