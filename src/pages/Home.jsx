import { useInView } from "react-intersection-observer";
import CountdownTimer from "../components/CountdownTimer";
import Timeline from "../components/Timeline";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import BackgroundImg from "../assets/BGImage.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProfileDetails, getVotePower, postMintUser, postUserAmount } from "../utils/axios";
import HeroVideo from "../assets/HeroVideo.mp4";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SliderButton from "../components/SliderButton";
import { RiShareFill } from "react-icons/ri";
import { setUserClickedWalletAddress, setUserSlotDate, setUserSlotNumber } from "../redux/slice/SlotsSlice";
import Footer from "../layout/Footer";

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
           {showMiningModal
              ? "Okay" : " Start Mining"}
         
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [referralAmount, setReferralAmount] = useState(0);
  const token = useSelector((state) => state?.wallet?.dataObject?.token);

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
      const amount = await getProfileDetails(token);
      setReferralAmount(amount?.data?.referralAmount);
    };
    fetchData();
  }, [walletAddress]);

  return (
    <div className="bg-black w-full min-h-screen relative pb-0">
      <div className=" relative z-10 pt-6 md:pt-8">
        <div className="px-5 md:px-8 lg:px-6">
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


           {/* CountDown Timer */}
           <div className="flex flex-col items-center text-white font-bold text-2xl mt-4 md:mt-6">
            <p>Next Slot  will be in:</p>
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
            <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center p-2 md:p-8">
              <div>
                <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                  {balance ? Number(balance).toFixed(6) : 0}
                </p>
                <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                  Your Mint Balance
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
                  {balance ? Number(balance * 0.05).toFixed(6) : 0}
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
                  { referralAmount > 0 ? referralAmount : 0}
                </p>
                <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3">
                  Referral Token
                </p>
              </div>
              {/* <div className="text-white">
                <RiShareFill size={24} />
              </div> */}
            </div>
            

            {/* SignUp Bonus */}
            <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center p-2 md:p-8">
              <div>
                <p className="text-sm md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                  { referralAmount > 0 ? referralAmount : 0}
                </p>
                <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3">
                  SignUp Bonus
                </p>
              </div>
              {/* <div className="text-white">
                <RiShareFill size={24} />
              </div> */}
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
