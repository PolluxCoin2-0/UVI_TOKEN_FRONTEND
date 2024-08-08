import ProgressBar from "../components/ProgressBar";
import EtherImg from "../assets/Ether.png";
import UsdtImg from "../assets/usdt.png";
import BnbImg from "../assets/bnb.png";
import CryptoImg from "../assets/Crypto.png";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useState } from "react";
import PaymentPage from "../pages/PaymentPage";
import BackgroundImg from "../assets/BGImage.png";

const BuyCoin = () => {
  // for showing buy coin page
  const [isShowModal, setIsShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [specialKey, setSpecialKey] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSpecialKeyChange = (event) => {
    setSpecialKey(event.target.value);
  };

  const handleShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <div className="bg-black  w-full h-full relative overflow-hidden px-12 pb-20">
      <img
        src={BackgroundImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30 "
      />

      <div className="relative z-10">
        <p className="text-3xl font-bold text-white flex justify-center mt-5">
          Buy Coins
        </p>

        <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-2xl mt-10 h-[20%]">
          <div className="pt-5">
            <ProgressBar />
          </div>

          <div className="flex flex-row justify-between p-5">
            <p className="text-white text-xl font-semibold">
              0.017 U sdt = 1BDAG
            </p>
            <p className="text-[#BABABA] text-xl font-semibold">
              Current Batch: 1
            </p>
            <p className="text-white text-xl font-semibold">
              Next Batch: 0.01254
            </p>
          </div>
        </div>

        <div className="bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-2xl mt-10 h-[20%]">
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
            <p className="text-[#BABABA] pt-2">
              <IoArrowForwardSharp size={32} />
            </p>
          </div>
        </div>

        {/* input field */}
        <div className="flex flex-row justify-between space-x-10 w-full mt-12">
          <div className="w-[50%]">
            <input
              id="amount"
              name="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter Amount"
              className="mt-1 py-5 w-full p-5 bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-2xl text-lg text-[#BABABA]"
            />
            <div className="ml-[750px] -mt-11 text-[#5F5F5F] ">Worth: 4502</div>
          </div>

          <div className="w-[50%]">
            <input
              id="specialKey"
              name="specialKey"
              type="text"
              value={specialKey}
              onChange={handleSpecialKeyChange}
              placeholder="Enter Special Key"
              className="mt-1 py-5 w-full p-5 bg-[#1B1B1B] border-[1px] border-white border-opacity-15 rounded-2xl text-lg text-[#BABABA]"
            />
             <div className="ml-[650px] -mt-11 text-[#5F5F5F] ">Do You Have Special Key</div>
          </div>
        </div>

        {/* button */}

        <div className="relative z-10 mt-12">
          <button
            type="button"
            className="w-full py-4 bg-[#DC9F01] rounded-xl text-3xl font-bold hover:bg-yellow-500"
            onClick={handleShowModal}
          >
            Buy Coin
          </button>
        </div>
        {isShowModal && (
          <PaymentPage
            isShowModal={isShowModal}
            handleShowModal={handleShowModal}
          />
        )}
      </div>
    </div>
  );
};

export default BuyCoin;
