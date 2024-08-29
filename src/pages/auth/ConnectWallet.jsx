import WalletImg from "../../assets/wallet.png";
import { useDispatch, useSelector } from "react-redux";
import { setDataObject, setLogin, setWalletAddress } from "../../redux/slice/walletslice";
import { toast } from "react-toastify";
import BgRotateImg from "../../assets/rotatebg.png";
import { postLogin } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        const apiData = await postLogin(parsedDetailsObject[1].data?.wallet_address);
        
        if(apiData?.data?._id){
          dispatch(setWalletAddress(parsedDetailsObject[1].data?.wallet_address));
          dispatch(setLogin(true));
          toast.success("User logged in Success");
          dispatch(setDataObject(apiData?.data))
          navigate("/verifyreferral");
        }
      }
    }, 1000);
  }

  return (
    <div className="bg-black min-h-screen w-full flex justify-center items-center relative overflow-hidden py-4">
      <img
        src={BgRotateImg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="bg-black rounded-2xl shadow-custom shadow-gray-800 w-full max-w-md md:max-w-lg lg:max-w-xl p-8 relative z-10 mt-16 md:mt-0 mx-4 md:mx-0 flex flex-col items-center">
        {/* connect wallet image */}
        <div>
          <img src={WalletImg} className="mt-14 md:mt-24 w-20 md:w-36" />
        </div>

        <p className="text-xl md:text-3xl font-bold text-[#FFBE2E] mt-5">
          Wallet
        </p>
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
