import React from "react";
import styled from "styled-components";
import { Triangle } from "react-loader-spinner";

function Loader() {
  return (
    <Main>
      <Triangle
        ariaLabel="loading-indicator"
        color="blue"
        height="100px"
        width="100px"
      />
    </Main>
  );
}

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: #00000072;
  z-index: 1000;
  display: grid;
  place-items: center;
`;

export default Loader;
