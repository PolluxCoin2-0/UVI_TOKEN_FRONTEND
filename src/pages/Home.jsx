import { useInView } from 'react-intersection-observer';
import CountdownTimer from "../components/CountdownTimer";
import Timeline from "../components/Timeline";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import BackgroundImg from "../assets/BGImage.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getVotePower, postMintUser, postUserAmount } from "../utils/axios";
import HeroVideo from "../assets/HeroVideo.mp4";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SliderButton from "../components/SliderButton";
import { RiShareFill } from "react-icons/ri";
import { setUserSlotNumber } from "../redux/slice/SlotsSlice";

const EligibilityModal = ({ onClose }) => {
  // Modal implementation as before
  // No changes needed here for animation
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const walletAddress = useSelector((state) => state.wallet.address);
  const { ref: timerRef, inView: timerInView } = useInView({ triggerOnce: true });
  const { ref: videoRef, inView: videoInView } = useInView({ triggerOnce: true });
  const { ref: timelineRef, inView: timelineInView } = useInView({ triggerOnce: true });
  const { ref: buttonRef, inView: buttonInView } = useInView({ triggerOnce: true });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await postUserAmount(walletAddress);
      setBalance(apiData?.data);
    };
    fetchData();
  }, [walletAddress]);

  return (
    <div className="bg-black w-full min-h-screen relative pb-12 ">
      <img
        src={BackgroundImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
      <div className="px-5 md:px-8 lg:px-6 relative z-10">
        {/* Timer */}
        <div
          ref={timerRef}
          className={`absolute left-1/2 transform -translate-x-1/2 bg-[#1B1B1B] bg-opacity-30
          w-[60%] md:w-[35%] lg:w-[30%] xl:w-[20%] h-[14%] md:h-[10%] lg:h-[10%] xl:h-[14%] rounded-b-3xl flex flex-col shadow-inner shadow-gray-600 items-center justify-center z-10
          ${timerInView ? 'animate-pop-in' : ''}
          `}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)' // For Safari
          }}
        >
          <CountdownTimer />
          <p className="text-gray-400 text-center">Remaining Time</p>
          <p className="border-[1px] px-14 mt-2"></p>
        </div>

        {/* Video */}
        <div
          ref={videoRef}
          className={`border-[1px] border-[#F6B63E] border-opacity-15 rounded-2xl bg-[#040510] h-[200px] md:h-[330px] top-16 md:top-20 flex items-center justify-center relative
          ${videoInView ? 'animate-pop-in' : ''}
          `}
        >
          <video className="w-full h-full object-cover rounded-2xl" autoPlay loop muted>
            <source src={HeroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className={`mt-12 md:mt-20
          ${timelineInView ? 'animate-pop-in' : ''}
          `}
        >
          <Timeline />
        </div>

        {/* Start Mining */}
        <div
          ref={buttonRef}
          className={`flex flex-col md:flex-col lg:flex-row justify-center w-full md:space-x-0 lg:space-x-10 space-y-6 md:space-y-6 lg:space-y-0 my-8 md:my-12 lg:my-12 xl:my-16
          ${buttonInView ? 'animate-pop-in' : ''}
          `}
        >
          <SliderButton isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>

        {/* Blocks */}
        <div
          ref={buttonRef}
         className={`flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between w-full space-x-0 md:space-x-0 lg:space-x-0 xl:space-x-10 space-y-6 md:space-y-6
          lg:space-y-6 xl:space-y-0 mt-0 md:mt-0 ${buttonInView ? 'animate-pop-in' : ''}`}>
          {/* Balance Block */}
          <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center p-2 md:p-8">
            <div>
              <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                {balance ? Number(balance).toFixed(6) : 0}
              </p>
              <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                Your Total Uvi Balance
              </p>
            </div>
            <div className="text-white">
              <MdOutlineAccountBalanceWallet size={24} />
            </div>
          </div>

          {/* Coin Worth Block */}
          <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center p-2 md:p-8">
            <div>
              <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                {balance ? (balance * 0.01) : 0}
              </p>
              <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                Your Coin Worth at Launch
              </p>
            </div>
            <div className="text-white">
              <BiDollar size={24} />
            </div>
          </div>

          {/* Referral Earnings Block */}
          <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center p-2 md:p-8">
            <div>
              <p className="text-sm md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                0
              </p>
              <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3">
                Your Referral Earnings
              </p>
            </div>
            <div className="text-white">
              <RiShareFill size={24} />
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && <EligibilityModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default Home;
