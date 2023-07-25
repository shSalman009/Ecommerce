import React, { useState } from "react";
import Backdrop from "./Backdrop";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

export default function Header() {
  const [navExtended, setNavExtended] = useState(false);

  const handleNavExtended = () => {
    setNavExtended(!navExtended);
  };

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-40">
        <Topbar handleNavExtended={handleNavExtended} />
        <Navbar extend={navExtended} />
      </div>
      <Backdrop show={navExtended} onClick={handleNavExtended} zIndex={30} />
    </>
  );
}
