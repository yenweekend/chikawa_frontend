import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "@/App";
import { Provider } from "react-redux";
import { persistor } from "@/stores/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Toaster } from "@/components/ui/sonner";

import store from "@/stores/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
        <Toaster
          position="top-right"
          expand={false}
          richColors
          duration={3000}
        />
      </Router>
    </PersistGate>
  </Provider>
);
