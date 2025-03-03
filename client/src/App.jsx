import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BuyCredit from "./pages/BuyCredit";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Authentication from "./components/Authentication";
import { AppContext } from "./context/AppContext";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

const App = () => {
  const { showLogin } = useContext(AppContext);
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <ToastContainer position="bottom-right" />
      {/*props to call onClick event of login button in navbar*/}
      {/* or */}
      {/* We can use AppContext to handle state changes from anywhere making prop-calling outdated */}
      <Navbar />
      {/* login/signup dialog box open/close*/}
      {showLogin && <Authentication />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        {/*props to call onClick event of login button in BuyCredit page */}
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
