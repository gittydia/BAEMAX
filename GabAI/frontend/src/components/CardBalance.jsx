import List from "./List.jsx";

function CardBalance({ balanceTtl, incomeVal, ExpenseVal }) {
  return (
    <div className="min-h-screen bg-gray-200 ">
    <article className="mx-6 px-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-[20px] grid-rows-3 p-6 flex flex-col gap-3">
      <p className="text-body font-bold text-white text-center">
        Total Balance
      </p>
      <h2 className="text-white text-heading-2 font-bold tracking-f-small text-center">
        ₱ {balanceTtl}
      </h2>
      <div className="grid grid-cols-2 gap-2 items-center justify-center">
        <div className="flex justify-center items-center gap-2">
          <div className="bg-gray-800 rounded-full min-w-5 min-h-5 flex justify-center items-center">
            <i className="text-body text-center text-white fa-solid fa-caret-up"></i>
          </div>
          <div className="w-[100px]">
            <p className="text-small font-medium text-white">Income</p>
            <p className="text-small font-bold text-white">₱ {incomeVal}</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="bg-gray-800 rounded-full min-w-5 min-h-5 flex justify-center items-center">
            <i className="text-body text-center text-white fa-solid fa-caret-down"></i>
          </div>
          <div className="w-[100px]">
            <p className="text-small font-medium text-white">Expense</p>
            <p className="text-small font-bold text-white">₱ {ExpenseVal}</p>
          </div>
        </div>
      </div>
    </article>


    <div className="mt-10"></div>
    <List />
    
    </div>
  );
}

export default CardBalance;
