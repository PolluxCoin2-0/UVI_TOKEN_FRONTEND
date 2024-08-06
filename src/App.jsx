import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import ConnectWallet from "./pages/auth/ConnectWallet";
import Otp from "./pages/auth/Otp";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
function App() {

  return (

    <div className="app-bg">
  <Router>
      
      <Routes>
           <Route path="/signup" element={< Signup />} />
           <Route path="/connectwallet" element={<ConnectWallet />} />
           <Route path="/otp" element={<Otp />}/>
           <Route path="/navbar" element={<Navbar />} />
           <Route path="/home" element={<Home />} />
      </Routes> 
   </Router>
    </div>
  
  )
}

export default App
