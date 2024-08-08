import  { useState } from 'react';
import OtpInput from 'react-otp-input';
import BgRotateImg from "../../assets/rotatebg.png";
import ExpiryOtpTimer from '../../components/ExpiryOtpTimer';

const Otp = () => {
    const [otp, setOtp] = useState('');
  return (
    <div className="bg-black flex justify-center relative w-full h-screen">
        <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-fill object-center opacity-30 "
      />
      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800  w-[36%] h-[65%] mt-36 flex flex-col items-center relative z-10">
        <p className="font-semibold text-3xl mb-8 text-center text-white pt-32" >Enter Code</p>

        <div className="flex justify-center mb-6">
        <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              borderRadius: "12px",
              padding: "4px",
              border: "1px solid white",
              width: "50px",
              height: "50px",
              margin: "0 4px",
              backgroundColor: "black",
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
          />
        </div>

        <p className="text-white px-52 font-semibold text-center text-lg mt-5">A one time authentication code has been 
        sent to E-mail</p>

        <button
        type="button"
        className="bg-white px-36 rounded-lg py-3 mt-8 text-lg font-bold">
            Verify
            </button>

            
            <div className="mt-8  flex flex-row  ">
            <p className="text-white text-xl mr-1">Expires in </p>
            <p className="text-white text-xl ml-2"><ExpiryOtpTimer /> </p>
            <p className="text-white text-xl mr-2">.</p>{" "}
            <p>
                <button
                type="button"
                className="text-[#FFB800] text-xl">Resend Code</button>
            </p>
            </div>
           
      
      </div>
    </div>
  )
}

export default Otp
