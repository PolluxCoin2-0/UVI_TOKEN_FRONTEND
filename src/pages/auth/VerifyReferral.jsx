import { useSelector } from "react-redux";
import BgRotateImg from "../../assets/rotatebg.png";
import { postVerifyReferral } from "../../utils/axios";
import LogoImg from "../../assets/UvitokenLogo.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyReferral = () => {
  const walletAddressBySignup = useSelector(
    (state) => state?.wallet?.dataObject?.walletAddress
  );
  const token = useSelector((state) => state?.wallet?.dataObject?.token);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const verifyReferralfunc = async () => {
    const referralApi = await postVerifyReferral(
      token,
      walletAddressBySignup,
      value
    );
    
    if (referralApi?.data?.trx1) {
      // Sign tranaction and broadcast transaction for trx1
      const signedTransaction1 = await window.pox.signdata(
        referralApi?.data?.trx1?.transaction
      );

       JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction1[1]))
      );

      // Sign tranaction and broadcast transaction for trx2
      const signedTransaction2 = await window.pox.signdata(
        referralApi?.data?.trx2?.transaction
      );

      
       JSON.stringify(
        await window.pox.broadcast(JSON.parse(signedTransaction2[1]))
      );

      toast.success("Wallet address verified!");
      navigate("/connectwallet");
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
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
            value={value}
            onChange={handleChange}
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
