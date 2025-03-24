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
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [srWalletAddress, setSrWalletAddress] = useState(null);
  const [normalWalletAddress, setNormalWalletAddress] = useState(null);

  const handleLogin = async()=>{
    if (walletAddress) {
      toast.error("Wallet is already connected");
      return 
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

      setNormalWalletAddress(userWalletAddress);
       // CHECK USER IS SR OR NOT
       const userSRApiData = await getUserIsSR(userWalletAddress);
       console.log( userSRApiData)

       if(userSRApiData?.message==="adderss undercontrol found"){
        setSrWalletAddress(userSRApiData?.data);
        setShowModal(true); // Show modal for SR wallet
        setIsLoading(false);
        return;
       }

      // Proceed with Login API if no SR wallet
      await proceedWithLogin(userWalletAddress);
    } catch (error) {
      toast.error("Invalid wallet address or login failed.");
      console.log("error", error);
    } finally{
      setIsLoading(false);
    }
  }

  const proceedWithLogin = async (walletAddress) => {
    try {
      const loginApiData = await postLogin(walletAddress);
     if (loginApiData?.data?._id) {
      const updatedLoginData = {
        ...loginApiData?.data,
        walletAddress,
      };
          dispatch(setWalletAddress(walletAddress));
          dispatch(setLogin(true));
          dispatch(setDataObject(updatedLoginData));
          toast.success("User logged in Success");
          navigate("/");
        }
        else {
          toast.error("Wallet Address does not exist!")
        }
    } catch (error) {
      console.log("Login API Error:", error);
    }
  };

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

  const handleModalProceed = async () => {
    if (!selectedOption) {
      toast.warning("Please select an option to proceed.");
      return;
    }
  
    // Determine the wallet address based on the selected option
    const selectedWallet =
      selectedOption === "option1" ? srWalletAddress : normalWalletAddress;
      if(selectedOption === "option1"){
        dispatch(setIsUserSR(true));
      }
      await proceedWithLogin(selectedWallet);
      setShowModal(false);
  };

  return (
    <div className="bg-black min-h-screen w-full flex justify-center items-center relative overflow-hidden py-4">

     {/* Modal */}
     {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm SR Wallet</h3>
            <p className="mb-4">
              We detected an SR wallet. Please select an option to proceed:
            </p>
            <div className="flex flex-col space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="srWalletOption"
                  value="option1"
                  className="mr-2"
                  onChange={() => setSelectedOption("option1")}
                />
                <span className="block sm:hidden"><span className="font-semibold">Under Control Wallet:</span>
                  {`${srWalletAddress && srWalletAddress.slice(0, 6)}...${
                    srWalletAddress && srWalletAddress.slice(-6)
                  }`}
                </span>
                <span className="hidden sm:block"><span className="font-semibold">Under Control Wallet:</span> {srWalletAddress}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="srWalletOption"
                  value="option2"
                  className="mr-2"
                  onChange={() => setSelectedOption("option2")}
                />
                <span className="block sm:hidden"><span className="font-semibold">Active Wallet:</span>
                  {`${
                    normalWalletAddress && normalWalletAddress.slice(0, 6)
                  }...${normalWalletAddress && normalWalletAddress.slice(-6)}`}
                </span>
                <span className="hidden sm:block"><span className="font-semibold">Active Wallet:</span> {normalWalletAddress}</span>
              </label>
            </div>

            <button
              disabled={isLoading}
              onClick={handleModalProceed}
              className="mt-4 w-full py-2 px-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
      
      <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800 w-full max-w-md md:max-w-lg lg:max-w-xl p-8 relative z-10 py-20 md:mt-10 mx-4 md:mx-0
       flex flex-col items-center ">
        {/* connect wallet image */}
        <div>
          <img src={WalletImg} className="Wallet logo" />
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
