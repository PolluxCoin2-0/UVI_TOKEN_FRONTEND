import { useInView } from "react-intersection-observer";
import CountdownTimer from "../components/CountdownTimer";
import Timeline from "../components/Timeline";
import { MdArrowForward, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import BackgroundImg from "../assets/BGImage.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getProfileDetails,
  getReferralBalance,
  getVotePower,
  postMintUser,
  postUserAmount,
} from "../utils/axios";
import HeroVideo from "../assets/HeroVideo.mp4";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SliderButton from "../components/SliderButton";
import { RiExchangeDollarLine, RiShareFill } from "react-icons/ri";
import {
  setUserClickedWalletAddress,
  setUserSlotDate,
  setUserSlotNumber,
} from "../redux/slice/SlotsSlice";
import Footer from "../layout/Footer";
import { TbPigMoney } from "react-icons/tb";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PlayStoreImg from "../assets/playstore.png";
import PolinkImg from "../assets/polink.png";
import ChromeImg from "../assets/chrome.png";
import PolinkExtensionImg from "../assets/PolinkEx.png";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import CurveImg from "../assets/Curve.png";


const EligibilityModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.wallet.address);
  const token = useSelector((state) => state?.wallet?.dataObject?.token);
  const [isEligible, setIsEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const slotsNumber = useSelector((state) => state?.slots);
  const [showMiningModal, setShowMiningModal] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const votePower = await getVotePower(walletAddress);
        const totalAmount =
          votePower.data.frozenV2.reduce(
            (sum, item) => sum + (item.amount || 0),
            0
          ) /
          10 ** 6;
        if (totalAmount >= 25) {
          setIsEligible(true);
        }
      } catch (error) {
        console.error("Error fetching vote power:", error);
      } finally {
        setLoading(false);
      }
    };

    // First check if the current time slots of user is matched with previous time slots or not.
    if (
      slotsNumber?.userSlotNumber === slotsNumber?.currentSlotNumber &&
      slotsNumber?.userSlotDate === currentDate
    ) {
      setShowMiningModal(!showMiningModal);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [walletAddress]);

  const handleStartMining = async () => {
    if (!walletAddress) {
      toast.error("Connect your wallet.");
      return;
    }

    // save the clicked time slots in state management
    dispatch(setUserSlotNumber(slotsNumber?.currentSlotNumber));
    dispatch(setUserSlotDate(currentDate));
    dispatch(setUserClickedWalletAddress(walletAddress));
    const apiData = await postMintUser(walletAddress, token);

    const signedTransaction = await window.pox.signdata(
      apiData?.data?.transaction
    );

    JSON.stringify(
      await window.pox.broadcast(JSON.parse(signedTransaction[1]))
    );

    toast.success("Your mining has started.");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-20 z-50  ">
      <div className="relative bg-black m-8 p-8 rounded-2xl shadow-2xl max-w-sm w-full ">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition duration-300"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-white mb-4">Info</h2>
        {loading ? (
          <p className="text-gray-300 mb-6">Checking eligibility...</p>
        ) : (
          <p className="text-gray-300 mb-6">
            {showMiningModal
              ? "Your token mining is going on. Wait for your next slot."
              : isEligible
              ? "You are eligible to start mining."
              : "You are not eligible to start mining because you haven't staked 25 POX."}
          </p>
        )}
        <button
          className={`w-full py-3 ${
            isEligible
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-500 cursor-not-allowed"
          } text-black font-semibold rounded transition duration-300`}
          onClick={handleStartMining}
          disabled={!isEligible || loading} // Disable the button if not eligible or still loading
        >
          {showMiningModal ? "Okay" : " Start Mining"}
        </button>
      </div>
    </div>
  );
};

