import React from "react";
import { motion } from "framer-motion";

const Disclaimer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: "spring" },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.2, duration: 0.5, type: "spring" },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.4, duration: 0.5, type: "spring" },
    },
  };

  return (
    <motion.div
      className="bg-red-500 border border-red-600 text-white p-4 rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex" variants={iconVariants}>
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <motion.div className="ml-3" variants={textVariants}>
          <p className="font-semibold text-lg">Important Notice</p>
          <p className="text-sm">
            This is a <strong>critical disclaimer</strong>! The information
            provided on this website is <strong>NOT MODERATED</strong>. We do
            not take any responsibility for the content displayed in this
            guestbook. All views and opinions expressed here are those of the
            individual authors and may not represent our views.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Disclaimer;
