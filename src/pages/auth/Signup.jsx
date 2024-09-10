import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/UvitokenLogo.png";
import BgRotateImg from "../../assets/rotatebg.png";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { postSetReferrer, postSignup, postVerifyReferral } from "../../utils/axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation();
  const referralAddress = location.state?.referralAddress;

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

    if(!email || walletAddress.length===0){
      toast.error("Please enter your email and wallet address!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    } 

    const apiData = await postSignup(walletAddress, email, referredBy)

    if(apiData?.data === "Invalid Referral Code"){
      toast.error("Invalid Referral Code");
      return;
    }
    
    if(apiData?.data === "WalletAddress Already Exist"){
      toast.error("WalletAddress Already Exist");
      return;
    }

    // toast message >> OTP sent successfully
    if(apiData?.data?.email){

      if(referredBy){
        const setReferrerdata = await postSetReferrer(walletAddress, referredBy)
        console.log(setReferrerdata)
  
        const signedTransaction = await window.pox.signdata(
          setReferrerdata?.data?.transaction
        );
    
        console.log("signedTranaction3",signedTransaction);
        const broadcast = JSON.stringify(
          await window.pox.broadcast(JSON.parse(signedTransaction[1]))
        );
    
        console.log("boradcast3",broadcast)
      }
     
      toast.success("OTP sent successfully");
      // navigate
      navigate("/otp", {state:{email:email, walletAddress:walletAddress, referredBy:referredBy}});
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
      connectWallet(); // Call function only if it hasn't been called yet
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

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <button
                type="submit"
                className="text-white bg-transparent cursor-pointer"
              >
                <FaArrowAltCircleRight size={36} />
              </button>
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
