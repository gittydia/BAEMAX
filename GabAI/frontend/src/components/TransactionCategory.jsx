function TransactionCategory({category, date, value = 0 }) {
  const isIncome =
    category == "Personal" ||
    category == "Business" ||
    category == "Gifts" ||
    category == "Loan" ||
    category == "Others";
  const isExpense =
    category == "Foods & Drinks" ||
    category == "Shopping" ||
    category == "Transport" ||
    category == "Home Expense" ||
    category == "Bills & Others";

  let categoryColor;
  let setEmoji;

  switch (category) {
    case "Personal":
      categoryColor = "bg-personal";
      setEmoji = '🧍';
      break;
    case "Business":
      categoryColor = "bg-business";
      setEmoji = '💼';
      break;
    case "Gifts":
      categoryColor = "bg-gifts";
      setEmoji = '🎁';
      break;
    case "Loan":
      categoryColor = "bg-loan";
      setEmoji = '💸';
      break;
    case "Others":
      categoryColor = "bg-other-exp";
      setEmoji = '🗂️';
      break;
    case "Foods & Drinks":
      categoryColor = "bg-food";
      setEmoji = '🍔';
      break;
    case "Shopping":
      categoryColor = "bg-sag";
      setEmoji = '🛍️';
      break;
    case "Transport":
      categoryColor = "bg-transport";
      setEmoji = '🚘';
      break;
    case "Home Expense":
      categoryColor = "bg-home";
      setEmoji = '🏠';
      break;
    case "Bills & Others":
      categoryColor = "bg-other-inc";
      setEmoji = '💳';
      break;
    default:
      categoryColor = "bg-zinc-700";
      break;
  }

  return (
    <div className="rounded-2xl bg-gray-400">
    <div className=" grid grid-cols-4 p-4 w-full min-h-[60px] h-3/4 rounded-xl lg:grid-cols-10">
      <div
        className={`${categoryColor} w-12 h-12 rounded-lg p-2 grid self-center`}
      >
        <p className="text-center grid self-center justify-self-center">
          {setEmoji}
        </p>
      </div>
      <div className="grid col-span-2 lg:col-span-8 items-center">
        <p className="text-gray-800 text-small text-left">{category}</p>
        <p className="text-zinc-600 text-pre-title md:text-small text-left">
          {date}
        </p>
      </div>
      <p
        className={
          (isIncome ? "text-secondary" : "text-red-500") +
          " font-bold text-pre-title xs:text-body text-right items-center grid"
        }
      >
        {isIncome && `+ ₱ ${value}`}
        {isExpense && `- ₱ ${value}`}
      </p>
    </div>
    </div>
  );
}

export default TransactionCategory;
