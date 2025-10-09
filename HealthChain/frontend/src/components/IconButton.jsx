import React from "react";
import { motion } from "framer-motion";

export default function IconButton({ children, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`px-4 py-2 rounded-full ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}