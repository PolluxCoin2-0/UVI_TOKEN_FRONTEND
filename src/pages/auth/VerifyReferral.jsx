import { useDispatch, useSelector } from "react-redux";
import BgRotateImg from "../../assets/rotatebg.png";
import { mainnetUserMainnetResourceApi, postVerifyReferral } from "../../utils/axios";
import LogoImg from "../../assets/UvitokenLogo.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setDataObject, setLogin } from "../../redux/slice/walletslice";
import { SignBroadcastTransactionStatus } from "../../utils/signBroadcastTransaction";
import { useState } from "react";

const VerifyReferral = () => {
  const dispatch = useDispatch();
  const walletAddressBySignup = useSelector(
    (state) => state?.wallet?.dataObject?.walletAddress
  );
  const token = useSelector((state) => state?.wallet?.dataObject?.token);
  const referredBy = useSelector((state) => state?.wallet?.dataObject?.referredBy);
  const isUserSRBoolean = useSelector((state)=>state.wallet.isUserSR);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const verifyReferralfunc = async () => {

    if(isLoading){
      toast.error("Please wait, Verification is in progress.");
      return;
    }

    try {
      setIsLoading(true);
      const userResourceDetails = await mainnetUserMainnetResourceApi(walletAddressBySignup);
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
      const referralApi = await postVerifyReferral(
        token,
        walletAddressBySignup,
        referredBy
      );

      if (referralApi?.data?.trx1) {
        // SIGN, BROADCAST and TRANSACTION STATUS FOR TRX1
        const signBroadcastTransactionStatusFuncRes = await SignBroadcastTransactionStatus(referralApi?.data?.trx1?.transaction, isUserSRBoolean)
  
        if (signBroadcastTransactionStatusFuncRes.transactionStatus !== "SUCCESS") {
          throw new Error("Transaction 1 failed! Please try again.");
        }
  
         // SIGN, BROADCAST and TRANSACTION STATUS FOR TRX2
         const signBroadcastTransactionStatusFuncRes2 = await SignBroadcastTransactionStatus(referralApi?.data?.trx2?.transaction, isUserSRBoolean)
  
         if (signBroadcastTransactionStatusFuncRes2.transactionStatus !== "SUCCESS") {
          throw new Error("Transaction 1 failed! Please try again.");
         }
  
        toast.success("Wallet address verified!");
        dispatch(setDataObject(referralApi?.data?.user));
        dispatch(setLogin(true));
        navigate("/");
      } else {
        toast.error("Invalid response from the server.");
        throw new Error("Invalid response from the server.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
     console.error("Error in verifyReferralfunc:", error);
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black h-screen w-full flex justify-center items-center relative overflow-hidden py-4 ">
      <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800 w-full max-w-md md:max-w-lg lg:max-w-xl p-0 relative z-10 mt-16 md:mt-0 mx-4 md:mx-0 flex flex-col items-center  ">
        {/* connect wallet image */}
        <div>
          <img src={LogoImg} className="" />
        </div>

        <div className="flex flex-col space-y-2 ">
          <input
            id="text-input"
            type="text"
            value={referredBy}
            className="w-80 md:w-96 px-4 py-3 border  border-gray-300 rounded-lg shadow-sm focus:outline-none  transition duration-150 ease-in-out  "
            placeholder="Enter Wallet Address"
          />
        </div>
        <button
          type="button"
          className="bg-white px-8 md:px-20 py-2 md:py-3 rounded-2xl text-black text-lg font-bold mt-10 hover:bg-[#F3BB1C] mb-8"
          onClick={verifyReferralfunc}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyReferral;