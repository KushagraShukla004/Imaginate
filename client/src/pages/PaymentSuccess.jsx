import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CheckCircle, AlertTriangle } from "lucide-react";

const PaymentSuccess = () => {
  const [message, setMessage] = useState("Verifying payment...");
  const [success, setSuccess] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { token, setCredit, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      setMessage("Invalid session. Please try again.");
      setSuccess(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify({ sessionId }),
            credentials: "include",
          }
        );
        const data = await response.json();

        if (response.ok) {
          setMessage("Payment Successful! 🎉");
          setSuccess(true);
          setCredit(data.updatedCredits); // Update UI instantly

          // Ensure the navbar updates correctly
          setTimeout(() => {
            loadCreditsData(); // Fetch latest credits from backend
          }, 1000);
        } else {
          setMessage(data.message || "Payment verification failed.");
          setSuccess(false);
        }
      } catch (error) {
        setMessage("Error verifying payment. Please try again.");
        setSuccess(false);
        console.error("Payment Verification Error:", error);
      }
    };

    verifyPayment();
  }, [sessionId, token, setCredit, loadCreditsData]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      {success === null ? (
        <p className="text-lg text-gray-700 animate-pulse">{message}</p>
      ) : success ? (
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <CheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
          <h1 className="text-3xl font-bold text-green-600 mt-4">{message}</h1>
          <p className="text-gray-700 mt-2">Your credits have been updated.</p>
          <button
            onClick={() => navigate("/result")}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all"
          >
            Generate More !!
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <AlertTriangle className="text-red-500 w-20 h-20 animate-shake" />
          <h1 className="text-3xl font-bold text-red-600 mt-4">{message}</h1>
          <p className="text-gray-700 mt-2">Please try again.</p>
          <button
            onClick={() => navigate("/buy")}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all"
          >
            Retry Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
