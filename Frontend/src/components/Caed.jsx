import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Caed = ({ id }) => {
  console.log(id);
  const [Data, setData] = useState({});

  const fetchData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/single/single/${id}`
    );
    const data = await response.json();
    if (response.status !== 200) {
      console.error(data);

      return;
    } else {
      console.log(data);
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="text-center bg-gray-300 p-4 rounded-lg w-[calc(25%-1rem)]">
      <img
        src={`${
          import.meta.env.VITE_REACT_APP_URL
        }/products/product/${id}/image/${0}`}
        alt="sdfdf"
      />

      <h3 className="text-2xl font-semibold mb-2">{Data?.product?.name}</h3>
      {/* <p className="text-gray-500 mb-2">{"model.displaySize"}</p> */}
      <p className="text-xl mb-1">{Data?.product?.price}</p>
      {/* <p className="text-gray-500 text-sm mb-4">
        From {"model.monthly"} with instant cashback*
      </p> */}
      <Link
        to={`/${id}`}
        className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg z-50"
      >
        See Product
      </Link>
    </div>
  );
};

export default Caed;
