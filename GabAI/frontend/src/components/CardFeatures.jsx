

function CardFeatures({bgColor, icon, featureName}) {
  return (
    <div className="bg-gray-300 flex gap-3 p-4 w-full min-h-[60px] h-3/4 rounded-xl lg:grid-cols-10">
      <div className= {`${bgColor} w-12 h-12 rounded-lg p-2 grid self-center`}>
        <p className="text-center grid self-center justify-self-center">
          <i className={`${icon} text-white`}></i>
        </p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-800 text-small">{featureName}</p>
      </div>
    </div>
  );
}

export default CardFeatures;
