import React, { useState, useRef } from "react";
import styled from "styled-components";
import { IoReload, IoSearchSharp } from "react-icons/io5";
import { AiFillFileAdd, AiFillDelete } from "react-icons/ai";

import {
  addDoc,
  deleteDoc,
  Timestamp,
  updateDoc,
  collection,
} from "firebase/firestore";

import { store } from "../../../firebase-config";

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

const Main = styled.div`
  padding: 20px 20px 0 25px;
  width: 19vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin: 40px 0 30px;
  width: 92%;
  & > h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #c7c7c7;

    & .icon {
      cursor: pointer;
      fill: #acb0b8;
      transition: all 0.5s ease-in;
    }

    & .refresh {
      transform: rotateZ(360deg);
    }
  }

  & > span {
    color: #777a7e;
    font-size: 12px;
  }
`;

const SearchField = styled.div`
  width: 92%;
  height: 60px;
  background: #1e2022;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  border-radius: 5px;
  cursor: text;
  overflow: hidden;
  & > .search {
    background: transparent;
    width: 100%;
    border-style: none;
    outline: none;
    &::placeholder {
      color: #777a7e;
    }
  }
  & > .active {
    width: auto;
    color: white;
  }
  & > .svg {
    fill: #777a7e;
    transition: all 0.5s;
  }
  & > .hidden {
    transform: translateX(100px);
  }
`;

const NewFile = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: #777a7e;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  width: 92%;
  background: #1e2022;
  padding: 2px;
  border-radius: 6px;

  & > svg {
    margin-left: 4px;
    fill: #777a7e;
  }
`;

const Files = styled.div`
  margin-top: 20px;
  overflow-y: auto;
  height: 100%;
  position: relative;
  scrollbar-color: #1d1f21 #222324;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
    left: -100px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #222324;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1d1f21;
    border-radius: 10px;
    outline: none;
  }

  & .file {
    width: 95%;
    height: auto;
    background: #222324;
    border-radius: 10px;
    padding: 12px 15px;
    color: white;
    margin-bottom: 15px;
    cursor: default;
    overflow: hidden;

    & > .desc {
      font-size: 11px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & > .published {
      font-size: 11px;
      margin-bottom: 5px;
    }

    & > .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & .heading {
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
        margin-right: 10px;
      }
      & .action {
        background: #ffffff40;
        padding: 2px;
        display: grid;
        place-items: center;
        border-radius: 2px;
      }
    }
  }

  & .active {
    background: #4444ff;
  }
`;

export default Timeline;
