import React from "react";
import { ImSpinner2 } from "react-icons/im";

export default function Loading({ text = "Loading" }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-20">
      <ImSpinner2 className="w-12 h-12 mr-2 text-gray-200 animate-spin fill-blue-600" />
      <span className="block text-2xl font-medium text-white">{text}...</span>
    </div>
  );
}
