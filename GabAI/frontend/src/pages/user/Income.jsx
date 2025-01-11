import { useState } from "react";
import { db, auth } from "../../../firebase"; // Import firestore and auth from firebase
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import default css for toastify
import { Link } from "react-router-dom";

function Income() {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Personal",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser; // Get the current user
      const uid = currentUser.uid; // Get the UID of the current user
      const userDocRef = doc(db, "users", uid); // Reference to the document of the current user
      const userDocSnap = await getDoc(userDocRef); // Get the snapshot of the user document

      if (userDocSnap.exists()) {
        // If the user document exists, update it with the new income data
        const userData = userDocSnap.data();
        const updatedIncome = [...userData.income, formData];
        await setDoc(userDocRef, { ...userData, income: updatedIncome });
        setFormData({
          amount: "",
          category: "Personal",
          date: "",
        });
        toast.success("Income added successfully!");
      } else {
        // If the user document does not exist, display an error
        console.error("User document does not exist.");
        toast.error("Failed to add income. User document does not exist.");
      }
    } catch (error) {
      console.error("Error adding income: ", error);
      toast.error("Failed to add income. Please try again.");
    }
  };

  return (
    <section className="bg-gray-200 min-h-screen py-4">
      <article className="p-6">
        <Link to={'/dashboard'}>
          <div className="returnBtn bg-gray-800">
            <i className="fa-solid fa-arrow-left text-white"></i>
          </div>
        </Link>
      </article>
      <article className="p-6">
        <h3 className="text-heading-3 tracking-f-small font-bold text-black">
          Add <span className="text-gray-800">Income</span>
        </h3>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
          <div className="grid gap-1">
            <label className="primary-label text-black" htmlFor="amount">
              Amount <span className="text-gray-800">*</span>
            </label>
            <div className="relative">
              <input
                className="primary-input pl-8 text-black bg-gray-300"
                name="amount"
                type="number"
                placeholder="0"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />
              <p className="absolute left-2 top-2 text-black">₱</p>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="primary-label text-black" htmlFor="category">
              Category <span className="text-gray-800">*</span>
            </label>
            <select
              className="primary-input bg-gray-300"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="Personal">Personal 🧍</option>
              <option value="Business">Business 💼</option>
              <option value="Gifts">Gifts 🎁</option>
              <option value="Loan">Loan 💸</option>
              <option value="Others">Others 🗂️</option>
            </select>
          </div>
          <div className="grid gap-1">
            <label className="primary-label text-black" htmlFor="date">
              Date <span className="text-gray-800">*</span>
            </label>
            <input
              className="primary-input bg-gray-300"
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="primary-btn w-full bg-gray-800 text-white">
            ADD INCOME 💸
          </button>
        </form>
      </article>
    </section>
  );
}

export default Income;