import Summarizer from "./components/SummarizerButton";
import TranslateButton from "./components/TranslateButton";
import Home from "./page/Home";

const App = () => {
  return (
    <div className="p-4 bg-stone-400 h-screen ">
      <h1 className="text-2xl font-bold mb-4">Text-Genie</h1>
      {/* <Summarizer /> */}
      <div className="flex  flex-col h-[90%]">
        
        <Home />
      </div>
      {/* <TranslateButton /> */}
    </div>
  );
};

export default App;
