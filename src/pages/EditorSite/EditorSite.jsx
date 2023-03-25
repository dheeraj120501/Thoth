import React, { useState } from "react";

import { Main, Header, FormContainer, Form } from "./editor-site-css";
import logo from "../../asset/logo.png";

import { login, register } from "../../service/authService";

function EditorSite() {
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  // const [loginEmail, setLoginEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");

  const FORMSTATE = {
    LOGIN: "login",
    REGISTER: "register",
  };

  const [formState, setFormState] = useState(FORMSTATE.LOGIN);

  const auth = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email, password);
    if (formState === FORMSTATE.LOGIN) {
      login(email, password);
    } else {
      register(email, password);
    }
  };

  const toggleFormState = () => {
    if (formState === FORMSTATE.LOGIN) {
      setFormState(FORMSTATE.REGISTER);
    } else {
      setFormState(FORMSTATE.LOGIN);
    }
  };

  return (
    <Main>
      <Header>
        <div>
          <img src={logo} className="logo" alt="logo" />
        </div>
      </Header>
      {/* <div className="heading">THOTH</div> */}
      {/* <div className="tagline">
        Everybody walks past a thousand story ideas every day. The good writers
        are the ones who see five or six of them. Most people don't see any.
        There is no greater agony than bearing an untold story inside you. The
        worst enemy to creativity is self-doubt.
      </div> */}
      <FormContainer>
        <div className="form-heading">{formState.toUpperCase()}</div>
        <Form onSubmit={auth}>
          <div>
            <label className="subtitle">Email</label>
            <input type="email" name="email" />
          </div>
          <div>
            <label className="subtitle">Password</label>
            <input type="password" name="password" />
          </div>
          <div className="form-secondary-cta">
            {formState === FORMSTATE.REGISTER && <span></span>}
            <span onClick={toggleFormState}>
              {formState === FORMSTATE.LOGIN
                ? "New User?"
                : "Already had an Account?"}
            </span>
            {formState === FORMSTATE.LOGIN && <span>Forget Password</span>}
          </div>
          <input
            type="submit"
            value={formState.toUpperCase()}
            className="submit-btn"
          />
        </Form>
      </FormContainer>
    </Main>
  );
}

export default EditorSite;
