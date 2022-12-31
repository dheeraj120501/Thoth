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
  BiExport,
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
  const editor = useRef(null);
  const getSelection = () => {
    return editor.current.editor.doc.sel.ranges[0];
  };
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
          <BiBold
            className="toolbar-icon"
            title="bold"
            onClick={() => {
              const sel = getSelection();
              console.log(sel);
              console.log(editor.current);
              const content = note?.content.split("\n");
              // head: line, ch:anchor
              const befS = content
                .filter((_, i) => i <= sel.head.line)
                .map((c, i) => {
                  if (i !== sel.head.line) {
                    return c;
                  }
                  return c.slice(0, sel.head.ch);
                })
                .join("\n");
              const selS = content
                .filter((_, i) => i >= sel.head.line && i <= sel.anchor.line)
                .map((c, i) => {
                  if (i === 0) {
                    return c.slice(sel.head.ch + 1);
                  }
                  if (i === sel.anchor.line - sel.head.line) {
                    return c.slice(0, sel.anchor.ch);
                  }
                  return c;
                })
                .join("\n");
              const aftS = content
                .filter((_, i) => i >= sel.anchor.line)
                .map((c, i) => {
                  if (i !== sel.anchor.line - sel.head.line) {
                    return c;
                  }
                  return c.slice(sel.anchor.ch);
                })
                .join("\n");

              console.log(befS);
              console.log(aftS);
              console.log(selS);
            }}
          />
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
          <BiExport
            onClick={() => {
              const url = window.URL.createObjectURL(new Blob([note?.content]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", `${note?.heading}.md`);

              // Append to html link element page
              document.body.appendChild(link);

              // Start download
              link.click();

              // Clean up and remove the link
              link.parentNode.removeChild(link);
            }}
            className="toolbar-icon"
            title="export note"
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
          ref={editor}
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
