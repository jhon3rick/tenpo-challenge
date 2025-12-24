import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { store, persistor } from "./store";
import { setupAxiosInterceptors } from "./services/api/axiosInstance";
import { setupAuthMock } from "./services/api/mockAuth";
import { App } from "./App";

// mock del login en el mismo axiosInstance (fake 200 + token)
if (import.meta.env.MODE === "development") {
  setupAuthMock();
}

// interceptores para inyectar token-fake en requests
setupAxiosInterceptors(() => store.getState().auth.token);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
