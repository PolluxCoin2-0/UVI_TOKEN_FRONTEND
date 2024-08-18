import { useState } from "react";
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
    <div className="bg-black h-screen w-full flex justify-center px-6 md:px-0 pb-1">
      <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-fill object-center opacity-30"
      />

      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800 h-[60%] lg:h-[70%] xl:h-[65%] 2xl:h-[70%] w-full md:w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] mt-36 relative z-10 ">
        {/* logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="uvi-token-logo"
            className="pt-3 w-32 md:w-50 lg:w-60 xl:w-52 2xl:w-[40%] "
          />
        </div>

        {/* blurr */}
        <div className="border-b-[2px] border-white mx-12 md:mx-56 blur-md"></div>

        <div className="flex flex-col justify-center px-16 md:px-44 lg:px-44 xl:px-56 2xl:px-64 text-center text-lg mt-10">
          <p className="text-white">
            Your gateway to the most advanced layer 1 Blockchain
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="border-[1px] rounded-3xl border-white px-4 md:px-24 lg:px-20 xl:px-28 py-2 md:py-3 text-white text-lg font-semibold bg-black mt-10"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}

            <div
              className="text-white ml-52 md:ml-72 -mt-9 cursor-pointer pt-1"
              onClick={handleSubmit}
            >
              <FaArrowAltCircleRight size={20} />
            </div>
          </form>

          <div className="flex flex-col xl:flex-row space-x-3 mt-12 md:mt-10 ml-2 ">
            <p className="text-white xl:whitespace-nowrap">
              Already have an account?
            </p>

            <Link to="/connectwallet">
              <button
                type="button"
                className="text-yellow-500 text-lg font-semibold pr-4 md:pr-0"
              >
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
