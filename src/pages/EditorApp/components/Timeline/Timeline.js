import React, { useState, useRef } from "react";
import { IoReload, IoSearchSharp } from "react-icons/io5";
import { AiFillFileAdd, AiFillDelete } from "react-icons/ai";

import {
  addDoc,
  deleteDoc,
  Timestamp,
  updateDoc,
  collection,
} from "firebase/firestore";

import { store } from "../../../../firebase-config";
import { Main, Header, SearchField, NewFile, Files } from "./timeline-css";

function Timeline({ notes, setRefreshApp, activeNotebookRef, setLoader }) {
  const addNote = async () => {
    try {
      const noteRef = collection(store, "NOTES");
      const newNote = await addDoc(noteRef, {
        content: "New Hello World",
        heading: "New New Heading",
        description: "New New Desc",
        created: Timestamp.now(),
        isActive: false,
      });
      const oldNotesRef = activeNotebookRef.data().notesRef;
      await updateDoc(activeNotebookRef.ref, {
        ...activeNotebookRef.data(),
        notesRef: [...oldNotesRef, newNote],
      });
      setRefreshApp((refreshApp) => ++refreshApp);
      console.log("note added", newNote);
    } catch (e) {
      console.log(e.message);
    }
  };

  const delNote = async (e, reference) => {
    const newNotesRef = activeNotebookRef
      .data()
      .notesRef.filter((noteRef) => noteRef.id !== reference.id);
    console.log(newNotesRef);
    await deleteDoc(reference);
    await updateDoc(activeNotebookRef.ref, {
      ...activeNotebookRef.data(),
      notesRef: newNotesRef,
    });
    setRefreshApp((refreshApp) => ++refreshApp);
  };

  const selectNote = async (e, note) => {
    try {
      console.log("got clicked");
      const { reference: prevActNoteRef, ...prevActNote } = notes.filter(
        (n) => n.isActive
      )[0];

      const { reference: newActNoteRef, ...newActNote } = notes.filter(
        (n) => n.reference.id === note.reference.id
      )[0];
      console.log(prevActNote);
      console.log(prevActNoteRef);
      console.log(newActNote);
      console.log(newActNoteRef);
      await updateDoc(prevActNoteRef, {
        ...prevActNote,
        isActive: false,
      });
      await updateDoc(newActNoteRef, {
        ...newActNote,
        isActive: true,
      });
      setRefreshApp((refreshApp) => ++refreshApp);
    } catch (err) {
      console.log(err.message);
    }
  };

  const search = useRef(null);

  const [hidden, setHidden] = useState("");
  const [refresh, setRefresh] = useState("");

  return (
    <Main>
      <Header>
        <h2>
          Timeline
          <IoReload
            onClick={() => {
              setLoader(true);
              setRefresh("refresh");
              setTimeout(() => {
                setRefresh("");
                setRefreshApp((refreshApp) => ++refreshApp);
              }, 500);
            }}
            className={`icon ${refresh}`}
          />
        </h2>
        <span>Last synced little ago..</span>
      </Header>
      <SearchField
        onClick={() => {
          console.log(search);
          search.current.className = "search active";
          search.current.focus();
          setHidden("hidden");
        }}
      >
        <input
          type="text"
          placeholder="Search in Notebook"
          className="search"
          ref={search}
          onBlur={() => {
            search.current.className = "search";
            setHidden("");
          }}
        />
        <IoSearchSharp className={`svg ${hidden}`} />
      </SearchField>
      <NewFile
        onClick={() => {
          setLoader(true);
          addNote();
        }}
      >
        New Note
        <AiFillFileAdd />
      </NewFile>
      <Files>
        {notes ? (
          notes.map((note) => (
            <div
              className={`file ${note.isActive ? "active" : ""}`}
              key={note.reference.id}
              onClick={(e) => {
                setLoader(true);
                selectNote(e, note);
              }}
            >
              <div className="header">
                <div className="heading">{note.heading}</div>
                {!note.isActive && (
                  <div
                    className="action"
                    onClick={(e) => {
                      setLoader(true);
                      e.stopPropagation();
                      delNote(e, note.reference);
                    }}
                  >
                    <AiFillDelete size={20} />
                  </div>
                )}
              </div>
              <div className="published">Published at:</div>
              <div className="desc">{note.description}</div>
            </div>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </Files>
    </Main>
  );
}
export default Timeline;
