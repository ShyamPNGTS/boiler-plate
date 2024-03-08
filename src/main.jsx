import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/redux-store/store";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Provider } from "react-redux";
import Routers from "./routes/Routers.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Routers/>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
