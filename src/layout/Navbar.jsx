import Uvilogo from "../assets/uvilogo.png";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import WalletIcon from "../assets/walleticon.png";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const walletAddress = useSelector((state)=>state.wallet.address);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
   {/* for mobile view */}
   <div className="md:hidden lg:hidden xl:hidden bg-black border-b-[2px] border-gray-700 px-4 py-3 relative z-40">
   <Link to="/">
       <div className="flex flex-row items-center cursor-pointer space-x-2">
           <img src={Uvilogo} alt="uvi-logo" className="w-8 h-8"/>
           <p className="text-white text-xl font-bold">UVI Token</p>
       </div>
   </Link>
</div>
    </div>
  )
}

export default Navbar
