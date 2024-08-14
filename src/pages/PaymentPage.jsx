import { RxCross2 } from "react-icons/rx";
import UsdtImg from "../assets/usdt.png";
import { LuCopy } from "react-icons/lu";
import Timer from "../components/Timer";
import { toast } from "react-toastify";
import { BsQrCode } from "react-icons/bs";

const PaymentPage = ({ isShowModal, handleShowModal }) => {
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCopy = () => {
    // navigator.clipboard.writeText(issueTime);
    toast.success(" copied!");
  };
  return (
    isShowModal && (
      <div className="fixed z-10 backdrop-blur-[1px] bg-black bg-opacity-30 min-h-screen w-full inset-0 ">
        <div className="items-center flex justify-center w-full h-full">
          <div className=" bg-[#1B1B1B] w-full md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] h-full 2xl:h-auto  md:h-[90%] rounded-xl p-3 md:p-5 md:mt-6 mx-4 py-16 overflow-y-scroll md:overflow-y-hidden">
            <div className="flex justify-end">
              <p
                className="text-white cursor-pointer"
                onClick={handleShowModal}
              >
                <RxCross2 size={24} />
              </p>
            </div>

            <p className="flex justify-center text-white text-lg">
              Buy With Other Crypto
            </p>

            <div className="mt-5 border-b-[1px] border-white border-opacity-15 pb-3">
              <p className="text-white text-center text-sm">
                Your Order Has Been Places Successfuly
              </p>
              <p className="text-white text-center text-xl font-bold pt-1">
                Order No : <span className="text-[#F6B63E]">1454524</span>
              </p>
              <p className="text-[#767676] text-center text-xs pt-1">
                Save This Order No, in case of a problem yu can contact us with
                this.
              </p>
              <div className="flex flex-col items-center md:flex-row justify-center space-x-2 mt-2">
                <p className="text-white text-center ">Plz Send </p>
                <p className="text-white font-bold ">200.020002102 USDRTRC20</p>
                <p>
                  <img src={UsdtImg} alt="image" className="h-[20px] " />
                </p>
              </div>

              <p className="text-white text-center text-sm pt-1">
                to the address below.
              </p>
              <p className="text-white text-center font-semibold pt-1">
                Uvi Token Worth: 11.45K
              </p>
            </div>

            <div className="flex flex-col justify-center items-center md:flex-row  w-full mt-4">
              <div className=" w-[60%] md:w-[30%] h-[150px] text-white bg-white rounded-lg  ">
                <p className=" text-black flex justify-center pt-5">
                  {" "}
                  <BsQrCode size={110} />
                </p>
              </div>

              <div className=" w-full md:w-[70%] ml-0 md:ml-8 ">
                <p className="text-white font-semibold text-lg mt-4 md:mt-0">
                  Scan The Address
                </p>
                <p className="text-[#767676] md:leading-6 text-justify break-words">
                  This Wallet address is valid for a single transaction. Please
                  do not reuse. Coin balance will appear in your account only
                  after your transaction gets approved.
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div>
                <p className="text-white">Address</p>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value=""
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className="mt-1 py-2 w-full p-3 bg-[#181717] border-[1px] border-white border-opacity-15 rounded-lg text-sm text-white"
                />
                <div
                  className="flex justify-end -mt-6 mr-3 text-white"
                  onClick={() => handleCopy}
                >
                  <LuCopy />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-white">Payment Amount</p>
                <input
                  id="name"
                  name="name"
                  type="number"
                  value=""
                  onChange={handleChange}
                  placeholder="200.52544"
                  className="mt-1 py-2  w-full p-3 bg-[#181717] border-[1px] border-white border-opacity-15 rounded-lg text-sm text-white"
                />
                <div className="flex justify-end -mt-6 mr-3 text-white">
                  <LuCopy />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-6 w-full space-y-4 md:space-y-0 mt-8">
              <div className="bg-[#181717] border-[1px] border-white border-opacity-15 rounded-lg  p-3 w-full md:w-[50%]">
                <p className="text-center text-white">Payment Status</p>
                <p className="text-center text-[#FF8080]">Waiting</p>
              </div>

              <div className="bg-[#181717] border-[1px] border-white border-opacity-15 rounded-lg p-3 w-full md:w-[50%]">
                <p className="text-center text-white">Expiring Time</p>
                <p className="text-center text-lg text-[#F6B63E]">
                  <Timer />
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                className="bg-[#181717] border-[1px] border-white border-opacity-15 rounded-lg p-2 lg:p-3 w-full text-white text-md md:text-lg font-semibold"
              >
                Change Currency
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PaymentPage;
