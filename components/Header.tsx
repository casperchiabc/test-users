"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const Header: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{opacity: 0, y: -8}}
      animate={{
        opacity: 1,
        y: 0,
	      transition:{duration:0.2}
      }}
    >
      <h1 className="text-3xl font-semibold p-6">{children}</h1>
    </motion.div>
  );
};

export default Header;
