import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./page/Home";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = sessionStorage.getItem("darkMode");
    return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    sessionStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    // dark:bg-[#1E1E1E] dark:text-white F7F8FA
    <div className="p-4 bg-[#1E1E1E] h-screen ">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex  flex-col h-[90%]">
        <Home />
      </div>
    </div>
  );
};

export default App;
