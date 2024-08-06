import ProgressBar from "../components/ProgressBar"
import Navbar from "../layout/Navbar"
import EtherImg from "../assets/Ether.png";
import UsdtImg from "../assets/usdt.png";
import BnbImg from "../assets/bnb.png";
import CryptoImg from "../assets/Crypto.png";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useState } from "react";


const BuyCoin = () => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
   <div className="bg-black w-full h-full overflow-hidden pb-20">

{/* Navbar */} 
   <div><Navbar/></div>

   <div className="px-12">
    <p className="text-3xl font-bold text-white flex justify-center mt-5">Buy Coins</p>

    <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-2xl mt-10 h-[20%]">
     <div className="pt-5"> <ProgressBar /></div>

     <div className="flex flex-row justify-between p-5">
      <p className="text-white text-xl font-semibold">0.017 U sdt = 1BDAG</p>
      <p className="text-[#BABABA] text-xl font-semibold">Current Batch: 1</p>
      <p className="text-white text-xl font-semibold">Next Batch: 0.01254</p>
     </div>
    </div>

    <div  className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-2xl mt-10 h-[20%]">
  <div className="flex flex-row justify-between  p-10 w-full">
    <div className="bg-[#181717] border-[1px] border-white border-opacity-15 w-[32%] rounded-2xl flex flex-row justify-center items-center space-x-6 h-[130px]">
      <div>
        <img src={EtherImg} alt="ethereum-image" className="" />
      </div>
      <p className="text-white text-2xl font-bold">ETH</p>
    </div>


    <div className="bg-[#181717] border-[1px] border-white border-opacity-15 w-[32%] rounded-2xl flex flex-row justify-center items-center space-x-6 h-[130px]">
      <div>
        <img src={UsdtImg} alt="ethereum-image" className="" />
      </div>
      <p className="text-white text-2xl font-bold">USDT</p>
    </div>


    <div className="bg-[#181717] border-[1px] border-white border-opacity-15 w-[32%] rounded-2xl flex flex-row justify-center items-center space-x-6 h-[130px]">
      <div>
        <img src={BnbImg} alt="ethereum-image" className="" />
      </div>
      <p className="text-white text-2xl font-bold">BNB</p>
    </div>
  </div>

  <div className="flex flex-row justify-center space-x-4 items-center pb-10 pt-4">
    <p> 
      <img src={CryptoImg} alt="crypto-image" className="" />
    </p>
    <p className="text-[#BABABA] text-2xl">Other Cryptos</p>
    <p className="text-[#BABABA] pt-2"><IoArrowForwardSharp size={32}/></p>
  </div>
    </div>
   </div>

   {/* input field */}
   <div className="flex flex-row justify-between space-x-10 p-12 w-full">
    <div className="w-[50%]">
    <input
            id="name"
            name="name"
            type="number"
            value=""
            onChange={handleChange}
            placeholder="Enter Amount"
            className="mt-1 py-5 w-full p-5 bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-2xl text-lg text-[#BABABA]"
          />
    </div>

    <div className="w-[50%]">
    <input
            id="name"
            name="name"
            type="text"
            value=""
            onChange={handleChange}
            placeholder="Enter Special Key"
            className="mt-1 py-5 w-full p-5 bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-2xl text-lg text-[#BABABA]"
          />
    </div>
   </div>

   {/* button */}
   <div className="px-12">
   <button type="button" className="w-full py-4 bg-[#DC9F01] rounded-xl text-3xl font-bold ">Buy Coin</button>
   </div>
  
   </div>
  )
}

export default BuyCoin
