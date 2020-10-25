import "./App.css";
import "./tailwind.output.css";
// TODO: load css via postcss
import "react-toastify/dist/ReactToastify.css";

import ProductScreener from "./views/ProductScreener";
import React from "react";
import { ToastContainer } from "react-toastify";

// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div className="h-full">
      <ToastContainer position="bottom-right" />
      <ProductScreener />
    </div>
  );
}

export default App;
