import { useContext } from "react";
import { TranslateContext } from "../context/TranslateContext";
import Button from "./Button";

export default function Welcome() {
  const { name, setName, setIsModalOpen } = useContext(TranslateContext);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleModalSubmit = (e) => {
    e.preventDefault();
    console.log("Name submitted:", name);
    setIsModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 "
    >
      <div className="relative p-4 w-full max-w-md max-h-full ">
        <div className="relative bg-[#4A4A4A] rounded-lg">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Welcome to TextGenie
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleModalSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="What is your name"
                  required
                />
              </div>
              <div className="flex justify-center">
                <Button otherClass="py-2.5 px-3 w-auto" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
