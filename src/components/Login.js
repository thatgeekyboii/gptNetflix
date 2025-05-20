import Header from "../components/Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null); // initially empty
  const password = useRef(null); // initially empty

  // Form Submission and Validation
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    // if(message === null) {
    //     // Create new user (signin/signup)
    // }

    // SignIn SignUp logic
    if (!isSignInForm) {
      // SignUp logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // updating User profile on signing in
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://upload.wikimedia.org/wikipedia/en/c/cd/Dwight_Schrute.jpg",
          })
            .then(() => {
              // Profile updated! Good to Navigate
            const {uid, email, displayName ,photoURL} = auth.currentUser; // fetch from auth for updated user
            dispatch(addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            }))
                navigate("/browse");
              // ...
            })
            .catch((error) => {
              setErrorMessage(error);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          navigate("/");
        });
    } else {
      // SignIn logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Signed-in User", user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          navigate("/");
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/IN-en-20250512-TRIFECTA-perspective_688b8c03-78cb-46a6-ac1c-1035536f871a_large.jpg"
          className="w-screen h-screen object-cover"
          alt="home"
        ></img>
      </div>
      <form
        className="p-12 w-3/12 my-56 bg-black absolute mx-auto right-0 left-0 text-white bg-opacity-70"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Enter Full Name"
            className="p-4 my-4 w-full bg-gray-900 rounded-lg"
          ></input>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Enter Email"
          className="p-4 my-4 w-full bg-gray-900 rounded-lg"
        ></input>
        <input
          ref={password}
          type="password"
          placeholder="Enter Password"
          className="p-4 my-4 w-full bg-gray-900 rounded-lg"
        ></input>
        <p className="text-red-700 font-bold text-lg py-3">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer underline" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Signup Now"
            : "Already Resigtered? Sign Up Now"}
        </p>
      </form>
    </div>
  );
};
export default Login;
