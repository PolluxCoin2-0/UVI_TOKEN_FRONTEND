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

    // for md , xl, 2xl screen size : Navbar
    <div className="">
      <div className="bg-black hidden md:flex flex-row py-0 justify-between md:px-4 lg:px-4 xl:px-16 2xl:px-16
       border-b-[2px] border-gray-700">

        <Link to="/">
        <div className="flex flex-row items-center cursor-pointer">
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

   {/* for mobile view */}
   <div className="flex flex-row justify-between items-center md:hidden bg-black border-b-[2px] border-gray-700 px-4 py-3 relative z-40">
   <Link to="/">
       <div className="flex flex-row items-center cursor-pointer space-x-2">
           <img src={Uvilogo} alt="uvi-logo" className="w-8 h-8"/>
           <p className="text-white text-xl font-bold">UVI Token</p>
       </div>
   </Link>
   
   <IoMenu size={32} color="white" className="cursor-pointer" onClick={() => setIsMenuVisible(!isMenuVisible)} />

   {isMenuVisible && (
       <div className="absolute top-16 right-4 bg-gray-800 border-[1px] border-gray-600 rounded-lg shadow-2xl p-5 space-y-4 z-50 w-[60%]">
           <Link to="/blogs" className="block">
               <p className="text-white text-lg font-medium hover:text-[#FFB800] transition duration-200">Blogs</p>
           </Link>
           <Link to="/signup" className="block">
               <button
                   type="button"
                   className="rounded-md px-0 py-2 text-lg font-semibold hover:bg-gray-200 transition duration-200 text-white">
                   Sign Up
               </button>
           </Link>
           <Link to="/connectwallet" className="block">
               <p className="px-0 py-2 rounded-md font-bold cursor-pointer text-white transition duration-200 hover:bg-[#e6a700]">
                   {walletAddress.length > 0 ? truncateString(walletAddress) : "Connect Wallet"}
               </p>
           </Link>
           <Link to="/profile" className="block">
               <p className="text-white cursor-pointer hover:text-[#FFB800] transition duration-200">
                   <FaUser size={28} />
               </p>
           </Link>
       </div>
   )}
</div>



      
    </div>
  )
}

export default Navbar
