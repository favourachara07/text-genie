import Button from "../components/Button";
import { FaArrowUp } from "react-icons/fa";

export default function MessageForm ({ inputValue, handleChange, handleKeyPress, errorMessage,handleSubmit }){
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between mx-5">
      <div className="w-full mb-8  h-16 md:h-full rounded-[2rem] bg-[#4A4A4A] flex justify-between  hover:shadow-[0_0_10px_5px_rgba(64,255,170,0.1)] transition-all ease-in-out duration-300">
        <div className="rounded-lg flex-1 overflow-hidden mb-1">
          <textarea
            id="comment"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            rows="4"
            className="w-full px-0  ml-4 mt-3 text-[#fff] bg-[#4A4A4A] border-0 focus:ring-0 outline-none focus:ring-transparent resize-none"
            placeholder="Ask whatever you want"
          ></textarea>
        </div>
        <div className="flex items-center justify-between mr-2 border-gray-200">
          <Button type="submit">
            <span className="relative px-2 py-2 transition-all ease-in duration-75 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              <FaArrowUp />
            </span>
          </Button>
        </div>
      </div>
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

