
function App() {
  
  return (

    <div className="mx-6 px-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-[20px] grid-rows-3 p-6 flex flex-col gap</div>-3">
        <h3 className="text-heading-3 font-bold text-white px-8">Daily Expenses</h3>
        <p className="text-body text-gray-300 px-8">
          For Today's Week</p>
        <ul className="list-disc list-inside px-20 mt- text-white">
          <li className="text-body  font-bold">Groceries <span className="font-thin"> - ₱ 500</span></li>
          <li className="text-body font-bold">Transport <span className="font-thin"> - ₱ 150</span></li>
          <li className="text-body font-bold">Utilities <span className="font-thin"> - ₱ 200</span></li>
          <li className="text-body font-bold">Entertainment <span className="font-thin"> - ₱ 300</span></li>
        </ul>
      </div>     
      
    
  );
}

export default App;
