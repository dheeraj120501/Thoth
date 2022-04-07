import React, { useState } from "react";
import EditorApp from "./pages/EditorApp";
import EditorSite from "./pages/EditorSite";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
  });

  return user ? <EditorApp user={user} /> : <EditorSite />;
}

export default App;
