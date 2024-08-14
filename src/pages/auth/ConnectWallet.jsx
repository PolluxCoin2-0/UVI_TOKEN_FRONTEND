import WalletImg from "../../assets/wallet.png";
import { useDispatch, useSelector } from "react-redux";
import { setWalletAddress } from "../../redux/slice/walletslice";
import { toast } from "react-toastify";
import BgRotateImg from "../../assets/rotatebg.png";

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.wallet.address);

  // connect wallet function
  async function getPolinkweb() {
    if (walletAddress) {
      return toast.error("Wallet is already connected");
    }

    var obj = setInterval(async () => {
      if (window.pox) {
        clearInterval(obj);
        const detailsData = JSON.stringify(await window.pox.getDetails());
        const parsedDetailsObject = JSON.parse(detailsData);
        console.log(parsedDetailsObject);
        dispatch(setWalletAddress(parsedDetailsObject[1].data?.wallet_address));
      }
    }, 1000);
  }

  return (
    <div className="bg-black  flex justify-center w-full h-screen px-6 md:px-0">
      <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-fill object-center opacity-30 "
      />
      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800 w-full md:w-[60%] lg:w-[50%] xl:w-[40%] h-[50%] md:h-[50%] mt-56 flex flex-col items-center relative z-10">
        {/* connect wallet image */}
        <div>
          <img src={WalletImg} className="mt-14 md:mt-24  w-24 md:w-36" />
        </div>

        <p className="text-xl md:text-3xl font-bold text-[#FFBE2E] mt-5 ">Wallet</p>
        <button
          type="button"
          className="bg-white px-10 md:px-20 py-2 md:py-3 rounded-lg text-black text-lg font-bold mt-10"
          onClick={getPolinkweb}
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default ConnectWallet;
