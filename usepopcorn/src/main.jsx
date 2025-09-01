import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { useState } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Awful", "Bad", "Decent", "Great", "The best"]}
      defaultRating={3}
    /> */}
    {/* <Test></Test> */}
  </StrictMode>
);
