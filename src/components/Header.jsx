import { BsMoon, BsSun } from "react-icons/bs";
import GradientText from "../ui/GradientText";

export default function Header({ setDarkMode, darkMode }) {
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
      };
  return (
    <header className="flex justify-between items-center p-4">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={false}
        className="custom-class text-3xl"
      >
        TextGenie
      </GradientText>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      >
        {darkMode ? <BsSun className="text-yellow-500" /> : <BsMoon className="text-gray-900" />}
      </button>
    </header>
  );
}
