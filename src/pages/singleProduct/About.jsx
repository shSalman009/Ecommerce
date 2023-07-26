import React from "react";

export default function About({ product }) {
  const { specifications, features } = product || {};

  return (
    <div className="lg:w-4/6 w-full">
      <div className="divide-y">
        <h4 className="p-4 text-2xl font-medium">Specifications</h4>
        {specifications &&
          Object.keys(specifications).map((key, index) => (
            <div
              key={index}
              className="w-full hover:bg-gray-200 flex justify-start items-center p-4"
            >
              <div className="w-80 font-medium">{key}</div>
              <div>{specifications[key]}</div>
            </div>
          ))}
      </div>
      <div className="divide-y">
        <h4 className="p-4 text-2xl font-medium">Features</h4>
        {features &&
          features.length > 0 &&
          features.map((feature, index) => (
            <div
              key={index}
              className="w-full hover:bg-gray-200 flex justify-start items-center p-4"
            >
              <div className="text-lg">{feature}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
