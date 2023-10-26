import { ImSpinner2 } from "react-icons/im";

const spinner = (
  <div className="flex justify-center items-center">
    <ImSpinner2 className="w-8 h-8 mr-2 animate-spin" />
    <span className="sr-only">Loading...</span>
  </div>
);

export const SpinnerButton = ({
  isLoading = false,
  disabled = false,
  type = "button",
  text = "Submit",
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button-one ${className}`}
    >
      {isLoading ? spinner : text}
    </button>
  );
};
