import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Signup from "./pages/auth/Signup";
import ConnectWallet from "./pages/auth/ConnectWallet";
import Otp from "./pages/auth/Otp";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home/Home";
import BuyCoinPage from "./pages/BuyCoinPage";
import PaymentPage from "./pages/PaymentPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ProfilePage from "./pages/ProfilePage";
import TransactionPage from "./pages/TransactionPage";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Sidebar from "./layout/Sidebar";
import LeaderBoard from "./pages/LeaderBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import Footer from "../src/layout/Footer";
import VerifyReferral from "./pages/auth/VerifyReferral";
import ComingSoon from "./pages/ComingSoon";



const EligibilityModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-20 z-50">
      <div className="relative bg-black m-8 p-8 rounded-2xl shadow-2xl max-w-sm w-full ">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition duration-300"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-white mb-4">
          Action Required
        </h2>
        <p className="text-gray-300 mb-6">
          To start mining, you need to stake{" "}
          <span className="font-bold text-lg">25 POX </span> tokens.
        </p>
        <button
          className="w-full py-3 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-600 transition duration-300"
          onClick={onClose} // Close the modal on click
        >
          Okay
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="app-bg">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <AppContent />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const userWalletAddress = useSelector((state)=>state?.wallet?.address);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hideNavbarRoutes = [
    "/signup",
    "/connectwallet",
    "/otp",
    "/verifyreferral",
  ];

  useEffect(() => {
    const isModalShown = sessionStorage.getItem("isModalShown");
    if (!isModalShown) {
      setIsModalOpen(true);
      sessionStorage.setItem("isModalShown", "true");
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Redirect to signup if referral link detected
    if (location.pathname.startsWith("/referral/")) {
      const referralAddress = location.pathname.split("/")[2];
      navigate("/signup", { state: { referralAddress } });
    }
  }, [location, navigate]);

  return (
    <>
    {/* <ComingSoon/> */}
      {!hideNavbarRoutes.includes(location.pathname) && <Sidebar />}
      <div className="main-content">
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="dark"
          newestOnTop={true}
          pauseOnFocusLoss
          toastClassName="custom-toast"
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/connectwallet" element={<ConnectWallet />} />
          {/* <Route path="/otp" element={<Otp />} /> */}
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/buycoin" element={<BuyCoinPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogdetail/:id" element={<BlogDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/transaction/alllivetransaction" element={<TransactionPage />} />
          <Route path="/transaction/usertransaction" element={<TransactionPage />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/verifyreferral" element={<VerifyReferral />} />
          <Route path="/footer" element={<Footer/>} />
          
        </Routes>
      </div>
      {isModalOpen && <EligibilityModal onClose={handleCloseModal} />}
    </>
  );
}

export default App;
