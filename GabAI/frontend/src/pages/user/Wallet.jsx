import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Greet from "../../components/Greet";
import Features from "../../components/Features";
import TransactionLog from "../../components/TransactionLog";
import TransactionCategory from "../../components/TransactionCategory";

function Wallet() {
  const { user } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const { income = {}, expense = {} } = userData;

          // Convert maps to arrays and add type information
          const incomeArray = Object.keys(income).map(key => ({ id: key, ...income[key], type: 'income' }));
          const expenseArray = Object.keys(expense).map(key => ({ id: key, ...expense[key], type: 'expense' }));

          // Combine income and expense arrays
          const allTransactions = [...incomeArray, ...expenseArray];

          // Sort transactions by date in descending order
          allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

          setTransactions(allTransactions);
        } else {
          console.error("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching transactions data: ", error);
      }
    };

    fetchTransactions();
  }, [user]);

  const name = "John Doe"; // Replace with the user's actual name if needed

  return (
    <section className="bg-gray-200 min-h-screen py-4"> 
      <Greet name={name} />
      <Features />
      <article className="px-6 py-4">
        <p className="text-body text-black py-4">All transactions</p>
        <TransactionLog showNavigation={false}>
          {transactions.map((transaction, index) => (
            <TransactionCategory
              key={index}
              category={transaction.category}
              date={transaction.date}
              value={transaction.amount}
            />
          ))}
        </TransactionLog>
      </article>
    </section>
  );
}

export default Wallet;
