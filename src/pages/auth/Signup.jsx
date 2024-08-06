import logo from "../../assets/UvitokenLogo.png";

const Signup = () => {
  return (
    <div className="bg-black h-screen w-full flex justify-center pt-8">
      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800  h-[70%] w-[40%] mt-24">

        {/* logo */}
        <div className="flex justify-center">
          <img src={logo} alt="uvi-token-logo" className=" pt-3" />
        </div>

        {/* blurr */}
        <div className="border-b-[2px] border-white mx-56 blur-md "></div>
        

        <div className="flex flex-col justify-center px-60 text-center text-lg mt-16">
          <p className="text-white">
            Your gateway to the most advanced layer 1 Blockchain
          </p>

          <div className="flex justify-center ">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="border-[1px] rounded-3xl border-white px-20 py-3 text-white text-lg font-semibold bg-black mt-10 text-center "
            />
          </div>

          <div className="flex flex-row space-x-3 mt-6 ml-2">
            <p className="text-white">Already have an account?</p>
            <button type="button" className=" text-yellow-500 text-lg font-semibold">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
