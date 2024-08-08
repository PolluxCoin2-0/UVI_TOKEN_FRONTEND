import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/UvitokenLogo.png";
import BgRotateImg from "../../assets/rotatebg.png";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      toast.success("OTP Sent successfully!");
      // Proceed with the signup process
    } else {
      toast.error("Please enter a valid email address!");
    }
  };

  return (
    <div className="bg-black h-screen w-full flex justify-center">
      <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-fill object-center opacity-30"
      />

      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800 h-[70%] w-[40%] mt-36 relative z-10">
        {/* logo */}
        <div className="flex justify-center">
          <img src={logo} alt="uvi-token-logo" className="pt-3" />
        </div>

        {/* blurr */}
        <div className="border-b-[2px] border-white mx-56 blur-md"></div>

        <div className="flex flex-col justify-center px-60 text-center text-lg mt-10">
          <p className="text-white">
            Your gateway to the most advanced layer 1 Blockchain
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="border-[1px] rounded-3xl border-white px-20 py-3 text-white text-lg font-semibold bg-black mt-10"
                value={email}
                onChange={handleEmailChange}
              />
              
            </div>
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}

           <div className="text-white ml-72 -mt-9 cursor-pointer"
           onClick={handleSubmit}><FaArrowAltCircleRight size={20}/></div>
          </form>

          <div className="flex flex-row space-x-3 mt-10 ml-2">
            <p className="text-white">Already have an account?</p>

            <Link to="/connectwallet">
              <button type="button" className="text-yellow-500 text-lg font-semibold">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
