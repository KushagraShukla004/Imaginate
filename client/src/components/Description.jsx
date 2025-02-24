import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import AI_Image from "../assets/AI_Image1.jpg";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Description = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-12 px-6 md:px-16">
      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }} // Ensures animation triggers once when 20% is in view
        className="relative w-full md:w-1/2"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur-xl opacity-40"></div>
        <div className="relative overflow-hidden rounded-xl shadow-xl">
          <img
            src={AI_Image}
            alt="AI Generated Example"
            className="rounded-xl aspect-auto"
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-xl text-center md:text-left"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/80 px-6 py-2 rounded-full border border-neutral-300 shadow-sm backdrop-blur-md"
        >
          <Sparkles className="size-4 text-yellow-500" />
          <p className="font-medium text-gray-700">AI-Powered Creativity</p>
          <Sparkles className="size-4 text-yellow-500" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mt-4 leading-tight text-gray-900"
        >
          Imagine. Create. <span className="text-blue-600">Innovate</span>.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-600 text-lg mt-4 leading-relaxed"
        >
          Step into the future of digital creativity. With Imaginate, turn simple text
          prompts into breathtaking AI-generated images. Whether for art, branding, or
          storytelling, your imagination is the only limit.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => (user ? navigate("/result") : navigate("/signup"))}
        >
          Start Creating
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Description;
