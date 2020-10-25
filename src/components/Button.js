import React from "react";

function Button({
  children,
  bgColor = "bg-purple-500",
  bgColorHover = "bg-purple-400",
  color = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`shadow ${bgColor} hover:${bgColorHover} focus:shadow-outline focus:outline-none ${color} font-bold py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
