import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getDataOfMiningFromDatabase,
  getVotePower,
  mainnetUserMainnetResourceApi,
  postDistributeReferralRewards,
  postMintUser,
  saveDataOfMiningInDatabase,
  saveUserMinigData,
  updateBalance,
} from "../../utils/axios";
import { SignBroadcastTransactionStatus } from "../../utils/signBroadcastTransaction";

const MiningButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const slotsNumber = useSelector((state) => state?.slots);
  const token = useSelector((state) => state?.wallet?.dataObject?.token);
  const referralAddress = useSelector(
    (state) => state?.wallet?.dataObject?.referredBy
  );
  const walletAddress = useSelector((state) => state.wallet.address);
  const isUserSRBoolean = useSelector((state)=>state.wallet.isUserSR);
  const { ref: buttonRef, inView: buttonInView } = useInView({
    triggerOnce: true,
  });

  const handleTapMining = async () => {
    setIsAnimating(true);
    // Optionally, reset the animation after some time if needed
    setTimeout(() => setIsAnimating(false), 4000);
    const currentDate = new Date().toISOString().split("T")[0];

    if (isLoading) {
      toast.error("Mining is already in progress.");
      return;
    }

    if (!walletAddress) {
      toast.error("Connect your wallet.");
      return;
    }

    try {
      setIsLoading(true);
      const votePower = await getVotePower(walletAddress);
      const totalAmount = (votePower.data.frozenV2 && Array.isArray(votePower.data.frozenV2)) ? 
      votePower.data.frozenV2.reduce((sum, item) => sum + (item.amount || 0), 0) / 10 ** 6 
      : 0;
      if (totalAmount < 25) {
        toast.error("Insufficient stake amount !");
        return;
      }
  
      const userData = await getDataOfMiningFromDatabase(walletAddress);
  
      if (
        userData?.data?.userSlotNumber === slotsNumber?.currentSlotNumber &&
        userData?.data?.userSlotDate.split("T")[0] === currentDate &&
        walletAddress === userData?.data?.walletAddress
      ) {
        toast.error("You have already minted in this slot.");
        return;
      }

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

      const apiData = await postMintUser(walletAddress, token);
      console.log(apiData);

      // SIGN, BROADCAST and TRANSACTION STATUS FOR TRX1
      const signBroadcastTransactionStatusFuncRes = await SignBroadcastTransactionStatus( apiData?.data?.transaction, isUserSRBoolean)
  
      if (signBroadcastTransactionStatusFuncRes.transactionStatus !== "SUCCESS") {
        throw new Error("Transaction 1 failed! Please try again.");
      }

      // Distribute referral rewards
      if (referralAddress) {
        const referralData = await postDistributeReferralRewards(walletAddress);
        console.log("referralData", referralData);

      // SIGN, BROADCAST and TRANSACTION STATUS FOR TRX1
      const signBroadcastTransactionStatusFuncRes = await SignBroadcastTransactionStatus( referralData?.data?.transaction, isUserSRBoolean)
  
      if (signBroadcastTransactionStatusFuncRes.transactionStatus !== "SUCCESS") {
      throw new Error("Transaction 1 failed! Please try again.");
     }
      }
        const savedData = await saveUserMinigData(
          token,
          apiData?.data?.transaction?.txID,
          walletAddress,
          signBroadcastTransactionStatusFuncRes.transactionStatus
        );
        console.log("savedData", savedData);

        // update token balance
        const updateTokenBalance = await updateBalance(token);
        console.log("updateTokenBalance", updateTokenBalance);

        // save the mining data in database
        const usersavedData = await saveDataOfMiningInDatabase(
          token,
          slotsNumber?.currentSlotNumber,
          walletAddress
        );

        console.log("saveDataOfMiningInDatabase", usersavedData);
        toast.success("Your mining has started.");
    } catch (error) {
      toast.error("Mining was canceled or failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div
        ref={buttonRef}
        className={`flex flex-row items-center justify-center w-full my-8 md:my-12 lg:my-12 xl:my-16
                       ${buttonInView ? "animate-pop-in" : ""}
                      `}
      >
        <button
          onClick={handleTapMining}
          className={`relative overflow-hidden w-72 h-20 rounded-full border-2 border-[#232323]  text-2xl font-bold 
                ${
                  isLoading
                    ? "bg-gradient-to-b from-slate-700 to-gray-900 text-white"
                    : "bg-gradient-to-b from-[#FBCB3E] via-[#F99004] to-[#F87504] text-black"
                }`}
        >
          {isAnimating && (
            <svg
              className={`absolute inset-0 w-full h-full ${
                isAnimating ? "animate-wave" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="#FFFFFF"
                d="M0,320L30,293.3C60,267,120,213,180,192C240,171,300,171,360,186.7C420,203,480,245,540,245.3C600,
          245,660,203,720,181.3C780,160,840,160,900,186.7C960,213,1020,267,1080,266.7C1140,267,1200,213,1260,
          192C1320,171,1380,203,1410,218.7L1440,235L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,
          320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
              />
            </svg>
          )}
          {isLoading ? (
            <span className="relative z-10 pulse-animation">Loading...</span>
          ) : (
            <h2 className="relative z-10">Tap to Mine</h2>
          )}
        </button>
      </div>
    </>
  );
};

export default MiningButton;
