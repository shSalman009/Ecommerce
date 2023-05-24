import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const languages = ["English", "Bangla", "Urdu"];
const currencies = ["USD", "TAKA"];

export default function Topbar() {
  // states for dropdown control
  const [currency, setCurrency] = useState(false);
  const [language, setLanguage] = useState(false);

  // states for selected dropdown values
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // handle language select
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setLanguage(false);
  };

  // handle currency select
  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setCurrency(false);
  };

  const languageRef = useRef(null);
  const currencyRef = useRef(null);

  // click outside to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(e.target) &&
        currencyRef.current &&
        !currencyRef.current.contains(e.target)
      ) {
        setLanguage(false);
        setCurrency(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="bg-slate-900 py-1 border-b border-slate-600">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-100 font-medium">
            Free shipping on all orders over $100
          </p>
        </div>

        <div className="flex items-center">
          <p className="border-r border-slate-600 px-4 text-sm text-gray-100 font-medium">
            Hotline : <a href="tel:0123456789">0123456789</a>
          </p>

          <div className="space-x-2">
            {/* Dropdown 1 */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => setLanguage(!language)}
                  type="button"
                  className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm text-gray-100"
                >
                  {selectedLanguage}
                  <IoIosArrowDown />
                </button>
              </div>

              <div
                ref={languageRef}
                className={`absolute right-0 z-10 bg-slate-950 text-white mt-2 w-full origin-top-right rounded-md shadow-lg ${
                  language ? "block" : "hidden"
                }`}
              >
                <div className="py-1">
                  {languages?.map((language) => {
                    return (
                      selectedLanguage !== language && (
                        <div
                          key={language}
                          onClick={() => handleLanguageSelect(language)}
                          className="cursor-pointer block px-4 py-2 text-sm"
                        >
                          {language}
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Dropdown 2 */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => setCurrency(!currency)}
                  type="button"
                  className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm text-gray-100"
                >
                  {selectedCurrency}
                  <IoIosArrowDown className="" />
                </button>
              </div>

              <div
                ref={currencyRef}
                className={`absolute right-0 z-10 bg-slate-950 text-white mt-2 w-full origin-top-right rounded-md shadow-lg ${
                  currency ? "block" : "hidden"
                }`}
              >
                <div className="py-1">
                  {currencies?.map((currency) => {
                    return (
                      selectedCurrency !== currency && (
                        <div
                          key={currency}
                          onClick={() => handleCurrencySelect(currency)}
                          className="cursor-pointer block px-4 py-2 text-sm"
                        >
                          {currency}
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
