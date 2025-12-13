import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "@/App";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
    <Toaster position="top-right" expand={false} duration={3000} />
  </Router>
);
