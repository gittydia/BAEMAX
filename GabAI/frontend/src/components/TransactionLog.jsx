import React from "react";
import { Link } from "react-router-dom";

function TransactionLog({ children, showNavigation }) {
  return (
    <article className="px-6 flex-col flex gap-3 py-4 rounded-2xl">
      {showNavigation && (
        <p className="text-body text-black py-4">
          Last 10 Transactions &gt;{" "}
          <Link to="/wallet" className="text-body underline font-bold">
            View All
          </Link>
        </p>
      )}
      {children}
    </article>
  );
}

export default TransactionLog;
