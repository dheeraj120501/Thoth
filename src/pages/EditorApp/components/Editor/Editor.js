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

import { Main, SearchField, Seperator, Toolbar, NoteHead } from "./editor-css";

require("codemirror/mode/markdown/markdown");
require("../../asset/editor.css");

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

export default Editor;
