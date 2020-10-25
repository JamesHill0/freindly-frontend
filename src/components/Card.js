import Button from "./Button";
import React from "react";

// mx-6 my-4
function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`flex flex-col max-w-sm rounded overflow-hidden shadow-2xl border border-gray-200 bg-gray-100 my-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, ...props }) {
  return (
    <div className={`px-4 py-2 border-b-2 bg-indigo-300`} {...props}>
      <span className="text-xl font-bold">{children}</span>
    </div>
  );
}

function CardBody({ children, className = "", ...props }) {
  return (
    <div className={`flex-1 px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ children, className = "", ...props }) {
  return (
    <div className={`border-t border-gray-400 flex ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardFooterButton({ children, className = "", type = "", ...props }) {
  // default type == primary
  if (type === "neutral") {
    props.color = "text-gray-700";
    props.bgColor = "bg-gray-100";
    props.bgColorHover = "bg-gray-200";
  }
  return (
    <Button
      className={`flex-1 py-2 border-r border-l border-gray-400 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export default Card;
export { Card, CardHeader, CardBody, CardFooter, CardFooterButton };
