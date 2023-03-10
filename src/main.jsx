import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./normalize.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
