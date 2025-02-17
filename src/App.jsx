import Summarizer from "./components/SummarizerButton";
import TranslateButton from "./components/TranslateButton";
import GradientText from "./ui/GradientText";
import Home from "./page/Home";

const App = () => {
  return (
    <div className="p-4 bg-[#F7F8FA] h-screen ">
      <GradientText
        colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
        animationSpeed={3}
        showBorder={false}
        className="custom-class text-3xl"
      >
        TextGenie
      </GradientText>
      {/* <Summarizer /> */}
      <div className="flex  flex-col h-[90%]">
        <Home />
      </div>
      {/* <TranslateButton /> */}
    </div>
  );
};

export default App;
