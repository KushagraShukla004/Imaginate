import { useContext, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "../assets/assets";
import { Download, Wand2 } from "lucide-react";
import { AppContext } from "../context/AppContext";

// Animation Variants (Defined Outside Component)
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

const buttonHoverTap = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

const Result = () => {
  const { generateImage } = useContext(AppContext);
  const [generatedImage, setGeneratedImage] = useState(assets.Image1);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // input is prompt
    if (!input.trim()) return;

    setLoading(true);
    const image = await generateImage(input);
    if (image) setGeneratedImage(image);
    setLoading(false);
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center px-4 py-8"
    >
      {/* Image Container */}
      <motion.div variants={imageVariants} className="relative group">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <motion.img
            src={generatedImage}
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

          <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>
        </div>
      </motion.div>

      {/* Input Section */}
      <AnimatePresence mode="wait">
        {!loading && generatedImage === assets.Image1 && (
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
                {...buttonHoverTap}
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                Generate
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        {generatedImage !== assets.Image1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex gap-4 mt-10"
          >
            <motion.button
              {...buttonHoverTap}
              onClick={() => setGeneratedImage(assets.Image1)}
              className="px-8 py-3 rounded-xl border-2 border-neutral-800 text-neutral-800 font-medium hover:bg-neutral-800 hover:text-white flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Generate Another
            </motion.button>

            <motion.a
              {...buttonHoverTap}
              href={generatedImage}
              download
              className="px-8 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 flex items-center gap-2"
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

// Loading Overlay Component
const LoadingOverlay = () => (
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
);

export default Result;
