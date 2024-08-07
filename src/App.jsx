import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import ConnectWallet from "./pages/auth/ConnectWallet";
import Otp from "./pages/auth/Otp";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import BuyCoinPage  from "./pages/BuyCoinPage";
import PaymentPage from "./pages/PaymentPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ProfilePage from "./pages/ProfilePage";
import TransactionPage from "./pages/TransactionPage";
function App() {

  return (

    <div className="app-bg">
        
  <Router>
      
      <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/home" element={<Home />} /> 
           <Route path="/signup" element={< Signup />} />
           <Route path="/connectwallet" element={<ConnectWallet />} />
           <Route path="/otp" element={<Otp />}/>
           <Route path="/navbar" element={<Navbar />} />
            <Route path="/buycoin" element={<BuyCoinPage/>} />
           <Route path="/payment" element={<PaymentPage />} />
           <Route path="/blogs" element={<BlogsPage />} />
           <Route path="/blogdetail" element={<BlogDetailPage />} />
           <Route path="/profile" element={<ProfilePage />} />
           <Route path="/transaction" element={<TransactionPage />} />
      </Routes>   
   </Router>
    </div>
  
  )
}

export default App
