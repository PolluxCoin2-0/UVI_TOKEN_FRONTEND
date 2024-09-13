import { useEffect, useState } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";
import { useInView } from "react-intersection-observer";
import { getReferralBalance, getSignupBonus, postUserAmount } from "../../utils/axios";
import { useSelector } from "react-redux";
import { SiMoneygram } from "react-icons/si";

const Blocks = () => {
  const [balance, setBalance] = useState(0);
  const [referralAmount, setReferralAmount] = useState({});
  const [signupBonus, setSignupBonus] = useState(0);
  const { ref: buttonRef, inView: buttonInView } = useInView({
    triggerOnce: true,
  });
  const walletAddress = useSelector((state) => state.wallet.address);
  const token = useSelector((state) => state?.wallet?.dataObject?.token);

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await postUserAmount(walletAddress);
      setBalance(apiData?.data);
      const amount = await getReferralBalance(walletAddress);
      setReferralAmount(amount?.data);
      const signupBonusData = await getSignupBonus(token);
      setSignupBonus(signupBonusData?.data?.referralAmount);
    };
    fetchData();
  }, [walletAddress]);

  return (
    <>
      <div
        ref={buttonRef}
        className={`flex flex-col md:flex-col lg:flex-col xl:flex-row justify-between w-full space-x-0 md:space-x-0 lg:space-x-0 xl:space-x-8 space-y-6 md:space-y-6
          lg:space-y-6 xl:space-y-0 mt-0 md:mt-0 ${
            buttonInView ? "animate-pop-in" : ""
          }`}
      >

        {/* Signup Bonus */}
        <div
          className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[24%] flex flex-row justify-between items-center px-4 py-8 md:px-5"
          style={{
            boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
                 `, // White shadow with moderate opacity
          }}
        >
          <div>
            <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold pb-2 md:pb-0">
              {balance ? parseFloat(signupBonus.toFixed(6)) + "" : 0}
            </p>
            <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
             Signup Bonus
            </p>
          </div>
          <div className="bg-[#202020] rounded-full p-[8px]">
            <SiMoneygram size={28} color="white" />
          </div>
        </div>
        
        {/* Total Minted Balance Block */}
        <div
          className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[24%] flex flex-row justify-between items-center px-4 py-8 md:px-5"
          style={{
            boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
                 `, // White shadow with moderate opacity
          }}
        >
          <div>
            <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold pb-2 md:pb-0">
              {balance ? parseFloat(balance.toFixed(6)) + "" : 0}
            </p>
            <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
              Total Minted Balance
            </p>
          </div>
          <div className="bg-[#202020] rounded-full p-[8px]">
            <MdOutlineAccountBalanceWallet size={28} color="white" />
          </div>
        </div>

        {/* UVI Referral Earning */}
        <div
          className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[24%] flex flex-row justify-between items-center px-4 py-8 md:px-5"
          style={{
            boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
              `, // White shadow with moderate opacity
          }}
        >
          <div>
            <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold pb-2 md:pb-0">
              {referralAmount
                ? Number(referralAmount.leve1Reward || 0) +
                  Number(referralAmount.leve2Reward || 0)
                : 0}
            </p>
            <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
              UVI Referral Earnings
            </p>
          </div>
          <div className="bg-[#202020] rounded-full p-[8px]">
            <TbPigMoney size={28} color="white" />
          </div>
        </div>

        {/* Coin Worth at launch */}
        <div
          className="bg-[#141414] shadow-xl rounded-3xl w-full md:w-full lg:w-full xl:w-[24%] flex flex-row justify-between items-center px-4 py-8 md:px-5"
          style={{
            boxShadow: `
                0 2px 20px rgba(0, 0, 0, 0.4), 
                inset 0 0 10px rgba(255, 255, 255, 0.1)
              `, // White shadow with moderate opacity
          }}
        >
          <div>
            <p className="text-md md:text-2xl lg:text-xl xl:text-4xl text-white font-bold pb-2 md:pb-0">
              ${" "}
              {referralAmount
                ? parseFloat(
                    (
                      ((referralAmount.leve1Reward || 0) +
                        (referralAmount.leve2Reward || 0) +
                        (signupBonus || 0) +
                        (balance || 0)) *
                      0.05
                    ).toFixed(6)
                  ) + ""
                : 0}
            </p>
            <p className="text-[#8C8B8B] text-xs md:text-lg font-semibold mt-0 md:mt-3 text-nowrap">
              Coin Worth at Launch
            </p>
          </div>
          <div className="bg-[#202020] rounded-full p-[8px]">
            <RiExchangeDollarLine size={28} color="white" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blocks;
