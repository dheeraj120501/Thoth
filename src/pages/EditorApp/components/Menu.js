import React from "react";
import styled from "styled-components";
import {
  AiFillFolderAdd,
  AiTwotoneSetting,
  AiOutlineLogout,
  AiFillDelete,
} from "react-icons/ai";
import { signOut } from "firebase/auth";

import { auth, store } from "../../../firebase-config";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";

function Menu({ notebooks, loggedUser, setRefreshApp, setLoader }) {
  const addNotebook = async () => {
    try {
      const notebookRef = collection(store, "NOTEBOOKS");
      console.log(notebookRef);
      const noteRef = collection(store, "NOTES");
      const note = await addDoc(noteRef, {
        content: "Default",
        heading: "Default",
        description: "Def",
        created: Timestamp.now(),
        isActive: true,
      });
      const newNotebook = await addDoc(notebookRef, {
        isActive: false,
        notebookName: "News Folder",
        notesRef: [note],
      });
      const oldNotebooksRef = loggedUser.data().notebooksRef;
      await updateDoc(loggedUser.ref, {
        ...loggedUser.data(),
        notebooksRef: [...oldNotebooksRef, newNotebook],
      });
      setRefreshApp((refreshApp) => ++refreshApp);
      console.log("folder added", newNotebook);
    } catch (e) {
      console.log(e.message);
    }
  };

  const delNotebook = async (e, reference) => {
    try {
      const notesRef = (await getDoc(reference)).data().notesRef;
      await Promise.all(
        notesRef.map(async (note) => {
          await deleteDoc(note);
        })
      );
      const newNotebooksRef = loggedUser
        .data()
        .notebooksRef.filter((notebookRef) => notebookRef.id !== reference.id);
      console.log(newNotebooksRef);
      await updateDoc(loggedUser.ref, {
        ...loggedUser.data(),
        notebooksRef: newNotebooksRef,
      });
      await deleteDoc(reference);
      setRefreshApp((refreshApp) => ++refreshApp);
    } catch (err) {
      console.log(err.message);
    }
  };

  const selectNotebook = async (e, notebook) => {
    try {
      console.log("got clicked");
      const { reference: prevActNotebookRef, ...prevActNotebook } =
        notebooks.filter((n) => n.isActive)[0];

      const { reference: newActNotebookRef, ...newActNotebook } =
        notebooks.filter((n) => n.reference.id === notebook.reference.id)[0];
      console.log(prevActNotebook);
      console.log(prevActNotebookRef);
      console.log(newActNotebook);
      console.log(newActNotebookRef);
      await updateDoc(prevActNotebookRef, {
        ...prevActNotebook,
        isActive: false,
      });
      await updateDoc(newActNotebookRef, {
        ...newActNotebook,
        isActive: true,
      });
      setRefreshApp((refreshApp) => ++refreshApp);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Main>
      <h2>Notebooks</h2>
      <Links>
        {notebooks ? (
          notebooks.map((notebook) => (
            <div
              key={notebook.reference.id}
              onClick={(e) => {
                setLoader(true);
                selectNotebook(e, notebook);
              }}
            >
              <div className={`list ${notebook.isActive ? "active" : ""}`}>
                {notebook.notebookName}
              </div>

              {!notebook.isActive && (
                <AiFillDelete
                  className="action"
                  onClick={(e) => {
                    setLoader(true);
                    e.stopPropagation();
                    delNotebook(e, notebook.reference);
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </Links>
      <HLine />
      <ActionItem
        onClick={(e) => {
          setLoader(true);
          addNotebook();
        }}
      >
        New Notebook
        <AiFillFolderAdd size="18" />
      </ActionItem>
      <ActionItem>
        Settings
        <AiTwotoneSetting size="18" />
      </ActionItem>
      <ActionItem onClick={logout}>
        Log out
        <AiOutlineLogout size="18" />
      </ActionItem>
    </Main>
  );
}

const Main = styled.div`
  padding: 20px 20px;
  width: 11vw;
  max-height: 100vh;
  border-top-right-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  & > h2 {
    margin: 30px 0;
  }
`;

const Links = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-color: #1d1f2163 #2223242d;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #2223242d;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1d1f2163;
    border-radius: 10px;
    outline: none;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    color: #acb0b8;
    & .list {
      font-size: 14px;
      cursor: default;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 95%;
      &:hover {
        color: #1e2022;
      }
    }
    &:first-child {
      margin: 0;
    }

    & .action {
      &:hover {
        color: #1e2022;
      }
    }

    & > .active {
      color: #4444ff;
      cursor: default;

      &:hover {
        color: #4444ff;
      }
    }
  }
`;

const HLine = styled.div`
  margin: 10px 0;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-top: 3px solid #e6e7ea;
    border-radius: 20px;
  }
`;

const ActionItem = styled.div`
  font-size: 14px;
  color: #acb0b8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    color: #1e2022;
  }
`;

export default Menu;
