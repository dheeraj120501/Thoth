import React from "react";
import { Oval } from "react-loader-spinner";

import { Main } from "./loadin-screen-css";
import logo from "./asset/logo.png";

function LoadingScreen() {
  return (
    <Main>
      <img src={logo} alt="logo" />
      <Oval
        height="80"
        width="80"
        color="blue"
        strokeWidthSecondary="2"
        secondaryColor="transparent"
      />
    </Main>
  );
}

export default LoadingScreen;
