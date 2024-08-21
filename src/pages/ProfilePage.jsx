import { LuCopy } from "react-icons/lu";
import TransactionImg from "../assets/transaction.png";
import LogoutImg from "../assets/Logout.png";
import { Link, useNavigate } from "react-router-dom";
import BackgroundImg from "../assets/BGImage.png";
import { useDispatch, useSelector } from "react-redux";
import { setDataObject, setLogin, setWalletAddress } from "../redux/slice/walletslice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { postUserAmount } from "../utils/axios";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state)=>state?.wallet?.login);
  const userData = useSelector((state)=>state?.wallet);
  const [userAmount, setUserAmount] = useState(0);

     useEffect(()=>{
    if (!isLogin) {
      navigate("/connectwallet")
      toast.info("You are not login")
    }
    const fetchData = async()=>{
      const apiData = await postUserAmount(userData?.address);
      setUserAmount(apiData?.data);
    }
    fetchData();
   },[])

   const handleCopy = (copiedText)=>{
    navigator.clipboard.writeText(copiedText);
    toast.success("Address copied")
   }

   const handleLogout = ()=>{
    dispatch(setLogin(false));
    dispatch(setWalletAddress(""));
    dispatch(setDataObject({}));
    navigate("/connectwallet")
  }

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

          <div className="bg-[#1B1B1B]  border-[1px] border-white border-opacity-15 w-full h-auto rounded-md mt-5 pt-5">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="pl-5">
                <p className="text-white text-lg font-bold">{userData && userData?.dataObject?.email}</p>
                <p className=" text-sm text-[#8C8B8B] pt-1">Rank: 105</p>
              </div>

              <div className="flex flex-col items-start md:items-end pl-5 md:pl-0 pr-5 mt-8 md:mt-0">
                <p className="text-[#FFC121]">Total Amount</p>
                <p className="text-white text-lg font-bold">$ {userAmount && userAmount}</p>
              </div>
            </div>

            <div className=" bg-gradient-to-b from-[#FFBE2E]  to-[#5E440C] flex flex-row justify-between mt-10 rounded-b-md py-2 p-3">
              <p className="pt-0 text-white text-sm md:text-md font-bold">
              {userData && userData?.address}
              </p>
              <p className="text-white pl-2" onClick={()=>handleCopy(userData?.address)}>
                {" "}
                <LuCopy size={24} />
              </p>
            </div>
          </div>

          <div>
            <Link to="/transaction">
              <div className="flex flex-row space-x-5 mt-10 ml-1 md:ml-0 max-w-fit">
                <p>
                  <img
                    src={TransactionImg}
                    alt="transaction-image"
                    className="pt-1 w-5 md:w-full"
                  />
                </p>
                <p className="text-white text-lg md:text-xl font-semibold ">
                  My Transactions
                </p>
              </div>
            </Link>

            <div className="flex flex-row space-x-5 mt-5 ml-1 md:ml-0 cursor-pointer max-w-fit" onClick={handleLogout}>
              <p>
                <img
                  src={LogoutImg}
                  alt="transaction-image"
                  className="pt-1 w-4 md:w-full"
                />
              </p>
              <p className="text-white text-lg md:text-xl font-semibold ">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
