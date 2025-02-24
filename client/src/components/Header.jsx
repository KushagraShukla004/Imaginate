import { Sparkles, Wand2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AI_Examples } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { user, setShowLogin } = useContext(AppContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AI_Examples.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center text-center mt-2 space-y-8">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-stone-600 inline-flex items-center gap-2 bg-white/80 px-6 py-2 rounded-full border border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
      >
        <Sparkles className="size-4 text-yellow-500" />
        <p className="font-medium">The go-to Text-to-Image generator!</p>
        <Sparkles className="size-4 text-yellow-500" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-bold text-4xl leading-tight max-w-[300px] sm:text-5xl sm:max-w-[700px] mx-auto text-center"
      >
        Turn your{" "}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Imagination
        </span>{" "}
        into{" "}
        <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Reality.
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-gray-600 text-lg sm:text-xl max-w-[900px] mx-auto leading-relaxed"
      >
        Create stunning, unique visuals in seconds. Let AI transform your words into
        breathtaking artwork that captures your vision perfectly.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-300 ease-in-out rounded-full overflow-hidden shadow-lg hover:shadow-xl"
        onClick={() => {
          {
            user ? navigate("/result") : setShowLogin(true);
          }
        }}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500"></span>
        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 group-hover:rotate-90"></span>
        <span className="relative flex items-center gap-2">
          Generate Your Images
          <Wand2 className="size-5 transition-transform duration-300 group-hover:rotate-12" />
        </span>
      </motion.button>

      {/* AI Examples Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-5xl mx-auto p-4"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white rounded-xl overflow-hidden shadow-xl">
            {/* Images Carousel */}
            <div className="relative aspect-[2/1]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={AI_Examples[currentIndex].image}
                  alt={`AI Example ${currentIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      prev === 0 ? AI_Examples.length - 1 : prev - 1
                    )
                  }
                  className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-all"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % AI_Examples.length)
                  }
                  className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-all"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>

              {/* Progress Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {AI_Examples.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "bg-white w-6" : "bg-white/50 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
