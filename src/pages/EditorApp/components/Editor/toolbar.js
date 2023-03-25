const actionBold = (getSelection, note) => {
  const sel = getSelection();
  //   console.log(sel);
  //   console.log(editor.current);
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
};
