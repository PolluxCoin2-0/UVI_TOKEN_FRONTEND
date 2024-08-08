import Uvilogo from "../assets/uvilogo.png";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WalletIcon from "../assets/walleticon.png";

const Navbar = () => {
  const walletAddress = useSelector((state)=>state.wallet.address);

  // shorten string function
  function truncateString(str, startChars = 6, endChars = 6, separator = '...') {
    if (str.length <= startChars + endChars) {
      return str;
    }
  
    const start = str.substring(0, startChars);
    const end = str.substring(str.length - endChars);
  
    return `${start}${separator}${end}`;
  }
  return (
    <div className="">
      <div className="bg-black py-0 flex flex-row justify-between px-16 border-b-[2px] border-gray-700">

        <Link to="/">
        <div className="flex flex-row items-center">
            <img src={Uvilogo} alt="uvi-logo" className=""/>
            <p className="text-white text-xl font-bold">UVI Token</p>
        </div>
        </Link>
       

        <div className="flex flex-row items-center space-x-8">
          <Link to="/blogs">
          <p className="text-white text-lg font-semibold">Blogs</p>
          </Link>
          
          <Link to="/signup">
          <button
            type="button"
            className="bg-white rounded-md px-3 py-2 text-lg font-bold">SignUp
            </button>
          </Link>
           
            <Link to="/connectwallet">
            <p className="bg-[#FFB800] px-3 py-2 rounded-md font-bold cursor-pointer">
              {walletAddress.length>0 ? truncateString(walletAddress) : <img src={WalletIcon} alt="" className="" />}
            </p>
            </Link>
           
            
          
           

            <Link to="/profile">
            <p className="text-white cursor-pointer"><FaUser  size={32}/></p>
            </Link>
          
        </div>
      </div>
    </div>
  )
}

export default Navbar
