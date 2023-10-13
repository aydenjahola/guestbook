import React from "react";

const Disclaimer = () => {
  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-lg shadow-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 15.293a1 1 0 011.414 0L10 18.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 00-1 1v6a1 1 0 102 0V4a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="font-bold text-lg">Warning</p>
          <p className="text-sm">
            Please be aware that this website and its content are provided for
            informational purposes only. We do not claim ownership or
            responsibility for the content posted on this guestbook. Any views
            or opinions expressed here are those of the individual authors and
            do not necessarily reflect our own.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
