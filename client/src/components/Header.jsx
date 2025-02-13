// const Header = () => {
//   return (
//     <div className="flex flex-col justify-center items-center text-center my-20 space-y-4">
//       <div className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500">
//         <p>✨The go-to Text-to-Image generator!✨</p>
//       </div>
//       <h1 className="font-bold text-4xl max-w-[300px]sm:text-7xl sm:max-w-[590px] mx-auto text-center">
//         Turn your{" "}
//         <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
//           Imagination
//         </span>{" "}
//         into{" "}
//         <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
//           Reality.
//         </span>
//       </h1>
//       <p></p>
//     </div>
//   );
// };

// export default Header;

import { Sparkles, Wand2 } from "lucide-react";
import { motion } from "motion/react";

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center mt-12 mb-24 space-y-8">
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
        className="font-bold text-4xl leading-tight max-w-[300px] sm:text-7xl sm:max-w-[700px] mx-auto text-center"
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
        className="text-gray-600 text-lg sm:text-xl max-w-[600px] mx-auto leading-relaxed"
      >
        Create stunning, unique visuals in seconds. Let AI transform your words into
        breathtaking artwork that captures your vision perfectly.
      </motion.p>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="w-full max-w-[800px] mx-auto p-4"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white rounded-xl overflow-hidden shadow-xl">
            <img
              src="/api/placeholder/800/400"
              alt="AI Generated Art Examples"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-300 ease-in-out rounded-full overflow-hidden shadow-lg hover:shadow-xl"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500"></span>
        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 group-hover:rotate-90"></span>
        <span className="relative flex items-center gap-2">
          Get Started
          <Wand2 className="size-5 transition-transform duration-300 group-hover:rotate-12" />
        </span>
      </motion.button>
    </div>
  );
};

export default Header;
