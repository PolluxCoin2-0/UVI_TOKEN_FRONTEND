import Navbar from "../layout/Navbar"
import { LuCopy } from "react-icons/lu";
import TransactionImg from "../assets/transaction.png";
import LogoutImg from "../assets/Logout.png";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div>
      {/* Navbar */} 
      <div>
        <Navbar />
     </div>

      {/* Profile */}
      <div className="bg-black w-full h-screen px-20 ">
      <p className="text-white text-xl font-semibold pt-10">Profile</p>

      <div className="bg-[#1B1B1B]  border-[1px] border-white border-opacity-15 h-auto rounded-md mt-5 pt-5">
        <div className="flex flex-row justify-between">
            <div className="pl-5">
                <p className="text-white text-lg font-bold">giichi@gmail.com</p>
                <p className=" text-sm text-[#8C8B8B] pt-1">Rank: 105</p>
            </div>

            <div className="flex flex-col items-end pr-5">
                <p className="text-[#FFC121]">Total Amount</p>
                <p className="text-white text-lg font-bold">$ 1,222,222.45</p>
            </div>
        </div>

        <div className=" bg-gradient-to-b from-[#FFBE2E]  to-[#5E440C] flex flex-row justify-between mt-10 rounded-b-md py-2 p-3">
            <p className="pt-0 text-white font-bold">https://sdjikjclsdjkcsl;vskdscvjdlksl</p>
            <p className="text-white pl-2" >  <LuCopy size={24} /></p>
        </div>
      </div>
      
      <div>

        <Link to="/transaction">
        <div className="flex flex-row space-x-5 mt-10">
        <p><img src={TransactionImg} alt="transaction-image" className="pt-1" /></p>
        <p className="text-white text-xl font-semibold ">My Transactions</p>
      </div>
        </Link>
    

      <div className="flex flex-row space-x-5 mt-5">
        <p><img src={LogoutImg} alt="transaction-image" className="pt-1" /></p>
        <p className="text-white text-xl font-semibold ">Logout</p>
      </div>
      </div>
    
      </div>
    </div>
  )
}

export default ProfilePage
