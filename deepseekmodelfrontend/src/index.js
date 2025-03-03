import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import from react-dom/client for React 18+
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Create root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
