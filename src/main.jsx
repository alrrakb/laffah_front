import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons"; // Add regular icons

import { fab } from "@fortawesome/free-brands-svg-icons"; // Add brand icons

library.add(fas, fab, far); // Add both to your library

// Add all solid icons to the library (or specific ones to reduce bundle size)
library.add(fas);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
