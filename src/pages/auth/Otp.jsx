import { useState } from "react";
import OtpInput from "react-otp-input";
import BgRotateImg from "../../assets/rotatebg.png";
import ExpiryOtpTimer from "../../components/ExpiryOtpTimer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [resendEnabled, setResendEnabled] = useState(false);

  const handleVerifyOtp = () => {
    if (otp.length === 4) {
      toast.success("OTP verified successfully!");
    } else {
      toast.error("Please enter a valid 4-digit OTP.");
    }
  };

  const handleResendOtp = () => {
    setResendEnabled(false);
    toast.success("OTP resent successfully!");
    setTimeout(() => setResendEnabled(true), 30000); // Enable resend after 30 seconds
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center relative px-4 md:px-6 lg:px-8">
      <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800 w-full max-w-md md:max-w-lg lg:max-w-xl p-8 relative z-10 mt-16 md:mt-0 flex flex-col items-center">
        <p className="font-semibold text-xl md:text-3xl mb-8 text-center text-white pt-10 lg:pt-20 xl:pt-14 2xl:pt-20">
          Enter Code
        </p>

        <div className="flex justify-center mb-6">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid white",
              width: "50px",
              height: "50px",
              margin: "0 8px",
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          />
        </div>

        <p className="text-white px-3 md:px-6 lg:px-12 font-semibold text-center text-lg mt-5">
          A one-time authentication code has been sent to your email.
        </p>

        <button
          type="button"
          onClick={handleVerifyOtp}
          className="bg-white px-10 md:px-16 lg:px-24 rounded-lg py-2 md:py-3 mt-8 text-md md:text-lg font-bold"
        >
          Verify
        </button>

        <div className="mt-8 flex flex-col md:flex-row items-center">
          <div className="flex flex-row items-center mb-4 md:mb-0">
            <p className="text-white text-lg md:text-xl mr-1">Expires in</p>
            <p className="text-white text-lg md:text-xl ml-2">
              <ExpiryOtpTimer />
            </p>
          </div>

          <button
            type="button"
            onClick={handleResendOtp}
            className={`text-[#FFB800] text-lg ml-2 md:text-xl ${!resendEnabled && "opacity-50 cursor-not-allowed"}`}
            disabled={!resendEnabled}
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
