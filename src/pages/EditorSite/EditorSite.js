import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import { auth, store } from "../../firebase-config";

function EditorSite() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = async () => {
    try {
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
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const newUser = doc(store, "USERS", user.user.uid);
      await setDoc(newUser, {
        username: registerEmail,
        notebooksRef: [notebook],
      });
      console.log(user.user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>
    </div>
  );
}

export default EditorSite;
