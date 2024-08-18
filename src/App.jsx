import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import ConnectWallet from "./pages/auth/ConnectWallet";
import Otp from "./pages/auth/Otp";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import BuyCoinPage from "./pages/BuyCoinPage";
import PaymentPage from "./pages/PaymentPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ProfilePage from "./pages/ProfilePage";
import TransactionPage from "./pages/TransactionPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import Sidebar from "./layout/Sidebar";
import LeaderBoard from "./pages/LeaderBoard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app-bg">
      <Provider store={store}>
        <Router>
          <AppContent />
        </Router>
      </Provider>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/signup", "/connectwallet", "/otp"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Sidebar />}
      <div className="main-content">
          <Navbar/>
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
          <Route path="/otp" element={<Otp />} />
          <Route path="/navbar" element={<Navbar />} />
          {/* <Route path="/buycoin" element={<BuyCoinPage />} /> */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogdetail" element={<BlogDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
