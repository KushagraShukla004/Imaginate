import { Github, Instagram, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-orange-50/50 rounded-3xl py-6 px-4 sm:px-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo and Copyright */}
        <div className="flex items-center gap-2">
          <motion.img
            src={assets.Logo}
            alt="imagify"
            className="size-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.h1 className="text-2xl font-bold pr-2 border-black border-r-2">
            Imaginate
          </motion.h1>
          <motion.p
            className="text-xs text-gray-600 sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            All rights reserved. Copyright © {currentYear}
          </motion.p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <motion.a
            href="https://github.com/KushagraShukla004/Imaginate"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="group relative"
            target="_blank"
          >
            <span className="absolute -inset-2 rounded-full bg-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Github className="size-7 text-gray-600 group-hover:text-gray-700 relative transition-colors duration-300" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/kushagra-shukla101/"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="group relative"
            target="_blank"
          >
            <span className="absolute -inset-2 rounded-full bg-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Linkedin className="size-7 text-gray-600 group-hover:text-sky-500 relative transition-colors duration-300" />
          </motion.a>

          <motion.a
            href="#"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="group relative"
            target="_blank"
          >
            <span className="absolute -inset-2 rounded-full bg-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Instagram className="size-7 text-gray-600 group-hover:text-pink-600 relative transition-colors duration-300" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
