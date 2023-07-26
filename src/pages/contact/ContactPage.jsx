import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { error, success } from "../../utils/Alert";

export default function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_mq6oty7",
        "template_abhnhd8",
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          if (result.text === "OK") {
            success("Your message has been sent successfully");
            form.current.reset();
          }
        },
        () => {
          error("An error occurred, Please try again");
        }
      );
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-700 text-xl">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>

        <div className="flex lg:flex-row flex-col gap-4">
          <div className="lg:w-1/3 w-full">
            <h2 className="text-2xl font-medium mb-4">Points of contacts</h2>
            <div className="mb-2">
              <h4 className="text-lg font-bold text-gray-800">Brand.</h4>
              <p className="italic from-gray-700">
                1234 Street Name, City Name, United States
              </p>
            </div>
            <div className="mb-2">
              <h4 className="text-lg font-bold text-gray-800">Support</h4>
              <p>
                <a
                  className="text-blue-700 font-medium hover:underline"
                  href="mailto:example@mail.com"
                >
                  Example@Mail.Com
                </a>
              </p>
            </div>
            <div className="mb-2">
              <h4 className="text-lg font-bold text-gray-800">Call Us</h4>
              <p>
                <a
                  href="tel:+1234567890"
                  className="text-blue-700 font-medium hover:underline"
                >
                  +1 234 567 890
                </a>
              </p>
            </div>
          </div>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="lg:w-2/3 w-full space-y-8"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                name="user_name"
                id="name"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                name="user_email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                name="message"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-gray-800 border bg-gray-200 rounded-lg"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
