import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { User, LogOut } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  //fetched useState using AppContext and AppContextProvider
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mt-2 py-2">
      <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
        <img src={assets.Logo} alt="Logo" className="size-6 sm:size-8 md:size-12" />
        <h1 className="font-semibold pl-1 md:p-2 text-xl sm:text-2xl md:text-4xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Imaginate
        </h1>
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => {
                navigate("/result");
              }}
              className="text-xl max-sm:hidden font-medium text-gray-700 cursor-pointer"
            >
              Generate!
            </p>
            <button
              onClick={() => {
                navigate("/buy");
              }}
              className="border border-blue-400 bg-gradient-to-r from-cyan-50 to-blue-50 px-2 sm:px-4 py-2 rounded-2xl flex items-center justify-between gap-2 
              transition-all duration-300 hover:shadow-md hover:from-cyan-100 hover:to-blue-100 hover:scale-102"
            >
              <img
                src={assets.Star}
                alt="Star"
                className="size-4 sm:size-6 animate-pulse"
              />
              <p className="mt-1 text-gray-700 max-sm:text-sm font-medium">Credits: 10</p>
            </button>
            <p className="text-xl max-sm:hidden font-medium text-gray-700">Hi, User!</p>
            <div className="relative group">
              <button className="userButton">
                <User className="relative z-10" />
              </button>
              <div className="absolute hidden group-hover:block top-0 right-0 pt-14 z-20 w-48">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Signed in as</p>
                    <p className="font-medium text-gray-900">user@example.com</p>
                  </div>
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-50 flex items-center gap-2 cursor-pointer group/item">
                      <LogOut className="size-4 text-gray-400 group-hover/item:text-blue-500 transition-colors" />
                      <span className="text-gray-700 group-hover/item:text-blue-500 transition-colors">
                        Log out
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 mr-5 sm:gap-6">
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer font-medium hover:text-blue-600 transition-colors"
            >
              Pricing
            </p>
            <button
              className="NavButton"
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
