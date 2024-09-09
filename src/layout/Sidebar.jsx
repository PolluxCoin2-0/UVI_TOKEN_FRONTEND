import { useState, useEffect } from "react";
import Uvilogo from "../assets/uvilogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDataObject, setLogin, setWalletAddress } from "../redux/slice/walletslice";
import { postLogout } from "../utils/axios";
import DashboardImg from "../assets/Dashboard.png";
import BuyImg from "../assets/Buy.png";
import BlogsImg from "../assets/Blogs.png";
import ROIImg from "../assets/ROI.png";
import LeaderboardImg from "../assets/Leaderboard.png";
import TransactionImg from "../assets/Transaction2.png";
import ProfileImg from "../assets/Profile.png";
import LogoutImg from "../assets/Logout2.png";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(location.pathname); // Set based on current path
  const isLogin = useSelector((state) => state?.wallet?.login);
  const token = useSelector((state) => state?.wallet?.dataObject?.token);

  useEffect(() => {
    setSelectedItem(location.pathname); // Update selected item when path changes
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsSideNavOpen(false); // Close the sidebar on item click (for mobile)
  };

  const handleLogout = async () => {
    if (isLogin) {
      await postLogout(token);
      dispatch(setLogin(false));
      dispatch(setWalletAddress(""));
      dispatch(setDataObject({}));
      navigate("/connectwallet");
    } else {
      navigate("/signup");
    }
  };

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
        className={`fixed top-14 lg:top-0 bottom-0 left-0 z-50 flex flex-col bg-[#151515] transition-transform lg:static lg:flex lg:w-1/4 xl:w-1/5 2xl:w-[15%] ${
          isSideNavOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 sidebar lg:relative`}
      >

<style>
    {`
      #nav-menu-1::after {
        content: '';
        position: absolute;
        right: 0px; /* Adjusts how far the arrow extends */
        width: 0;
        height: 0;
        border-top: 20px solid transparent; /* Creates the arrow effect */
        border-bottom: 20px solid transparent;
        border-right: 12px solid #000000; 
        top: ${
          selectedItem === "/"
            ? "125px"
            : selectedItem === "/buycoin"
            ? "182px"
            : selectedItem === "/roi-calculator"
            ? "224px"
            : selectedItem === "/blogs" || selectedItem.startsWith("/blogdetail") 
            ? "306px"
            : selectedItem === "/leaderboard"
            ? "362px"
            : selectedItem === "/transaction"
            ? "422px"
            : selectedItem === "/profile"
            ? "485px"
            : "464px"
        };
        transition: top 0.5s ease-in-out; /* Smooth transition for arrow movement */
      }
    `}
  </style>

        <a
          aria-label="Uvi Token logo"
          className="hidden lg:flex items-center gap-2 whitespace-nowrap p-6 text-xl text-white font-medium focus:outline-none"
          href="/"
        >
          <img src={Uvilogo} alt="uvi-logo" className="" />
          Uvi Token
        </a>
        <nav 
          aria-label="side navigation"
          className={`flex-1 divide-y divide-slate-100 overflow-auto`}
        >
          <div>
            <ul className="flex pt-8 sm:pt-0 flex-1 flex-col gap-1 py-3">
              <li className="px-6">
                <Link
                  to="/"
                  className={`flex items-center gap-3 rounded-xl p-3 transition-colors animate-slide-in-stair sidebar-item-1 ${
                    selectedItem === "/" ? "bg-[#F3BB1C] text-black font-semibold " : "text-slate-100 hover:bg-yellow-50 hover:text-yellow-500"
                  }`}
                  onClick={() => handleItemClick("/")}
                >
                  <div className="flex items-center self-center">
                    <img src={DashboardImg} alt="dashboard-image" className="text-white" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-md font-semibold">
                    Dashboard
                  </div>
                </Link>
              </li>

              <li className="px-6">
                <Link
                  // to="/buycoin"
                  className={`flex items-center gap-3 rounded-xl p-3 transition-colors animate-slide-in-stair sidebar-item-2 ${
                    selectedItem === "/buycoin" ? "bg-[#F3BB1C] text-black font-semibold" : "text-slate-100 hover:bg-yellow-50 hover:text-yellow-500"
                  }`}
                  onClick={() => handleItemClick("/buycoin")}
                >
                  <div className="flex items-center self-center ">
                    <img src={BuyImg} alt="buy-image" className="" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-md font-semibold">
                    Buy Coin
                  </div>
                </Link>
              </li>

              <li className="px-6">
                <Link
                  // to=""
                  className={`flex items-center gap-3 rounded-xl p-3 transition-colors animate-slide-in-stair sidebar-item-3 ${
                    selectedItem === "/roi-calculator" ? "bg-[#F3BB1C] text-black font-semibold" : "text-slate-100 hover:bg-yellow-50 hover:text-yellow-500"
                  }`}
                  onClick={() => handleItemClick("/roi-calculator")}
                >
                  <div className="flex items-center self-center ">
                    <img src={ROIImg} alt="ROI-image" className="" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-md font-semibold">
                    ROI Calculator
                  </div>
                </Link>
              </li>

              <li className="px-6">
                <Link
                  to="/blogs"
                  className={`flex items-center gap-3 rounded-xl p-3 transition-colors animate-slide-in-stair sidebar-item-4 ${
                    selectedItem === "/blogs" || selectedItem.startsWith("/blogdetail")  ? "bg-[#F3BB1C] text-black font-semibold" : "text-slate-100 hover:bg-yellow-50 hover:text-yellow-500"
                  }`}
                  onClick={() => handleItemClick("/blogs")}
                >
                  <div className="flex items-center self-center">
                    <img src={BlogsImg} alt="blogs-image" className="" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-md font-semibold pl-1">
                    Blogs
                  </div>
                </Link>
              </li>

              <li className="px-6">
                <Link
                  to="/leaderboard"
                  className={`flex items-center gap-3 rounded-xl p-3 transition-colors animate-slide-in-stair sidebar-item-5 ${
                    selectedItem === "/leaderboard" ? "bg-[#F3BB1C] text-black font-semibold" : "text-slate-100 hover:bg-yellow-50 hover:text-yellow-500"
                  }`}
                  onClick={() => handleItemClick("/leaderboard")}
                >
                  <div className="flex items-center self-center ">
                    <img src={LeaderboardImg} alt="Leaderboard-image" className="" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-md font-semibold ">
                    LeaderBoard
                  </div>
                </Link>
              </li>

              <li className="px-6">
                <Link
                  to="/transaction"
                  className={`flex items-center gap-3 rounded-xl p-3 transition-colors animate-slide-in-stair sidebar-item-6 ${
                    selectedItem === "/transaction" ? "bg-[#F3BB1C] text-black font-semibold" : "text-slate-100 hover:bg-yellow-50 hover:text-yellow-500"
                  }`}
                  onClick={() => handleItemClick("/transaction")}
                >
                  <div className="flex items-center self-center ">
                    <img src={TransactionImg} alt="transaction-image" className="" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-md font-semibold">
                    Transaction
                  </div>
                </Link>
              </li>

              <li className="px-6">
                <Link
                  to="/profile"
                  className={`flex items-center gap-3 rounded-xl p-3 transition-colors animate-slide-in-stair sidebar-item-7 ${
                    selectedItem === "/profile" ? "bg-[#F3BB1C] text-black font-semibold" : "text-slate-100 hover:bg-yellow-50 hover:text-yellow-500"
                  }`}
                  onClick={() => handleItemClick("/profile")}
                >
                  <div className="flex items-center self-center ">
                    <img src={ProfileImg} alt="profile-image" className="" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-md font-semibold">
                    Profile
                  </div>
                </Link>
              </li>

              <li className="px-6" onClick={handleLogout}>
                <Link
                  className={`flex items-center gap-3 rounded-xl p-3 transition-colors animate-slide-in-stair sidebar-item-8 ${
                    selectedItem === "/logout" ? "bg-[#F3BB1C] text-black font-semibold" : "text-slate-100 hover:bg-yellow-50 hover:text-yellow-500"
                  } mb-0`}
                  onClick={() => handleItemClick("/logout")}
                >
                  <div className="flex items-center self-center ">
                    <img src={LogoutImg} alt="logout-image" className="" />
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-md font-semibold ">
                    {isLogin ? "Signout" : "Signup"}
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
