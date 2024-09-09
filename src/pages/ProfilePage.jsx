import { LuCopy } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getAllReferrals, postUserAmount } from "../utils/axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state?.wallet?.login);
  const userData = useSelector((state) => state?.wallet);
  const isReferralVerified = useSelector(
    (state) => state?.wallet?.dataObject?.isReferralVerify
  );
  const referralAmount = useSelector((state)=>state?.wallet?.dataObject?.referralAmount)
  const referralAddress = useSelector((state)=>state?.wallet?.dataObject?.referredBy)
  const [userAmount, setUserAmount] = useState(0);
  const [referralData, setReferralData] = useState({});

  useEffect(() => {
    if (!isLogin) {
      navigate("/connectwallet", { replace: true });
      toast.info("You are not logged in");
    }
    const fetchData = async () => {
      const apiData = await postUserAmount(userData?.address);
      setUserAmount(apiData?.data);
      const referralData = await getAllReferrals(userData?.address)
      setReferralData(referralData?.data);
    };
    fetchData();
  }, []);

  console.log(referralData);

  const handleCopy = (copiedText) => {
    navigator.clipboard.writeText(copiedText);
    toast.success("Address copied");
  };

  const handleGenerateReferralLink = () => {
    const referralLink = `https://uvitokendev.netlify.app/referral/${userData?.address}`;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied");
  };

  return (
    <div>
      {/* Profile */}
      <div className="bg-[#0E0E0E] w-full h-screen  xl:px-20 relative">
        <div className="px-4 md:px-12 relative z-10">
          <p className="text-white text-xl font-semibold pt-10 ">Profile</p>

          <div className="bg-[#141414] bg-opacity-5 w-full h-auto rounded-3xl mt-5 pt-5"
           style={{
            boxShadow: '0 2px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)',
          }}>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="pl-5">
                <p className="text-white text-lg font-bold">
                  {userData && userData?.dataObject?.email}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end pl-5 md:pl-0 pr-5 mt-8 md:mt-0">
                <p className="text-[#FFC121]">Total Amount</p>
                <p className="text-white text-lg font-bold">
                  $ {userAmount && userAmount}
                </p>
              </div>
            </div>
            
            <div className="flex flex-row justify-between items-center px-4 py-4">
              <p className="text-white font-bold text-lg">Signup Bonus:</p>
              <p className="text-white text-lg font-bold">${referralAmount}</p>
            </div>

            {userData?.dataObject?.referredBy && (
              <div className="flex flex-row justify-between  py-2 p-3">
                <p className="pt-0 text-white text-sm md:text-md">
                  <span className="font-bold">Referral Code Status: </span>
                </p>

                <Link to={isReferralVerified ? "" : "/verifyreferral"}>
                  <button
                    type=""
                    className=" bg-gradient-to-b from-[#FFBE2E]  to-[#5E440C]  text-white cursor-pointer px-5 py-1 rounded-md text-md font-semibold "
                  >
                    {isReferralVerified ? "Verified" : "Verify"}
                  </button>
                </Link>
              </div>
            )}

            <div className=" bg-gradient-to-b from-[#FFBE2E]  to-[#5E440C] flex flex-row justify-between rounded-b-3xl py-4 p-3 ">
              <p className="pt-0 text-white text-sm md:text-md ">
                <span className="text-lg  font-bold">Wallet Address: </span>
                {userData && userData?.address}
              </p>
              <p
                className="text-white text-lg  pl-2 cursor-pointer"
                onClick={() => handleCopy(userData?.address)}
              >
                {" "}
                <LuCopy size={24} />
              </p>
            </div>
          </div>

           {/* Your Referral Section */}
          <div className="bg-[#141414] bg-opacity-5  shadow-inner shadow-gray-600 w-full h-auto rounded-3xl mt-10  p-5 "
             style={{
              boxShadow: '0 2px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)',
            }}>

          <p className="text-white text-xl font-semibold">Your Referral </p>
           <div className=" flex flex-row justify-between mt-10 rounded-xl py-3 p-3 bg-[#151515] shadow-2xl">
     
              <p className="pt-0  text-[#6A6A6A] text-sm md:text-md font-bold ">
                {`https://uvitokendev.netlify.app/referral/${userData?.address}`}
              </p>
              <p
                className="text-white pl-2 cursor-pointer"
                onClick={handleGenerateReferralLink}
              >
                {" "}
                <LuCopy size={24} />
              </p>
            </div>

            <div className=" w-full pt-10">
              <div className="w-full flex flex-row justify-between items-center pb-2">
                <p className="text-white text-xl font-semibold">
                  Referral Address
                </p>

                <div className="pt-2">
                <p className="text-white text-xl font-semibold ">
                  Referral Amount
                </p>
                 
                </div>
              </div>

              <div className="w-full flex flex-row justify-between items-center space-x-8">
              <p className="w-[50%] bg-[#151515] rounded-xl py-4 p-4 text-[#6A6A6A] text-md font-semibold shadow-2xl">
                    {referralAddress ? referralAddress : "No Referral Address"}
                  </p>
                <div className=" w-[50%]">
                  <p className=" bg-[#151515] rounded-xl py-4 p-4 text-[#6A6A6A] shadow-2xl text-md font-semibold ">
                    {referralData?.leve2Reward && (referralData?.leve1Reward + referralData?.leve2Reward)}
                  </p>
                </div>
              </div>
            </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
