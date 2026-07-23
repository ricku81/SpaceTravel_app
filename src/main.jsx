import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App.jsx";
import { StatesProvider } from "./context/States";

ReactDOM.createRoot(document.getElementById("root"))
        .render(
	        <React.StrictMode>
		        <StatesProvider>
		          <App />
		        </StatesProvider>
	        </React.StrictMode>
        );
