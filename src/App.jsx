import { useState } from "react";
import Header from "./components/Header";
import Summarizer from "./components/SummarizerButton";
import TranslateButton from "./components/TranslateButton";
import Home from "./page/Home";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = sessionStorage.getItem("darkMode");
    return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
  });
  return (
    <div className="p-4 bg-[#F7F8FA] h-screen dark:bg-[#1E1E1E] dark:text-white">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* <Summarizer /> */}
      <div className="flex  flex-col h-[90%]">
        <Home />
      </div>
      {/* <TranslateButton /> */}
    </div>
  );
};

export default App;
