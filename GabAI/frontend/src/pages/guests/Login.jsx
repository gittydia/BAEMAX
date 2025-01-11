import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { loginUser } from "../../controllers/user";
import { auth, googleProvider, db } from "../../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { UserContext } from "../../contexts/UserContext";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Login() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData.email, formData.password);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setUser(userCredential.user);
      toast.success('You have successfully logged in!');
      nav('/dashboard');
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error("Invalid email or password. Please try again.");
            break;
          default:
            toast.error(error.code);
            break;
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  const loginWithGoogleAccount = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userCredential = result.user;

      // Check if the user exists in Firestore
      const userDocRef = doc(db, "users", userCredential.uid);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        // If the user does not exist, add them to Firestore
        await setDoc(userDocRef, {
          uid: userCredential.uid,
          email: userCredential.email,
          displayName: userCredential.displayName,
          balance: 0,
          income: [],
          expense: [],
        });
      }

      setUser(userCredential);
      toast.success("You have successfully logged in!");
      nav('/dashboard');
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            toast.error(
              "The sign-in process was interrupted because the popup was closed. Please try again."
            );
            break;
          default:
            toast.error(error.code);
            break;
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <section className="min-h-screen bg-gray-800 ">
      <article className="p-9">
        <Link to={'/'}>
          <div className="returnBtn bg-gray-800">
            <i className="fa-solid fa-arrow-left text-white"></i>
          </div>
        </Link>
        <h1 className="text-right text-heading-3 font-bold pb-4 tracking-f-small leading-snug text-white">
          Access your financial hub <br/>
          instantly for seamless control <br />
          over your finances.
        </h1>
        
          
          
        
      </article>
      <article className="bg-gradient-to-r from-gray-200 to-gray-100 w-full py-16 lg:h-[calc(50vh+500px)] px-6 rounded-t-[30px] flex flex-col gap-4">
        <h2 className="mt-1 text-heading-3 font-bold text-gray-800 tracking-f-small py-3">
          Log in to Gab<span className="text-gray-500">AI</span>
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label className="primary-label text-gray-800" htmlFor="email">
              Email <span className="text-gray-800">*</span>
            </label>
            <input
              className="primary-input bg-gray-200"
              type="email"
              placeholder="finvue@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="primary-label text-gray-800" htmlFor="password">
              Password <span className="text-gray-800">*</span>
            </label>
            <div className="flex items-center justify-center relative">
              <input
                className="primary-input bg-gray-200"
                type={showPwd ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                min={8}
                required
              />
              <i
                onClick={() => setShowPwd(!showPwd)}
                className={`cursor-pointer text-gray-800 fa-solid ${
                  showPwd ? "fa-eye" : "fa-eye-slash"
                } absolute right-1 pr-2 bg-gray-100`}
              ></i>
            </div>
          </div>
          <button type="submit" className="primary-btn bg-gray-800 text-white">
            Login
          </button>
        </form>
        <div className="grid grid-cols-3 justify-center items-center">
          <hr className="bg-gray-800 h-[2px] border-0"></hr>
          <p className="text-center text-white text-pre-title">OR</p>
          <hr className="bg-gray-800 h-[2px] border-0"></hr>
        </div>
        <div onClick={loginWithGoogleAccount} className="secondary-btn text-gray-800 border-gray-800">
          <i className="fa-brands fa-google text-gray-800"></i> &nbsp;&nbsp;&nbsp;
          Continue with Google
        </div>
        <p className="pt-8 pb-6 text-pre-title text-gray-800 text-center">
          FinVue uses cookies for analytics personalized content and ads. By
          using FinVue&apos;s services you agree to this use of cookies.&nbsp;
          <span className="font-bold underline cursor-pointer">Learn more</span>
        </p>
      </article>
    </section>
  );
}

export default Login;
