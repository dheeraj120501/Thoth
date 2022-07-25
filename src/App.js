import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase-config";
import { LoadingScreen, EditorApp, EditorSite } from "./pages";

function App() {
  const [user, setUser] = useState(undefined);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return user === undefined ? (
    <LoadingScreen />
  ) : user ? (
    <EditorApp user={user} />
  ) : (
    <EditorSite />
  );
}

export default App;
