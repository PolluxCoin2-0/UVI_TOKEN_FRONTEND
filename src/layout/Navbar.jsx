import Uvilogo from "../assets/uvilogo.png";
import { FaUser } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            className="bg-white rounded-md px-3 py-1 text-lg font-semibold">SignUp
            </button>
          </Link>
           
        
            <p className="bg-[#FFB800] px-3 py-1 rounded-md"><MdOutlineAccountBalanceWallet size={28}/></p>
            
          
           

            <Link to="/profile">
            <p className="text-white"><FaUser  size={32}/></p>
            </Link>
          
        </div>
      </div>
    </div>
  )
}

export default Navbar
