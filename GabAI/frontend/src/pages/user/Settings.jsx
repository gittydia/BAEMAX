import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function Settings() {
  const nav = useNavigate();
  const {user, setUser} = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('You have been logged out successfully!')
      nav('/login')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-200 min-h-screen py-4">
      
      <article className="p-6">
        <h3 className="text-heading-3 tracking-f-small font-bold text-black py-2">
          Settings
        </h3>
        <div
          onClick={handleSignOut}
          className="bg-gray-300 cursor-pointer flex gap-3 p-4 w-full min-h-[60px] h-3/4 rounded-xl lg:grid-cols-10"
        >
          <div className="bg-gray-800 w-12 h-12 rounded-lg p-2 grid self-center">
            <p className="text-center grid self-center justify-self-center fa-solid fa-sign-out-alt text-white"></p>
          </div>
          <div className="flex items-center">
            <p className="text-black text-small">Sign out</p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Settings;
