import { useEffect, useState } from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import { LoginContextProvider } from "./store/loginContext";

function App() {
  return (
    <LoginContextProvider>
      <ToastContainer />
      <LayoutComponent>
        <Router />
      </LayoutComponent>
    </LoginContextProvider>
  );
}

export default App;
