import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";

import { store } from "../../firebase-config";
import { Container } from "./editor-app-css";
import { Editor, Timeline, Menu } from "./components";
import Loader from "./components/Loader";

function EditorApp({ user }) {
  const [notebooks, setNotebooks] = useState(null);
  const [notes, setNotes] = useState(null);
  const [note, setNote] = useState(null);
  const loggedUserRef = useRef(null);
  const activeNoteBookRef = useRef(null);
  const activeNoteRef = useRef(null);
  const [refreshApp, setRefreshApp] = useState(0);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getUserNotebooks = async () => {
      try {
        const userRef = doc(store, `USERS/${user.uid}`);
        const loggedUser = await getDoc(userRef);
        // console.log(loggedUser);
        loggedUserRef.current = loggedUser;
        const { notebooksRef } = loggedUser.data();
        // console.log(notebooksRef);
        const notebooks = await Promise.all(
          notebooksRef.map(async (n) => {
            // console.log(n);
            const notebook = await getDoc(n);
            // console.log(notebook.data());
            return notebook;
          })
        );
        // console.log(notebooks);
        return [
          notebooksRef,
          notebooks.map((notebook) => ({
            ...notebook.data(),
            reference: notebook.ref,
          })),
          notebooks.filter((notebook) => notebook.data().isActive)[0],
        ];
      } catch (error) {
        console.log(error.message);
      }
    };
    const getNotebookNotes = async (notebook) => {
      try {
        const notesRef = (await getDoc(notebook)).data().notesRef;
        const notes = await Promise.all(
          notesRef.map(async (n) => {
            const note = await getDoc(n);
            return note;
          })
        );
        // console.log(notes);
        return [
          notesRef,
          notes.map((note) => ({
            ...note.data(),
            reference: note.ref,
          })),
          notes.filter((note) => note.data().isActive)[0],
        ];
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserNotebooks()
      .then(([notebooksRef, notebooks, activeNotebook]) => {
        console.log(notebooksRef);
        console.log(notebooks);
        console.log(activeNotebook);
        setNotebooks(notebooks);
        activeNoteBookRef.current = activeNotebook;
        getNotebookNotes(activeNotebook.ref).then(
          ([noteRef, notes, activeNote]) => {
            console.log(noteRef);
            console.log(notes);
            console.log(activeNote);
            setNotes(notes);
            activeNoteRef.current = activeNote;
            setNote(activeNote.data());
            setLoader(false);
          }
        );
      })
      .catch((err) => console.log(err.message));
  }, [refreshApp, user.uid]);

  return (
    <>
      {loader && <Loader />}
      <Container>
        <Menu
          notebooks={notebooks}
          loggedUser={loggedUserRef.current}
          setRefreshApp={setRefreshApp}
          setLoader={setLoader}
        />
        <Timeline
          notes={notes}
          activeNotebookRef={activeNoteBookRef.current}
          setRefreshApp={setRefreshApp}
          setLoader={setLoader}
        />
        <Editor
          note={note}
          setNote={setNote}
          setRefreshApp={setRefreshApp}
          activeNoteRef={activeNoteRef.current}
          setLoader={setLoader}
        />
      </Container>
    </>
  );
}

export default EditorApp;
