import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "../assets/assets";
import { Download, Wand2 } from "lucide-react";

const Result = () => {
  const [image, setImage] = useState(assets.Image1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  // const onSubmitHandler = async (e) => {};
  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      // onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center px-4 py-8"
    >
      {/* Image Container */}
      <motion.div variants={imageVariants} className="relative group">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <motion.img
            src={image}
            alt="Generated Result"
            className="max-w-2xl w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: loading ? "100%" : "0%" }}
            transition={{ duration: 10, ease: "linear" }}
          />

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm"
              >
                <div className="text-white flex flex-col items-center">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  <p className="mt-4 font-medium">Generating your image...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Input Section */}
      <AnimatePresence mode="wait">
        {!isImageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-xl mt-10"
          >
            <div className="relative flex items-center bg-neutral-800 text-white p-1.5 rounded-2xl shadow-lg">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Describe what you want to generate"
                className="flex-1 bg-transparent outline-none px-6 py-3 text-sm font-medium placeholder:text-neutral-400"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                Generate
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        {isImageLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex gap-4 mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsImageLoaded(false)}
              className="px-8 py-3 rounded-xl border-2 border-neutral-800 text-neutral-800 font-medium hover:bg-neutral-800 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Generate Another
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={image}
              download
              className="px-8 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default Result;
