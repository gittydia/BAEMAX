import { NavLink, Link } from "react-router-dom";
import { useContext, useState } from "react";
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
import { GoogleGenerativeAI } from "@google/generative-ai";

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-gray-800 w-12 h-12 flex items-center justify-center rounded-md duration-300 bg-gray-200"
      : " text-white hover:bg-gray-300 hover:text-gray-800 w-12 h-12 flex items-center justify-center p-4 rounded-md duration-300";

  const { user } = useContext(UserContext);

  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const genAI = new GoogleGenerativeAI("AIzaSyB15xXfGSoLeX9sIdiNq0QBJ5a1jxWQnGE"); // Replace with your actual API key

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction:
      "You talks like a financial advisor helping out - no fancy money words or complicated terms allowed. When you give advice, keep it straight to the point,short,  practical, and something people can start doing right away. Always be encouraging and never judge anyone's money situation, making sure to explain any financial terms in the most basic way possible. TAKE NOTE! MAKE IT A 2 SENTENCE AS MUCH AS POSSIBLE AND BE REALISTIC. DON'T ANSWER QUESTIONS THAT IS NOT RELATED TO MONEY AND FINANCE. BE A GOOD FINANCIAL ADVISOR!",
  });

  const generationConfig = {
    temperature: 1.6,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    try {
      const result = await chatSession.sendMessage(userInput);
      setAiResponse(result.response.text());
    } catch (error) {
      console.error("Error:", error);
      setAiResponse("An error occurred. Please try again later.");
    }
  };
  

  return (
    <>
      {user ? (
        <div className="relative">
          <input type="checkbox" id="menu-toggle" className="hidden peer" />
          <label htmlFor="menu-toggle" className="cursor-pointer">
            <i className="fa-solid fa-bars mt-4 ml-5 absolute text-white"></i>
          </label>
          <div className="fixed top-0 left-0 w-80 h-full bg-gray-800 text-white transform -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0" id="sidebar">
            <label htmlFor="menu-toggle" className="absolute top-4 right-4 cursor-pointer">
              <i className="fa-solid fa-times"></i>
            </label>
            <div className="p-4 mt-10">
              <form onSubmit={handleSubmit}>
                <input 
                  className="primary-input flex items-center gap-4 bg-gray-800"
                  type="text"
                  placeholder="Ask"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)} 
                />
                <textarea 
                  className="primary-input flex gap-4 mt-8 h-72 bg-gray-800"
                  placeholder="AI answers will be displayed here"
                  value={aiResponse} 
                  readOnly 
                />
                <button type="submit" className="hidden">Submit</button> 
              </form>
            </div>
          </div>

          <div className="flex justify-center gap-5 md:gap-16">
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
                  <Link to={'/income'}><AlertDialogAction className="w-full"><Button className="text-body text-inc-900 uppercase text-center text-white bg-green-500 hover:bg-green-900 font-bold tracking-f-widest w-full">Add Income 💸</Button></AlertDialogAction></Link>
                  <Link to={'/expense'}><AlertDialogAction className="w-full"><Button className="text-body text-inc-900 uppercase text-center text-white bg-red-500 hover:bg-red-900 font-bold tracking-f-widest w-full">Add Expense 🚀</Button></AlertDialogAction></Link>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="w-full bg-gray-800 hover:bg-gray-400 hover:text-gray-800 border-0 text-white uppercase">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <NavLink to={"/settings"} title="Settings" className={linkClass}>
              <i className="fa-solid fa-gear"></i>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="flex gap-5 md:gap-8 justify-center">
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
