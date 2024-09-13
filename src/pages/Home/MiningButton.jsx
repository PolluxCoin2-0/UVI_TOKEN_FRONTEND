import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getDataOfMiningFromDatabase,
  getTransactionResult,
  getVotePower,
  postDistributeReferralRewards,
  postMintUser,
  saveDataOfMiningInDatabase,
  saveUserMinigData,
  updateBalance,
} from "../../utils/axios";

const MiningButton = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const slotsNumber = useSelector((state) => state?.slots);
  const token = useSelector((state) => state?.wallet?.dataObject?.token);
  const referralAddress = useSelector(
    (state) => state?.wallet?.dataObject?.referredBy
  );
  const walletAddress = useSelector((state) => state.wallet.address);
  const { ref: buttonRef, inView: buttonInView } = useInView({
    triggerOnce: true,
  });

  const handleTapMining = async () => {
    setIsAnimating(true);
    // Optionally, reset the animation after some time if needed
    setTimeout(() => setIsAnimating(false), 4000);
    const currentDate = new Date().toISOString().split("T")[0];
    if (!walletAddress) {
      toast.error("Connect your wallet.");
      return;
    }

    const votePower = await getVotePower(walletAddress);
    const totalAmount =
      votePower.data.frozenV2.reduce(
        (sum, item) => sum + (item.amount || 0),
        0
      ) /
      10 ** 6;
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

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const apiData = await postMintUser(walletAddress, token);
      console.log(apiData);

      const signedTransaction = await window.pox.signdata(
        apiData?.data?.transaction
      );

      console.log("signedTransaction: ", signedTransaction);

      const broadcast = JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction[1]))
      );

      console.log("broadcast", broadcast);

      // check transaction result >> SUCCESS : REVERT
      const transactionResult = await getTransactionResult(
        apiData?.data?.transaction?.txID
      );
      console.log("result", transactionResult);
      // Call the api of update Token balance
      const savedData = await saveUserMinigData(
        token,
        apiData?.data?.transaction?.txID,
        walletAddress,
        transactionResult?.data?.receipt?.result
      );
      console.log("savedData", savedData);

      // Distribute referral rewards
      if (
        transactionResult?.data?.receipt?.result === "SUCCESS" &&
        referralAddress
      ) {
        const referralData = await postDistributeReferralRewards(walletAddress);
        console.log("referralData", referralData);

        const signedTransaction2 = await window.pox.signdata(
          referralData?.data?.transaction
        );

        console.log("signedTranaction2", signedTransaction2);
        const broadcast2 = JSON.stringify(
          await window.pox.broadcast(JSON.parse(signedTransaction2[1]))
        );

        console.log("boradcast2", broadcast2);
      }

      // update token balance
      const updateTokenBalance = await updateBalance(token);
      console.log("updateTokenBalance", updateTokenBalance);

      toast.success("Your mining has started.");

      // save the mining data in database
      const usersavedData = await saveDataOfMiningInDatabase(
        token,
        slotsNumber?.currentSlotNumber,
        walletAddress
      );

      console.log("saveDataOfMiningInDatabase", usersavedData);
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
            <span className="relative z-10">Tap to Mine</span>
          )}
        </button>
      </div>
    </>
  );
};

export default MiningButton;
