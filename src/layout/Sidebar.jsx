import React, { useState } from "react";
import Uvilogo from "../assets/uvilogo.png";
import { TbArticle } from "react-icons/tb";
import { MdOutlineLeaderboard } from "react-icons/md";
import { SiSpringsecurity } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { GrCurrency } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setDataObject, setLogin, setWalletAddress } from "../redux/slice/walletslice";
import { postLogout } from "../utils/axios";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const isLogin = useSelector((state)=>state?.wallet?.login);
  const token = useSelector((state)=>state?.wallet?.dataObject?.token);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsSideNavOpen(false); // Close the sidebar on item click (for mobile)
  };

  const handleLogout = async()=>{
    if(isLogin){
     await postLogout(token)
      dispatch(setLogin(false));
      dispatch(setWalletAddress(""));
      dispatch(setDataObject({}));
      navigate("/connectwallet")
    } else{
      navigate("/signup")
    }
  }

  return (
    <>
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed right-0 top-2 z-50 order-10 block h-10 w-10 self-center rounded opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? "true" : "false"}
        aria-controls="nav-menu-1"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-[#F5B32A] transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-[#F5B32A] transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-[#F5B32A] transition-all duration-300"
          ></span>
        </div>
      </button>

      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className={`fixed top-14 lg:top-0 bottom-0 left-0 z-50 flex flex-col border-r border-r-slate-200 bg-black transition-transform lg:static lg:flex lg:w-1/4 xl:w-1/5 2xl:w-[15%] ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 sidebar`}
      >
        <a
          aria-label="Uvi Token logo"
          className="hidden lg:flex items-center gap-2 whitespace-nowrap p-6 text-xl text-white  
          font-medium focus:outline-none"
          href="/"
        >
          <img src={Uvilogo} alt="uvi-logo" className="" />
          Uvi Token
        </a>
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul className="flex pt-8 sm:pt-0 flex-1 flex-col gap-1 py-3">
              <li className="px-3">
                <Link
                  to="/blogs"
                  className={`flex items-center gap-3 rounded p-3 text-slate-100 transition-colors hover:bg-yellow-50 hover:text-yellow-500 focus:bg-yellow-500 focus:text-white`}
                  onClick={() => handleItemClick('blogs')}
                >
                  <div className="flex items-center self-center">
                    <TbArticle />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Blogs
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  to="/buycoin"
                  className={`flex items-center gap-3 rounded p-3 text-slate-100 transition-colors hover:bg-yellow-50 hover:text-yellow-500 focus:bg-yellow-500 focus:text-white`}
                  onClick={() => handleItemClick('buycoin')}
                >
                  <div className="flex items-center self-center ">
                  <GrCurrency />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Buy Coin
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  to="/leaderboard"
                  className={`flex items-center gap-3 rounded p-3 text-slate-100 transition-colors hover:bg-yellow-50 hover:text-yellow-500 focus:bg-yellow-500 focus:text-white`}
                  onClick={() => handleItemClick('leaderboard')}
                >
                  <div className="flex items-center self-center ">
                    <MdOutlineLeaderboard />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    LeaderBoard
                  </div>
                </Link>
              </li>
              <li className="px-3">
                <Link
                  to="/profile"
                  className={`flex items-center gap-3 rounded p-3 text-slate-100 transition-colors hover:bg-yellow-50 hover:text-yellow-500 focus:bg-yellow-500 focus:text-white`}
                  onClick={() => handleItemClick('profile')}
                >
                  <div className="flex items-center self-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                      aria-label="Dashboard icon"
                      role="graphics-symbol"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Profile
                  </div>
                </Link>
              </li>
              <li className="px-3" onClick={handleLogout}>
                <Link
                  className={`flex items-center gap-3 rounded p-3 text-slate-100 transition-colors hover:bg-yellow-50 hover:text-yellow-500 focus:bg-yellow-500 focus:text-white`}
                  onClick={() => handleItemClick('login')}
                >
                  <div className="flex items-center self-center ">
                    <SiSpringsecurity />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    {isLogin?"Signout":"Signup"}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
    </>
  );
}
