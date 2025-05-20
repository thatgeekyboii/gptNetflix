import Header from "../components/Header";
import { useState } from "react";

const Login = () => {

     const [isSignInForm, setisSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setisSignInForm(!isSignInForm)
    }
    return (
        <div> 
        <Header />
        <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/IN-en-20250512-TRIFECTA-perspective_688b8c03-78cb-46a6-ac1c-1035536f871a_large.jpg" className="w-screen h-screen object-cover" alt="home"> 
        </img>
        </div>
        <form className="p-12 w-3/12 my-56 bg-black absolute mx-auto right-0 left-0 text-white bg-opacity-70">
            <h1 className="font-bold text-3xl py-4 ">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && <input type="text" placeholder="Enter Full Name" className="p-4 my-4 w-full bg-gray-900 rounded-lg"></input>}
            <input type="text" placeholder="Enter Email" className="p-4 my-4 w-full bg-gray-900 rounded-lg"></input>
            <input type="text" placeholder="Enter Password" className="p-4 my-4 w-full bg-gray-900 rounded-lg"></input>
            <button className="p-4 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className="py-4 cursor-pointer underline" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Signup Now" : "Already Resigtered? Sign Up Now"}</p>
        </form>
        </div>
    )
}
export default Login;