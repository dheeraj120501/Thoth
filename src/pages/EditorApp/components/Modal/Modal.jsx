import React from "react";
import styled from "styled-components";

function Modal() {
  return <Main>Modal</Main>;
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

export default Modal;
