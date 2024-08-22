import CountdownTimer from "../components/CountdownTimer";
import Timeline from "../components/Timeline";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { LuCopy } from "react-icons/lu";
import UviLogo from "../assets/UvitokenLogo.png";
import { Link } from "react-router-dom";
import BackgroundImg from "../assets/BGImage.png";
import VerticalTimeline from "../components/VerticalTimeline";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getVotePower, postCheckMintUser, postMintUser } from "../utils/axios";
import HeroVideo from "../assets/HeroVideo.mp4";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const EligibilityModal = ({ onClose }) => {

  const walletAddress = useSelector((state) => state.wallet.address);
  const token = useSelector((state) => state?.wallet?.dataObject?.token);
  const [isEligible, setIsEligible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const votePower = await getVotePower(walletAddress);
        const totalAmount = votePower.frozenV2.reduce((sum, item) => sum + (item.amount || 0), 0) / 10**6;
        if (totalAmount >= 25) {
          setIsEligible(true);
        }
      } catch (error) {
        console.error("Error fetching vote power:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [walletAddress]);

  const handleStartMining = async () => {
    if(!walletAddress){
      toast.error("Connect your wallet.");
      return;
    }
    
    // first check user's time slot is completed or not
    const isUserMinted = await postCheckMintUser(walletAddress);
    // If No then execute the mining function , otherwise show toast message "Your token minig is going on."
    if (isUserMinted?.data) {
      toast.info("Your token mining is going on.");
    } else {
      const apiData = await postMintUser(walletAddress, token);
      console.log(apiData);

      const signedTransaction = await window.pox.signdata(
        apiData?.data?.transaction
      );
      console.log(signedTransaction);

      const result = JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction[1]))
      );
      console.log(result);

      toast.success("Your mining has started.");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative bg-black p-8 rounded-lg shadow-2xl max-w-sm w-full ">
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
            {isEligible ? "You are eligible to start mining." : "You are not eligible to start mining because you haven't staked 25 POX."}
          </p>
        )}
        <button
          className={`w-full py-3 ${isEligible ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-500 cursor-not-allowed'} text-black font-semibold rounded transition duration-300`}
          onClick={handleStartMining}
          disabled={!isEligible || loading} // Disable the button if not eligible or still loading
        >
          Start Mining
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-black w-full h-full  relative pb-12">
      <img
        src={BackgroundImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30  "
      />
      <div className="px-5 md:px-8 lg:px-6  relative z-10 ">
        {/* Timer */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 border-[1px] border-white border-opacity-15 bg-[#1B1B1B]
        w-[60%] md:w-[35%] lg:w-[30%] xl:w-[25%] h-[6%] md:h-[10%] rounded-b-2xl flex flex-col shadow-inner shadow-gray-600 items-center justify-center z-10"
        >
          <CountdownTimer />
          <p className="text-gray-400 text-center ">Remaining Time</p>
          <p className="border-[1px] px-14 mt-2"></p>
        </div>

        {/* Video */}
        <div className="border-[1px] border-[#F6B63E] border-opacity-15 rounded-2xl bg-[#040510] h-[330px] top-14 flex items-center justify-center relative">
          {/* Video Component */}
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

        {/* Timeline */}
        <div className="mt-20">
          {/* Your timeline component goes here */}
          {/* for devices lg, xl, 2xl  */}
          <div className="hidden md:block mt-0 md:mt-12 lg:mt-12">
            <Timeline />
          </div>

          <div className=" md:hidden mb-12">
            <VerticalTimeline />
          </div>
        </div>

        {/* blocks */}
        <div
          className="flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between w-full 
        space-x-0 md:space-x-0 lg:space-x-0 xl:space-x-10 space-y-6 md:space-y-6 lg:space-y-6 xl:space-y-0 mt-0 md:mt-14"
        >
          <div
            className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl 
          w-full md:w-full lg:w-full xl:w-[32%] flex flex-row justify-between items-center  p-8"
          >
            <div>
              <p className="text-xl md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                0.00
              </p>
              <p className="text-[#8C8B8B] text-md md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                Your Total Uvi Balance
              </p>
            </div>
            <div className="text-white ">
              <MdOutlineAccountBalanceWallet size={36} />
            </div>
          </div>

          <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl w-full 
          md:w-full lg:w-full xl:w-[32%]  flex flex-row justify-between items-center  p-8">
            <div>
              <p className="text-xl md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                0.00
              </p>
              <p className="text-[#8C8B8B] text-md md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
                Your Coin Worth at Launch
              </p>
            </div>
            <div className="text-white ">
              <BiDollar size={28} />
            </div>
          </div>
          <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-xl w-full 
          md:w-full lg:w-full xl:w-[32%]  flex flex-row justify-between items-center  p-8">
            <div>
              <p className="text-xl md:text-2xl lg:text-xl xl:text-4xl text-white font-bold">
                dPLxc5
              </p>
              <p className="text-[#8C8B8B] text-md md:text-lg font-semibold mt-0 md:mt-3">
                Your Referral Earnings
              </p>
            </div>
            <div className="text-white ">
              <LuCopy size={28} />
            </div>
          </div>
        </div>

        {/* Start Mining */}
        <div className="flex flex-col md:flex-col lg:flex-row justify-center    w-full md:space-x-0 lg:space-x-10 space-y-6 md:space-y-6 lg:space-y-0 mt-14  ">
          <div
            onClick={()=>setIsModalOpen(!isModalOpen)}
            className="bg-black text-white  border-[1px] border-yellow-600 rounded-xl shadow-inner
            shadow-yellow-600 w-full md:w-full lg:w-[42%] p-2 flex flex-row justify-center space-x-5 items-center cursor-pointer"
          >
            <div>
              <div className="text-xl md:text-2xl lg:text-xl xl:text-4xl font-semibold">
                Start Mining
              </div>
              <p className="text-lg font-medium pt-1 text-[#8C8B8B] whitespace-nowrap ">
                After: 0/10000 users
              </p>
            </div>

            <div>
              <img src={UviLogo} alt="uvi-token" className="h-[120px]" />
            </div>
          </div>

          {/* <div className="bg-black text-white border-[1px]  border-white rounded-xl shadow-inner shadow-white  w-full md:w-full lg:w-[32%] p-2 flex flex-row justify-center space-x-5 items-center">
            <Link to="/buycoin">
              <div className="text-xl md:text-2xl lg:text-xl xl:text-4xl font-semibold">
                Buy Coin
              </div>
            </Link>

            <div>
              <img src={UviLogo} alt="uvi-token" className="h-[120px]" />
            </div>
          </div> */}
        </div>

        {/* border-bottom */}
        {/* <div className="border-b-[1px] border-white border-opacity-15 mt-10 "></div> */}

        {/* Leaderboard */}
      </div>
      {isModalOpen && <EligibilityModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Home;
