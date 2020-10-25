import React from "react";

function Button({
  children,
  bgColor = "bg-blue-600",
  bgColorHover = "bg-blue-500",
  color = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`shadow ${bgColor} hover:${bgColorHover} focus:shadow-outline focus:outline-none ${color} font-bold py-2 px-4 disabled:opacity-25 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
