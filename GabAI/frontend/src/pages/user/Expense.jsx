import React, { useState, useEffect } from "react";
import { db, auth } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Expense({ userBalance }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "Foods & Drinks",
    date: "",
  });
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch user's balance from the database
    const fetchBalance = async () => {
      try {
        const currentUser = auth.currentUser;
        const uid = currentUser.uid;
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setBalance(userData.balance);
        } else {
          console.error("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user balance: ", error);
      }
    };

    fetchBalance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert expense amount to number
    const expenseAmount = parseFloat(formData.amount);
  
    // Check if the expense amount exceeds the user's balance
    if (expenseAmount > balance) {
      toast.error("Expense amount exceeds your balance. Cannot add expense.");
      return;
    }
  
    try {
      const currentUser = auth.currentUser;
      const uid = currentUser.uid;
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedExpense = [...userData.expense, formData];
        await setDoc(userDocRef, { ...userData, expense: updatedExpense });
        setFormData({
          amount: "",
          category: "Foods & Drinks",
          date: "",
        });
        toast.success("Expense added successfully!");
      } else {
        console.error("User document does not exist.");
        toast.error("Failed to add expense. User document does not exist.");
      }
    } catch (error) {
      console.error("Error adding expense: ", error);
      toast.error("Failed to add expense. Please try again.");
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
          Add <span className="text-red-500">Expense</span>
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
          <div className="grid gap-1">
            <label className="primary-label text-black" htmlFor="amount">
              Amount <span className="text-gray-300">*</span>
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
            <label className="primary-label text-black " htmlFor="category">
              Category <span className="text-gray-300">*</span>
            </label>
            <select
              className="primary-input text-black bg-gray-300"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="Foods & Drinks">Foods & Drinks 🍔</option>
              <option value="Shopping">Shopping 🛍️</option>
              <option value="Transport">Transport 🚗</option>
              <option value="Home Expense">Home Expense 🏠</option>
              <option value="Bills & Others">Bills & Others 💳</option>
            </select>
          </div>
          <div className="grid gap-1">
            <label className="primary-label text-black" htmlFor="date">
              Date <span className="text-gray-300">*</span>
            </label>
            <input
              className="primary-input text-black bg-gray-300"
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="primary-btn w-full bg-red-500 text-white"
          >
            ADD EXPENSE 🚀
          </button>
        </form>
      </article>
    </section>
  );
}

export default Expense;