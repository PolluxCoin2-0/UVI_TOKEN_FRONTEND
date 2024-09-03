import { LuCopy } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImg from "../assets/BGImage.png";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { postUserAmount } from "../utils/axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state?.wallet?.login);
  const userData = useSelector((state) => state?.wallet);
  const isReferralVerified = useSelector((state) => state?.wallet?.dataObject?.isReferralVerify);
  const [userAmount, setUserAmount] = useState(0);

  useEffect(() => {
    if (!isLogin) {
      navigate("/connectwallet", { replace: true });
      toast.info("You are not logged in");
    }
    const fetchData = async () => {
      const apiData = await postUserAmount(userData?.address);
      setUserAmount(apiData?.data);
    };
    fetchData();
  }, []);

  const handleCopy = (copiedText) => {
    navigator.clipboard.writeText(copiedText);
    toast.success("Address copied");
  };

  const handleGenerateReferralLink = () => {
    const referralLink = `https://uvitoken.netlify.app/referral/${userData?.address}`;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied");
  };

  return (
    <div>
      {/* Profile */}
      <div className="bg-black w-full h-screen  xl:px-20 relative">
        <img
          src={BackgroundImg}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 "
        />

        <div className="px-4 md:px-12 relative z-10">
          <p className="text-white text-xl font-semibold pt-10 ">Profile</p>

          <div className="bg-[#1B1B1B]  border-[1px] border-white border-opacity-15 w-full h-auto rounded-3xl mt-5 pt-5">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="pl-5">
                <p className="text-white text-lg font-bold">
                  {userData && userData?.dataObject?.email}
                </p>
                <p className=" text-sm text-[#8C8B8B] pt-1">Rank: 105</p>
              </div>

              <div className="flex flex-col items-start md:items-end pl-5 md:pl-0 pr-5 mt-8 md:mt-0">
                <p className="text-[#FFC121]">Total Amount</p>
                <p className="text-white text-lg font-bold">
                  $ {userAmount && userAmount}
                </p>
              </div>
            </div>

            <div className=" flex flex-row justify-between mt-10 rounded-b-md py-2 p-3">
              <p className="pt-0 text-white text-sm md:text-md font-bold">
                Generate your referral link
              </p>
              <p
                className="text-white pl-2 cursor-pointer"
                onClick={handleGenerateReferralLink}
              >
                {" "}
                <LuCopy size={24} />
              </p>
            </div>

            <div className="flex flex-row justify-between  py-2 p-3">
              <p className="pt-0 text-white text-sm md:text-md"><span className="font-bold">Referral Code Status: </span>{userData && userData?.dataObject?.referredBy}</p>


             <Link to={isReferralVerified ? "" : "/verifyreferral"}>  
             <button type="" className=" bg-gradient-to-b from-[#FFBE2E]  to-[#5E440C]  text-white cursor-pointer px-5 py-1 rounded-md text-md font-semibold ">
             {isReferralVerified ? "Verified": "Verify"}
              </button>
              </Link>
            </div>

            <div className=" bg-gradient-to-b from-[#FFBE2E]  to-[#5E440C] flex flex-row justify-between rounded-b-3xl py-5 p-3">
              <p className="pt-0 text-white text-sm md:text-md ">
              <span className="font-bold">Wallet Address: </span>{userData && userData?.address}
              </p>
              <p
                className="text-white pl-2 cursor-pointer"
                onClick={() => handleCopy(userData?.address)}
              >
                {" "}
                <LuCopy size={24} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
