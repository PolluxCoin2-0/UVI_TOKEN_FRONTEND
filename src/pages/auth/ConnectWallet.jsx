import WalletImg from "../../assets/wallet.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setDataObject,
  setIsUserSR,
  setLogin,
  setWalletAddress,
} from "../../redux/slice/walletslice";
import { toast } from "react-toastify";
import BgRotateImg from "../../assets/rotatebg.png";
import { getUserIsSR, postLogin } from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const walletAddress = useSelector((state) => state.wallet.address);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async()=>{
    if (walletAddress) {
      return toast.error("Wallet is already connected");
    }

    if (isLoading) {
      console.log("enter in loading state");
      toast.warning("Fetching Wallet address...");
      return;
    }

    setIsLoading(true);
    try {
      let userWalletAddress = await getPolinkweb();
      if(!userWalletAddress){
        toast.error("User Wallet Address not found!")
        return;
      }

       // CHECK USER IS SR OR NOT
       const userSRApiData = await getUserIsSR(userWalletAddress);
       console.log( userSRApiData)

       if(userSRApiData?.message==="adderss undercontrol found"){
       userWalletAddress = userSRApiData?.data;
       dispatch(setIsUserSR(true));
       }
        const apiData = await postLogin(userWalletAddress);
        if (apiData?.data?._id) {
          dispatch(setWalletAddress(userWalletAddress));
          dispatch(setLogin(true));
          dispatch(setDataObject(apiData?.data));
          toast.success("User logged in Success");
          navigate("/");
        }
        else{
          toast.error("Wallet Address does not exist!")
        }
    } catch (error) {
      console.error("Error in wallet connection process:", error);
      toast.error("An error occurred. Please try again.");
    } finally{
      setIsLoading(false);
    }
  }

  // connect wallet function
  async function getPolinkweb() {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        try {
          if (window.pox) {
            clearInterval(intervalId); // Clear interval once `window.pox` is available
            const detailsData = JSON.stringify(await window.pox.getDetails());
            const parsedDetailsObject = JSON.parse(detailsData);
  
            if (parsedDetailsObject[1].data?.Network === "Yuvi Testnet") {
              toast.error("Switch to Mainnet Network");
              reject(new Error("Incorrect Network"));
              return;
            }
  
            resolve(parsedDetailsObject[1].data?.wallet_address); // Resolve with wallet address
          }
        } catch (error) {
          clearInterval(intervalId); // Ensure cleanup on error
          reject(error); // Reject the promise
        }
      }, 1000);
    });
  }

  return (
    <div className="bg-black min-h-screen w-full flex justify-center items-center relative overflow-hidden py-4">
      <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800 w-full max-w-md md:max-w-lg lg:max-w-xl p-8 relative z-10 py-20 md:mt-10 mx-4 md:mx-0
       flex flex-col items-center ">
        {/* connect wallet image */}
        <div>
          <img src={WalletImg} className="" />
        </div>

        <p className="text-xl md:text-3xl font-bold text-[#FFBE2E] mt-5">
          Wallet
        </p>
        <button
          type="button"
          className="bg-white px-10 md:px-20 py-2 md:py-3 rounded-lg text-black text-lg font-bold mt-10"
          onClick={handleLogin}
        >
          Connect Wallet
        </button>
        <p className="text-white mt-4">
          Don’t have an account yet? {"  "}
          <Link to="/signup">
            <span className="font-medium text-yellow-500 underline cursor-pointer">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ConnectWallet;
