import React, { useState } from "react";
import Backdrop from "../../components/Backdrop";
import AllProducts from "./AllProducts";
import Sort from "./Sort";
import Filter from "./filter/Filter";

export default function ProductsPage() {
  const [filterExtend, setFilterExtend] = useState(false);

  const handleFilterExtend = () => {
    setFilterExtend(!filterExtend);
  };

  return (
    <>
      {/* Backdrop */}
      <Backdrop show={filterExtend} onClick={handleFilterExtend} />

      <div className="bg-slate-100">
        <div className="custom-container flex l gap-4">
          <div
            className={`lg:bg-transparent bg-white lg:shadow-none shadow-md lg:w-60 w-80 lg:static lg:h-auto h-screen overflow-y-scroll fixed inset-y-0 lg:z-0 z-50 ${
              filterExtend ? "left-0" : "-left-80"
            }`}
          >
            <Filter />
          </div>
          <div className="flex-1">
            <Sort handleFilterExtend={handleFilterExtend} />
            <AllProducts />
          </div>
        </div>
      </div>
    </>
  );
}
