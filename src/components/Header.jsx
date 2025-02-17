import { BsMoon, BsSun } from "react-icons/bs";
import GradientText from "../ui/GradientText";
import { useEffect } from "react";

export default function Header({ setDarkMode, darkMode }) {
    useEffect(() => {
        sessionStorage.setItem("darkMode", JSON.stringify(darkMode));
      
        if (darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }, [darkMode]);
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
      {darkMode ?<BsSun onClick={()=>setDarkMode(false)} className="text-[#40ffaa] text-4xl" /> : <BsMoon onClick={()=>setDarkMode(true)} className="text-[#40ffaa] text-4xl" /> }
    </header>
  );
}
