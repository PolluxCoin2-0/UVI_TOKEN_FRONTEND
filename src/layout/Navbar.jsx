import Uvilogo from "../assets/uvilogo.png";
import { FaUser } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const Navbar = () => {
  return (
    <div className="">
      <div className="bg-black py-0 flex flex-row justify-between px-16 border-b-[2px] border-gray-700">

   
        <div className="flex flex-row items-center">
            <img src={Uvilogo} alt="uvi-logo" className=""/>
            <p className="text-white text-xl font-bold">UVI Token</p>
        </div>

        <div className="flex flex-row items-center space-x-8">
            <p className="text-white text-lg font-semibold">Blogs</p>
            <button
            type="button"
            className="bg-white rounded-md px-3 py-1 text-lg font-semibold">SignUp</button>
            
            <p className="bg-[#FFB800] px-3 py-1 rounded-md"><MdOutlineAccountBalanceWallet size={28}/></p>
            <p className="text-white"><FaUser  size={32}/></p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
