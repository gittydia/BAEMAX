import CardFeatures from "./CardFeatures";
import {Link} from 'react-router-dom'

function Features() {
  return (
    <article className="px-6 py-4 bg-gray-200">
      <p className="text-body text-gray-800 py-4">Other features</p>
      <div className="flex flex-col gap-2">
        <Link to={'/emergency-fund'}>
          <CardFeatures bgColor={'bg-red-500'} icon={'fa-solid fa-house-fire'} featureName={"Emergency Fund"}/>
        </Link>
        <Link to={'/tax-calculator'}>
          <CardFeatures bgColor={'bg-green-500'} icon={'fa-solid fa-money-bill'} featureName={"Salary Tax Calculator"}/>
        </Link>
      </div>
    </article>
  );
}

export default Features;
