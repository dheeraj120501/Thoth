import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";

import { Main, Header, FormContainer, Form } from "./editor-site-css";
import { auth, store } from "../../firebase-config";
import logo from "./asset/logo.png";

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

  const register = async (email, password) => {
    try {
      console.log("reg");
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const notebookRef = collection(store, "NOTEBOOKS");
      const noteRef = collection(store, "NOTES");
      const note = await addDoc(noteRef, {
        content: "Default",
        heading: "Default",
        description: "Def",
        created: Timestamp.now(),
        isActive: true,
      });
      const notebook = await addDoc(notebookRef, {
        isActive: true,
        notebookName: "News Folder",
        notesRef: [note],
      });
      const newUser = doc(store, "USERS", user.user.uid);
      await setDoc(newUser, {
        username: email.split("@")[0],
        notebooksRef: [notebook],
      });
      console.log(user.user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async (email, password) => {
    try {
      console.log("login");
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(logo);

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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target[0].value;
            const password = e.target[1].value;
            console.log(email, password);
            if (formState === FORMSTATE.LOGIN) {
              login(email, password);
            } else {
              register(email, password);
            }
          }}
        >
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
            <span
              onClick={() => {
                if (formState === FORMSTATE.LOGIN)
                  setFormState(FORMSTATE.REGISTER);
                else setFormState(FORMSTATE.LOGIN);
              }}
            >
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
