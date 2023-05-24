import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function PageNotFound() {
  const navigate = useNavigate();

  // navigate to back page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-950 font-semibold">
      <h2 className="text-8xl text-gray-500">404</h2>
      <h2 className="text-4xl text-gray-200 mb-6">Page Not Found</h2>
      <Button
        onClick={goBack}
        text="Go Back"
        Icon={BsArrowLeft}
        IconRight={false}
        animation={false}
      />
    </div>
  );
}
