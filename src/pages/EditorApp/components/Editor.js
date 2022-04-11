import React, { useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import { IoSearchSharp, IoShareSocialSharp } from "react-icons/io5";
import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiAlignJustify,
  BiListUl,
  BiListOl,
  BiCode,
  BiCodeAlt,
  BiSave,
} from "react-icons/bi";

import { updateDoc } from "firebase/firestore";

import styled from "styled-components";
require("codemirror/mode/markdown/markdown");
require("../asset/editor.css");

function Editor({ note, setNote, activeNoteRef, setRefreshApp, setLoader }) {
  const save = async (e) => {
    try {
      console.log(activeNoteRef);
      await updateDoc(activeNoteRef.ref, note);
      setRefreshApp((refreshApp) => ++refreshApp);
    } catch (e) {
      console.log(e.message);
    }
  };
  const search = useRef(null);
  // const [val, setVal] = useState(`henlo worldo
  // \`\`\`cpp
  // #include <iostream>

  // int main() {
  //   std::cout<<"This is how you write code of a specific language."<<std::endl;
  //   return 0;
  // }
  // \`\`\`

  // \`This is inline code\`

  // we can work like this because it is a markdown file.

  // **We can bold stuffs**

  // *Can make them italics*`);
  return (
    <Main>
      <SearchField
        onClick={() => {
          search.current.className = "search active";
          search.current.focus();
        }}
      >
        <IoSearchSharp />
        <input
          type="text"
          placeholder="Search in note"
          className="search"
          ref={search}
          onBlur={() => {
            search.current.className = "search";
          }}
        />
      </SearchField>
      <Seperator />
      <Toolbar>
        <div className="tools">
          <BiBold className="toolbar-icon" title="bold" />
          <BiItalic className="toolbar-icon" title="italic" />
          <BiUnderline className="toolbar-icon" title="underline" />
        </div>
        <div className="tools">
          <BiAlignLeft className="toolbar-icon" title="align-left" />

          <BiAlignMiddle className="toolbar-icon" title="align-center" />

          <BiAlignRight className="toolbar-icon" title="align-right" />

          <BiAlignJustify className="toolbar-icon" title="align-justify" />
        </div>
        <div className="tools">
          <BiListUl className="toolbar-icon" title="bullets" />

          <BiListOl className="toolbar-icon" title="list" />

          <BiCode className="toolbar-icon" title="inline-code" />

          <BiCodeAlt className="toolbar-icon" title="code" />
        </div>
        <div className="tools">
          <IoShareSocialSharp className="toolbar-icon" title="share" />

          <BiSave
            className="toolbar-icon"
            title="save"
            onClick={(e) => {
              setLoader(true);
              save(e);
            }}
          />
        </div>
      </Toolbar>
      <NoteHead>
        <input
          type="text"
          className="noteHead heading"
          placeholder="NOTE HEADLINE"
          value={note?.heading}
          onChange={(e) => {
            const value = e.target.value;
            setNote({ ...note, heading: value });
          }}
        />
        <input
          type="text"
          className="noteHead desc"
          placeholder="Description of the note"
          value={note?.description}
          onChange={(e) => {
            const value = e.target.value;
            setNote({ ...note, description: value });
          }}
        />
      </NoteHead>
      <div className="editor">
        <CodeMirror
          value={note?.content}
          options={{
            mode: "markdown",
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            cursorBlinkRate: 0,
          }}
          onBeforeChange={(editor, data, value) => {
            setNote({ ...note, content: value });
          }}
        />
      </div>
    </Main>
  );
}

const Main = styled.div`
  background: #1a1a1a;
  width: 70vw;
  height: 100vh;
  border-top-left-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;

  & .editor {
    flex: 1;
    border-top: 1px solid #dddddd;
    overflow-y: auto;
    display: flex;
    overflow-x: hidden;
    word-wrap: break-word;
  }
`;

const SearchField = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-radius: 5px;
  cursor: text;
  overflow: hidden;
  & > .search {
    background: transparent;
    width: 100%;
    border-style: none;
    outline: none;
    color: #f0f0f0;
    font-size: 1rem;
    &::placeholder {
      color: #777a7e;
      font-weight: 500;
      font-size: 1rem;
    }
  }
  & > .active {
    color: white;
  }
  & > svg {
    fill: #777a7e;
    margin-right: 8px;
  }
`;

const Seperator = styled.div`
  width: 100%;
  height: 4px;
  background: black;
`;

const Toolbar = styled.div`
  display: flex;
  padding: 20px 20px;

  & .tools {
    display: flex;
    /* align-items: center; */
    &:not(&:first-child) {
      padding: 0px 10px;
      border-left: 1px solid #777a7e;
    }
    & .toolbar-icon {
      margin-right: 20px;
      color: #777a7e;
      font-size: 1.4rem;
      &:hover {
        color: white;
        cursor: pointer;
      }
    }
  }
`;

const NoteHead = styled.div`
  padding: 0 20px;
  & .noteHead {
    margin-bottom: 10px;
    display: block;
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    &::placeholder {
      color: #777a7e;
    }
  }
  & .heading {
    font-size: 2rem;
    font-weight: 600;
    color: #777a7e;
  }

  & .desc {
    font-weight: 400;
    color: #777a7e;
  }
`;

export default Editor;
