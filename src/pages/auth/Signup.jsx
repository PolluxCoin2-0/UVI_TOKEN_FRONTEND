import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/UvitokenLogo.png";
import BgRotateImg from "../../assets/rotatebg.png";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { mainnetUserMainnetResourceApi, postOTPVerify, postSetReferrer, postSignup } from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setDataObject, setLogin, setWalletAddress as setWalletAddressFunc } from "../../redux/slice/walletslice";
import { SignBroadcastTransactionStatus } from "../../utils/signBroadcastTransaction";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const referralAddress = location.state?.referralAddress;
  const isUserSRBoolean = useSelector((state)=>state.wallet.isUserSR);

  useEffect(()=>{
    if(referralAddress){
      setReferredBy(referralAddress);
      toast.info("Referral Code Applied Successfully");
    }
  },[])

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(isSubmitting){
      toast.error("Please wait for a moment while we process your request...");
      setIsSubmitting(false);
      return;
    }

    if(!email || walletAddress.length===0){
      toast.error("Please enter your email and wallet address!");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      setIsSubmitting(false);
      return;
    } 

    // Disable the button once clicked
    setIsSubmitting(true);

    try {
      const userResourceDetails = await mainnetUserMainnetResourceApi(walletAddress);
      const availableBandwidth =
        ((userResourceDetails?.freeNetLimit ?? 0) + (userResourceDetails?.NetLimit ?? 0)) -
        ((userResourceDetails?.freeNetUsed ?? 0) + (userResourceDetails?.NetUsed ?? 0));
      const availableEnergy =
        (userResourceDetails?.EnergyLimit ?? 0) - (userResourceDetails?.EnergyUsed ?? 0);
  
      if (availableEnergy < 150000) {
        toast.error("Insufficient energy for this transaction. Minimum 150,000 required.");
        return;
      }
  
      if (availableBandwidth < 5000) {
        toast.error("Insufficient bandwidth for this transaction. Minimum 5,000 required.");
        return;
      }
      const apiData = await postSignup(walletAddress, email, referredBy)

      console.log(apiData)

      if(apiData?.data === "Invalid Referral Code"){
        toast.error("Invalid Referral Code");
        setIsSubmitting(false); // Re-enable the button
        return;
      }
      
      if(apiData?.data === "WalletAddress Already Exist"){
        toast.error("WalletAddress Already Exist");
        setIsSubmitting(false); // Re-enable the button
        return;
      }
  
      if(apiData?.data?.d?.email){

        const apiDataOfOTP = await postOTPVerify(email, apiData?.data?.d?.otp);

        if (apiDataOfOTP?.data?._id) {
          if(referredBy){
            const setReferrerdata = await postSetReferrer(walletAddress, referredBy)
            console.log(setReferrerdata)

       // SIGN, BROADCAST and TRANSACTION STATUS
         const signBroadcastTransactionStatusFuncRes = await SignBroadcastTransactionStatus(setReferrerdata?.data?.transaction, isUserSRBoolean)

         if (signBroadcastTransactionStatusFuncRes.transactionStatus !== "SUCCESS") {
         toast.error("Transaction failed!");
         setIsSubmitting(false);
         return;
                }
          }
          dispatch(setDataObject(apiDataOfOTP?.data));
          dispatch(setWalletAddressFunc(walletAddress));
          dispatch(setLogin(true));
          if (referredBy) {
            navigate("/verifyreferral");
          } else {
            navigate("/");
          }
        } 
      }  
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
      setIsSubmitting(false);
    }
     };

  const connectWallet = ()=>{
    var obj = setInterval(async () => {
      if (window.pox) {
        clearInterval(obj);
        const detailsData = JSON.stringify(await window.pox.getDetails());
        const parsedDetailsObject = JSON.parse(detailsData);
        if(parsedDetailsObject[1].data?.wallet_address){
          setWalletAddress(parsedDetailsObject[1].data?.wallet_address)
          setIsConnected(true);
        }
      }})
  }

  const handleFocus = () => {
    if (!isConnected) {
      connectWallet();
    }
  };

  return (
    <div className="bg-black min-h-screen w-full flex justify-center items-center relative overflow-hidden py-4">
      <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800 w-full max-w-md p-8 relative z-10 mt-16 md:mt-0 mx-4 md:mx-0">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="uvi-token-logo" className="w-32 md:w-40 lg:w-48 xl:w-52" />
        </div>

        <div className="border-b-2 border-white mx-8 blur-md"></div>

        <div className="flex flex-col justify-center px-4 text-center text-lg mt-10">
          <p className="text-white mb-8">
            Your gateway to the most advanced layer 1 Blockchain
          </p>

          <form className="space-y-6">
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="border border-white rounded-xl px-4 py-2 text-white text-lg font-semibold bg-black w-full max-w-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Enter Wallet Address"
                className="border border-white rounded-xl px-4 py-2 text-white text-lg font-semibold bg-black w-full max-w-lg"
                value={walletAddress}
                onClick={handleFocus}
                // onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Referred By"
                className="border border-white rounded-xl px-4 py-2 text-white text-lg font-semibold bg-black w-full max-w-lg"
                value={referredBy}
                onChange={(e) => setReferredBy(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <p
                type="submit"
                className={`text-white bg-transparent ${isSubmitting?"cursor-not-allowed":"cursor-pointer"}`}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                <FaArrowAltCircleRight size={36} />
              </p>
            </div>
          </form>

          <div className="flex flex-col xl:flex-row items-center justify-center mt-8 space-x-3">
            <p className="text-white mb-4 xl:mb-0">Already have an account?</p>

            <Link to="/connectwallet">
              <button
                type="button"
                className="text-yellow-500 text-lg font-semibold"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
