import { useState, useContext } from "react";
import { registerUser } from "../../controllers/user";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { auth, db, googleProvider } from "../../../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import bcryptjs from "bcryptjs";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";


function Register() {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmedPwd, setShowConfirmedPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(
        formData.email,
        formData.password,
        formData.confirmedPassword
      );

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const salt = await bcryptjs.genSalt(10);
      const saltedPassword = formData.password + salt;
      const hashedPassword = await bcryptjs.hash(saltedPassword, 10);

      // Create a document with the user's UID as the document ID
      const userDocRef = doc(db, "users", userCredential.user.uid);
      
      // Add user data to the newly created document
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: hashedPassword,
        income: [],
        expense: [],
      });

      nav("/login");
      toast.success("Your account has been successfully registered.");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/weak-password":
            toast.error(
              "The password is too weak: Please choose a stronger password."
            );
            break;
          case "auth/email-already-in-use":
            toast.error(
              "The email address is already in use by another account."
            );
            break;
          case "auth/invalid-email":
            toast.error(
              "Please use a valid Gmail account for registration."
            );
            break;
          default:
            toast.error(error.message);
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  const createAccountWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success("Your account has been successfully registered!");
      setUser(result.user);
      nav("/dashboard");
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
    <section className="min-h-screen bg-gradient-to-r from-gray-400 to-gray-300">
      <article className="p-6">
        <Link to={'/'}>
          <div className="returnBtn">
            <i className="fa-solid fa-arrow-left text-white"></i>
          </div>
        </Link>
        <h1 className="text-right text-heading-3 font-bold pb-4 tracking-f-small leading-snug">
          Unlock the power
          <br />
          of financial control
          <br />
          at your fingertips
          <br />
          swiftly.
          <br />
        </h1>
      </article>
      <article className=" bg-gradient-to-r from-gray-200 to-gray-100 w-full py-16 lg:h-[calc(50vh+500px)] px-6 rounded-t-[30px] flex flex-col gap-4">
        <h2 className="text-heading-3 font-bold text-gray-800 tracking-f-small py-5">
          Create <span className="text-gray-500">Account</span>
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-1">
            <label className="primary-label text-gray-800" htmlFor="firstName">
              First Name <span className="text-gray-800">*</span>
            </label>
            <input
              className="primary-input bg-gray-300 text-white"
              name="firstName"
              type="text"
              placeholder="Ex. John"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="primary-label text-gray-800" htmlFor="lastName">
              Last Name <span className="text-gray-800">*</span>
            </label>
            <input
              className="primary-input bg-gray-300 text-white"
              name="lastName"
              type="text"
              placeholder="Ex. Doe"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="primary-label text-gray-800" htmlFor="email">
              Email <span className="text-gray-800">*</span>
            </label>
            <input
              className="primary-input bg-gray-300 text-white"
              type="email"
              placeholder="hello@gmail.com"
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
                className="primary-input bg-gray-300 text-white"
                type={showPwd ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                minLength="8"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <i
                onClick={() => setShowPwd(!showPwd)}
                className={`cursor-pointer text-gray-800 fa-solid ${
                  showPwd ? "fa-eye" : "fa-eye-slash"
                } absolute right-1 pr-2 bg-gray-300`}
              ></i>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="primary-label text-gray-800" htmlFor="confirmPassword">
              Confirm Password <span className="text-gray-800">*</span>
            </label>
            <div className="flex items-center justify-center relative">
              <input
                className="primary-input bg-gray-300 text-gray-800"
                name="confirmPassword"
                type={showConfirmedPwd ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmedPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmedPassword: e.target.value,
                  })
                }
                required
              />
              <i
                onClick={() => setShowConfirmedPwd(!showConfirmedPwd)}
                className={`cursor-pointer text-gray-800 fa-solid ${
                  showConfirmedPwd ? "fa-eye" : "fa-eye-slash"
                } absolute right-1 pr-2 bg-gray-300`}
              ></i>
            </div>
          </div>
          <button type="submit" className="primary-btn">
            CREATE AN ACCOUNT
          </button>
        </form>
        <div className="grid grid-cols-3 justify-center items-center">
          <hr className="bg-secondary h-[2px] border-0"></hr>
          <p className="text-center text-white text-pre-title">OR</p>
          <hr className="bg-secondary h-[2px] border-0"></hr>
        </div>
        <div onClick={createAccountWithGoogle} className="secondary-btn text-gray-800">
          <i className="fa-brands fa-google text-gray-800"></i> &nbsp;&nbsp;&nbsp;
          Continue with Google
        </div>
        <p className="pt-8 pb-6 text-pre-title text-gray-800 text-center">
          By selecting Create Account, you agree to our{" "}
          <a href="https://firebasestorage.googleapis.com/v0/b/finvue-e2d75.appspot.com/o/terms%20and%20aggrement%2FTerms%20and%20Agreement.pdf?alt=media&token=9ae0ad82-ee3d-4a53-8738-264bcc4a6bea" className="font-bold underline cursor-pointer text-gray-800">
          Terms
          </a>{" "}
          and have read and acknowledge our{" "}
          <a href="https://firebasestorage.googleapis.com/v0/b/finvue-e2d75.appspot.com/o/terms%20and%20aggrement%2FRA-10173-Data-Privacy-Act-of-2012.pdf?alt=media&token=badaab91-6e83-4f30-85ab-716ae2c1df08" className="font-bold underline cursor-pointer text-gray-800">
            Global Privacy Statement
          </a>
          .
        </p>
      </article>
    </section>
    
  );
}

export default Register;