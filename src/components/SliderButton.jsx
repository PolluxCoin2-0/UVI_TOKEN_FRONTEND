const WaterWaveButton = () => {

  const handleButtonClick = () => {

  };

  return (
    <button
      onClick={handleButtonClick}
      className="relative overflow-hidden w-72 h-20 rounded-full border-2 border-white text-white text-2xl font-bold bg-blue-400"
    >
      Tap to Mine
      <div
        className={`absolute bottom-0 left-0 w-full h-full transition-transform duration-[4s]`}
      >
        {/* <div className="wave"></div> */}
      </div>
    </button>
  );
};

export default WaterWaveButton;
