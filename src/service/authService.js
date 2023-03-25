import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import { auth, store } from "../firebase-config";

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

export { register, login };
