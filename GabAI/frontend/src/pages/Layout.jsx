import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

function Layout() {
  

  return (
    <>
      <header className="p-3 w-full bg-gray-800 justify-between items-center h-17">
        <Navbar />
      </header>
      <main>
        <Outlet />
        <ToastContainer />
      </main>
    </>
  );
}

export default Layout;
