import React, { useEffect } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useRemoveOrderMutation } from "../../features/order/orderApi";

export default function Modal({ setModal, id: orderId }) {
  // delete mutation
  const [removeOrder, { isSuccess, isLoading, isError }] =
    useRemoveOrderMutation();

  const handleRemoveOrder = () => {
    removeOrder(orderId);
  };

  // close modal after successfully deleted
  useEffect(() => {
    if (isSuccess) {
      setModal(false);
    }
  }, [isSuccess]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 p-4 flex justify-center items-center overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-md shadow">
          <button
            disabled={isLoading}
            onClick={() => setModal(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          >
            <MdClose className="w-4 h-4" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center space-x-2">
            <BsExclamationCircle className="mx-auto mb-4 text-red-600 w-12 h-12" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this order?
            </h3>{" "}
            <button
              onClick={() => setModal(false)}
              disabled={isLoading}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-sm border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              No, cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleRemoveOrder}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-sm text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
