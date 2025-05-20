import React, { useEffect } from "react";
import Browse from "../components/Browse.js";
import Login from "../components/Login.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "../utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice.js";

const Body = () => {
  // dispatching action to the store
  const dispach = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispach(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
      } else {
        dispach(removeUser());
      }
    });
  }, []);
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};
export default Body;
