import React from "react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import apple_pay from "../../assets/Apple pay.png";
import mastercard from "../../assets/Mastercard.png";
import paypal from "../../assets/Paypal.png";
import visa from "../../assets/Visa.png";

import img from "../../assets/react.svg";

export default function Footer() {
  return (
    <div className="bg-slate-700">
      <div className="container mx-auto px-4 pt-10">
        {/* Newsletter */}

        <div className="sm:text-center flex justify-between">
          <div>
            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-100 sm:text-4xl text-start">
              Sign up for our newsletter
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-400 md:mb-12 sm:text-xl text-start">
              Stay up to date with the roadmap progress, announcements and
              exclusive discounts feel free to sign up with your email.
            </p>
          </div>
          <form action="#">
            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
              <div className="relative w-full">
                <label
                  htmlFor="email"
                  className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  required=""
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
              We care about the protection of your data.{" "}
              <a
                href="#"
                className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
              >
                Read our Privacy Policy
              </a>
              .
            </div>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-5">
          <div>
            <a href="" className="flex items-center mb-4 sm:mb-0">
              <img src={img} className="h-8 mr-3" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Logo
              </span>
            </a>
            <div className="text-gray-300 font-medium capitalize space-y-2">
              <div className="mt-4 flex gap-2 items-start">
                <CiLocationOn size={35} />
                <p>1234 Street Name, City Name, United States</p>
              </div>
              <div className="mt-4 flex gap-2 items-start">
                <CiMail size={22} />
                <a
                  href="mailto:example@mail.com"
                  className="hover:underline block"
                >
                  example@mail.com
                </a>
              </div>{" "}
              <div className="mt-4 flex gap-2 items-start">
                <CiPhone size={25} />
                <a href="tel:+1234567890" className="hover:underline block">
                  +1 234 567 890
                </a>
              </div>
            </div>

            <div className="flex mt-6 space-x-2">
              <a
                href="#"
                className="text-gray-300 hover:text-gray-100 dark:hover:text-white"
              >
                <BsFacebook />
                <span className="sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-gray-100 dark:hover:text-white"
              >
                <BsInstagram />
                <span className="sr-only">Instagram page</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-gray-100 dark:hover:text-white"
              >
                <BsTwitter />
                <span className="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-gray-100 dark:hover:text-white"
              >
                <BsGithub />
                <span className="sr-only">GitHub account</span>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-gray-100 dark:hover:text-white"
              >
                <BsDribbble />
                <span className="sr-only">Dribbble account</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              Company
            </h2>
            <ul className="text-gray-400 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className=" hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Brand Center
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              Help center
            </h2>
            <ul className="text-gray-400 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Discord Server
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              Legal
            </h2>
            <ul className="text-gray-400 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Licensing
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              Download
            </h2>
            <ul className="text-gray-400 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  iOS
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Android
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Windows
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}

        <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 my-4" />
        <div className="sm:flex sm:items-center sm:justify-between pb-4">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex space-x-6 sm:justify-center sm:mt-0">
            <div className="bg-white w-12 px-3 py-1 flex items-center rounded-sm">
              <img className="w-14" src={mastercard} alt="" />
            </div>
            <div className="bg-white w-12 px-3 py-1 flex items-center rounded-sm">
              <img className="w-14" src={visa} alt="" />
            </div>{" "}
            <div className="bg-white w-12 px-3 py-1 flex items-center rounded-sm">
              <img className="w-14" src={paypal} alt="" />
            </div>{" "}
            <div className="bg-white w-12 px-3 py-1 flex items-center rounded-sm">
              <img className="w-14" src={apple_pay} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
