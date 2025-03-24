import Uvilogo from "../assets/uvilogo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="">
      {/* for mobile view */}
      <div className="md:hidden lg:hidden xl:hidden bg-black border-b-[2px] border-gray-700 px-4 py-3 relative z-40">
        <Link to="/"
         aria-label="link to logo" 
         title="link to logo"
        >
          <div className="flex flex-row items-center cursor-pointer space-x-2">
            <img src={Uvilogo} alt="uvi-logo" className="w-8 h-8" />
            <h1 className="text-white text-xl font-bold">UVI Token</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
