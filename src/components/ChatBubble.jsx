import { useContext } from "react";
import { TranslateContext } from "../context/TranslateContext";

export default function   ChatBubble({input}) {
  const {name}= useContext(TranslateContext);
  return (
    <div className="flex items-start justify-end gap-2.5 ">

      <div className="flex flex-col  w-fit max-w-[25rem] leading-1.5 p-4 border-gray-200 bg-[#4A4A4A] rounded-s-xl rounded-ee  ">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {input}
        </p>
        {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span> */}
      </div>
  
    </div>
  );
}
