import React from "react";
import { Link } from "react-router-dom";

const IPhoneCard = ({ model, price, image, color }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <img
        src={image}
        alt={`iPhone ${model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">iPhone {model}</h3>
        <p className="text-gray-400 mb-2">From ${price}</p>
        <div className="flex items-center mb-4">
          <span className="mr-2">Color:</span>
          <div className={`w-6 h-6 rounded-full bg-${color}-500`}></div>
        </div>
        <Link to={`/`} className="btn inline-block">
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default IPhoneCard;
