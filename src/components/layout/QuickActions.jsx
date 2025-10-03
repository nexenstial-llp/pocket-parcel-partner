/* eslint-disable react/prop-types */
import { useNavigate } from "@tanstack/react-router";

const QuickActions = ({ icon, text, navigateTo }) => {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate({ to: navigateTo });
  };
  return (
    <div
      className=" min-w-44 bg-indigo-50 p-3 rounded-md  border delay-150 hover:border-indigo-400 h-full w-full text-center"
      onClick={handleOnclick}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <div className="bg-white rounded-full w-16 h-16 p-2 flex justify-center items-center">
          {icon}
        </div>
      </div>
      <p className="text-sm leading-5 text-gray-800 font-semibold">{text}</p>
    </div>
  );
};

export default QuickActions;