const Home = () => {

  const CustomNextArrow = ({ onClick }) => (
    <div className="slider-arrow slider-arrow--next font-bold" onClick={onClick}>
      <SlArrowRight />
       
    </div>
  );
  
  const CustomPrevArrow = ({ onClick }) => (
    <div className="slider-arrow slider-arrow--prev" onClick={onClick}>
      <SlArrowLeft />
    </div> 
  )

  

 

  var settings = {
    infinite: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [referralAmount, setReferralAmount] = useState({});

  const walletAddress = useSelector((state) => state.wallet.address);
  const { ref: timerRef, inView: timerInView } = useInView({
    triggerOnce: true,
  });
  const { ref: videoRef, inView: videoInView } = useInView({
    triggerOnce: true,
  });
  const { ref: timelineRef, inView: timelineInView } = useInView({
    triggerOnce: true,
  });
  const { ref: buttonRef, inView: buttonInView } = useInView({
    triggerOnce: true,
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await postUserAmount(walletAddress);
      setBalance(apiData?.data);
      const amount = await getReferralBalance(walletAddress);
      setReferralAmount(amount?.data);
    };
    fetchData();
  }, [walletAddress]);

  return (
    <div className="bg-[#0E0E0E] w-full min-h-screen relative pb-0">
      <div className=" relative z-10 pt-6 md:pt-8">
        <div className="px-5 md:px-8 lg:px-6">

        <Slider {...settings}>
          {/* Video */}
      <div>
         {/* Video */}
         <div
            ref={videoRef}
            className={`relative rounded-2xl bg-[#040510] h-[200px] md:h-[330px] flex items-center justify-center
    ${videoInView ? "animate-pop-in" : ""}
  `}
          >
            <div className="absolute inset-0 rounded-2xl border-[4px] border-black blur-sm"></div>
            <video
              className="w-full h-full object-cover rounded-2xl"
              autoPlay
              loop
              muted
            >
              <source src={HeroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

      </div>

     {/* Banner1 */}
      <div className="bg-gradient-to-r to-[#161616] via-[#1f1400] from-[#141414] rounded-3xl  h-[250px] md:h-[330px] flex items-center justify-center "
       style={{
        boxShadow: '0 2px 20px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)',
      }}>
        <div className="flex flex-row  justify-around">
        <img src={PlayStoreImg} alt="playstore-image" className=""/>
        <p className="text-4xl text-[#F6B63E] font-bold pt-14">Polink Mobile App</p>
        <img src={PolinkImg} alt="polink-image" className="" />
        </div>
        
        <div className="text-center ">
        <p className="text-xl font-semibold text-white pt-2">UVI Token Management on the Go! Access, trade, and manage your UVI Tokens from <br/>
        anywhere, anytime with the Polink mobile app. Available on Android.</p>
        </div>
       
        <div className="flex items-center justify-center">

     
        <div className="relative">
  <img src={CurveImg} alt="" className="w-full h-auto mt-4" />

  <div className="absolute z-10 inset-0 flex flex-row justify-evenly px-32 items-center -mt-32 ">
    <img src={PolinkImg} alt="polink-image" className="" />
    <div className="text-center">
      <p className="text-xl font-semibold pt-8">Click Here</p>
      <a href="https://play.google.com/store/apps/details?id=com.app.PoLink">
      <button 
        type="button"
        className="bg-gradient-to-r to-[#FFF7A7] from-[#F6B63E] bg-opacity-5 px-14 py-2 rounded-full text-xl font-semibold mt-4 border-[1px] border-black">
        Download the App today
      </button>
      </a>
    </div>
    <img src={PlayStoreImg} alt="playstore-image" className="" />
  </div>
</div>


       </div>
       </div>
        
       
       
    



    {/* Banner2 */}
      <div className="bg-gradient-to-r to-[#181717] via-[#3b3724] from-[#131212] bg-opacity-5 rounded-3xl  h-[250px] md:h-[330px] flex items-center justify-center "
       style={{
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)',
      }}>
        <div className="flex flex-row  justify-around">
        <img src={ChromeImg} alt="playstore-image" className="object-contain"/>
        <p className="text-4xl text-[#F6B63E] font-bold pt-14">Polink Wallet Extension</p>
        <img src={PolinkExtensionImg} alt="polink-image" className="object-contain" />
        </div>
        
        <div className="text-center ">
        <p className="text-xl font-semibold text-white pt-2">UVI Token Management on the Go! Access, trade, and manage your UVI Tokens from <br/>
        anywhere, anytime with the Polink mobile app. Available on Android.</p>
        </div>

        <div  className="flex flex-row  justify-evenly ml-12 mr-12 ">
          <img src={PolinkExtensionImg} alt="polink-image" className="object-contain"/>
          <div className="text-center ">
          <p className="text-xl font-semibold text-white pt-8">Click Here</p>
          <a href=" https://chromewebstore.google.com/detail/polink/afeibjjgfjfphjedhdjgbgbhpomolbjm">
         
          <button 
          type="button"
          className="bg-gradient-to-r to-[#272317] via-[#6D684C] from-[#847E55] bg-opacity-5 px-14 py-2 rounded-full text-xl font-semibold mt-4 border-[1px] border-gray-500 text-white">
            Add Polink Extension Now
          </button>
          </a>
          </div>
         
          <img src={ChromeImg} alt="playstore-image" className="object-contain" />
        </div>

       
       
      </div>
      
    </Slider>
        

          {/* CountDown Timer */}
          <div
            ref={timerRef}
            className={`flex flex-col items-center text-white font-bold text-2xl mt-4 md:mt-6 ${
              timerInView ? "animate-pop-in" : ""
            }`}
          >
            <p>Next Slot will be in:</p>
            <CountdownTimer />
          </div>

          {/* Time Slots */}
          <div
            ref={timelineRef}
            className={`
          ${timelineInView ? "animate-pop-in" : ""}
          `}
          >
            <Timeline />
          </div>

          {/* Start Mining */}
          <div
            ref={buttonRef}
            className={`flex flex-col md:flex-col lg:flex-row justify-center w-full md:space-x-0 lg:space-x-10 space-y-6 md:space-y-6 lg:space-y-0 my-8 md:my-12 lg:my-12 xl:my-16
          ${buttonInView ? "animate-pop-in" : ""}
          `}
          >
            <SliderButton
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>

          {/* Blocks */}
          <div
            ref={buttonRef}
            className={`flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between w-full space-x-0 md:space-x-0 lg:space-x-0 xl:space-x-10 space-y-6 md:space-y-6
          lg:space-y-6 xl:space-y-0 mt-0 md:mt-0 ${
            buttonInView ? "animate-pop-in" : ""
          }`}
          >
            {/* Balance Block */}
            <div
              className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center p-2 md:p-8"
              style={{
                boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
              `, // White shadow with moderate opacity
              }}
            >
              <div>
                <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                  {balance ? Number(balance).toFixed(6) : 0}
                </p>
                <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                  Total Minted Balance
                </p>
              </div>
              <div className="bg-[#202020] rounded-full p-[10px]">
                <MdOutlineAccountBalanceWallet size={32} color="white" />
              </div>
            </div>

            {/* Referral Earning */}
            <div
              className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center p-2 md:p-8"
              style={{
                boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
              `, // White shadow with moderate opacity
              }}
            >
              <div>
                <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                  {referralAmount
                    ? referralAmount.leve1Reward + referralAmount.leve2Reward
                    : 0}
                </p>
                <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                  UVI Referral Earnings
                </p>
              </div>
              <div className="bg-[#202020] rounded-full p-[10px]">
                <TbPigMoney size={32} color="white" />
              </div>
            </div>

            {/* Coin Worth at launch */}
            <div
              className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center p-2 md:p-8"
              style={{
                boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
              `, // White shadow with moderate opacity
              }}
            >
              <div>
                <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                  {balance && referralAmount
                    ? Number(
                        (referralAmount.leve1Reward +
                          referralAmount.leve2Reward +
                          balance) *
                          0.05
                      ).toFixed(6)
                    : 0}
                </p>
                <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                  Coin Worth at Launch
                </p>
              </div>
              <div className="bg-[#202020] rounded-full p-[10px]">
                <RiExchangeDollarLine size={32} color="white" />
              </div>
            </div>
          </div>

          {/* LeaderBoard */}
          <div
            className=" mt-16 bg-[#141414] rounded-3xl"
            style={{
              boxShadow: `
              0 2px 10px rgba(255, 255, 255, 0.05), 
              inset 0 0 10px rgba(255, 255, 255, 0.5)
            `, // White shadow with moderate opacity
            }}
          >
            <p
              className="text-white font-bold text-xl text-center bg-[#141414] rounded-t-3xl py-4"
              style={{
                boxShadow: `
                  0 2px 20px rgba(0, 0, 0, 0.4), 
                  inset 0 2px 5px rgba(255, 255, 255, 0.1),
                  inset 0 0px 2px rgba(255, 255, 255, 0.1)
                `, // Outer shadow and inner shadow without affecting the bottom
              }}
            >
              LeaderBoard
            </p>
            <div className="px-4 py-6 bg-[#0E0E0E] rounded-b-3xl">
              <div className="flex flex-row justify-between">
                {/* wallet address */}
                <div className="flex flex-row space-x-8 text-white">
                  {/* Index */}
                  <div className="rounded-full bg-[#171717] text-white font-semibold text-lg flex items-center justify-center h-10 w-10">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">Wallet Address</p>
                    <p className="text-[#8C8B8B] font-medium">
                      Total $UVI Balance{" "}
                    </p>
                  </div>
                </div>
                {/* total transactions */}
                <div>
                  <p className="font-semibold text-[#FFC121]">
                    Total Transactions
                  </p>
                  <p className="text-white font-medium">$ 1,222,222.45 </p>
                </div>
              </div>

              <div className="flex flex-row justify-center items-center space-x-4">
                <Link></Link>
                <p className="cursor-pointer text-lg text-[#FCC121] font-semibold">
                  More
                </p>
                <MdArrowForward color="#FCC121" size={24} />
              </div>

              <div className="h-[2px] bg-[#171717] my-8"></div>

              <p className=" text-lg text-[#FCC121] font-semibold">My Place</p>
              {/* My Place */}
              <div className="flex flex-row justify-between py-4">
                {/* wallet address */}
                <div className="flex flex-row space-x-8 text-white">
                  {/* Index */}
                  <div className="rounded-full bg-[#171717] text-white font-semibold text-lg flex items-center justify-center h-10 w-10">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">Wallet Address</p>
                    <p className="text-[#8C8B8B] font-medium">
                      Total $UVI Balance{" "}
                    </p>
                  </div>
                </div>
                {/* total transactions */}
                <div>
                  <p className="font-semibold text-[#FFC121]">
                    Total Transactions
                  </p>
                  <p className="text-white font-medium">$ 1,222,222.45 </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mx-0">
          <Footer />
        </div>

        {/* Modal */}
        {isModalOpen && <EligibilityModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default Home;
