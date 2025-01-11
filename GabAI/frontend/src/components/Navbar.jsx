import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-gray-800 w-12 h-12 flex items-center justify-center rounded-md duration-300 bg-gray-200"
      : " text-white hover:bg-gray-300 hover:text-gray-800 w-12 h-12 flex items-center justify-center p-4 rounded-md duration-300";

  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <div className="relative">
          <input type="checkbox" id="menu-toggle" className="hidden peer" />
          <label htmlFor="menu-toggle" className="cursor-pointer">
            <i className="fa-solid fa-bars text-white"></i>
          </label>
          <div className="fixed top-0 left-0 w-80 h-full bg-gray-800 text-white transform -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0" id="sidebar">
            <label htmlFor="menu-toggle" className="absolute top-4 right-4 cursor-pointer">
              <i className="fa-solid fa-times"></i>
            </label>
            <div className="p-4 mt-10">
              <input className="primary-input flex items-center gap-4 bg-gray-800"
                type="email"
                placeholder="Ask"
              />
              <textarea className="primary-input flex gap-4 mt-8 h-72 bg-gray-800"
                placeholder="AI answers will be displayed here"
                readOnly
              />
            </div>
          </div>

          <div className="flex gap-5 md:gap-16 pl-96">
            <NavLink to={"/dashboard"} title="Home" className={linkClass}>
              <i className="fa-solid fa-house"></i>
            </NavLink>
            <NavLink to={"/wallet"} title="Wallet" className={linkClass}>
              <i className="fa-solid fa-wallet"></i>
            </NavLink>
            <AlertDialog>
              <AlertDialogTrigger><i className="fa-solid fa-circle-plus text-white"></i></AlertDialogTrigger>
              <AlertDialogContent className="bg-gray-200 border-0">
                <AlertDialogHeader className="bg-gray-200 w-full">
                  <Link to={'/income'}><AlertDialogAction className="w-full"><Button className="text-body text-inc-900 uppercase text-center bg-secondary font-bold tracking-f-widest w-full">Add Income 💸</Button></AlertDialogAction></Link>
                  <Link to={'/expense'}><AlertDialogAction className="w-full"><Button className="text-body text-inc-900 uppercase text-center text-white bg-red-500 hover:bg-red-900 font-bold tracking-f-widest w-full">Add Expense 🚀</Button></AlertDialogAction></Link>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="w-full bg-gray-200 hover:bg-gray-300 border-0 text-white uppercase">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <NavLink to={"/settings"} title="Settings" className={linkClass}>
              <i className="fa-solid fa-gear"></i>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 md:gap-8">
          <NavLink to='/' title="Home" className={linkClass}>
            <i className="fa-solid fa-house"></i>
          </NavLink>
          <NavLink to={"/login"} title="Login" className={linkClass}>
            <i className="fa-solid fa-right-to-bracket"></i>
          </NavLink>
          <NavLink to={"/register"} title="Register" className={linkClass}>
            <i className="fa-solid fa-user"></i>
          </NavLink>
        </div>
      )}
    </>
  );
}

export default Navbar;
