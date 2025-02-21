import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import Button from "../components/Button";
import TranslateButton from "../components/TranslateButton";
import SpotlightCard from "../ui/Card";
import Summarizer from "../components/SummarizerButton";

export default function MessageList({ messages, loading, translatedText, text }) {
  const [displayTranslate, setDisplayTranslate] = useState({});
  const [displaySummary, setDisplaySummary] = useState({});

  const handleTranslateClick = (index) => {
    setDisplayTranslate((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSummaryClick = (index) => {
    setDisplaySummary((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="h-auto max-h-[100vh] overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col mb-4 md:mx-4">
          <div className="flex justify-end ">
            <ChatBubble input={message} className="self-end " />
          </div>
          <div className="flex justify-end mt-2">
            <Button onClick={() => handleSummaryClick(index)} type="feature">
              <span className="relative px-3 py-2.5 transition-all ease-in duration-75  rounded-md text-black">
                Summarize
              </span>
            </Button>
            <Button onClick={() => handleTranslateClick(index)} type="feature">
              <span className="relative px-3 py-2.5 transition-all ease-in duration-75  rounded-md text-black">
                Translate
              </span>
            </Button>
          </div>
          {(displayTranslate[index] || displaySummary[index]) && (
            <div className="w-full flex justify-center space-x-5 mt-2">
              <div className="md:hidden">
                <Button type="feature">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#4A4A4A] rounded-md text-black">
                    <TranslateButton input={message} />
                  </span>
                </Button>
              </div>
              {displayTranslate[index] && (
                <SpotlightCard
                  className="custom-spotlight-card w-fit h-fit hidden md:block"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <TranslateButton input={text} />
                </SpotlightCard>
              )}

              {displaySummary[index] && (
                <SpotlightCard
                  className="custom-spotlight-card w-fit h-fit hidden md:block"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <Summarizer input={text} />
                </SpotlightCard>
              )}
            </div>
          )}
          {loading && (
            <div className="flex flex-row gap-2 mt-2">
              <div className="w-3 h-3 rounded-full bg-[#4A4A4A] animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-[#4A4A4A] animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-3 h-3 rounded-full bg-[#4A4A4A] animate-bounce [animation-delay:-.5s]"></div>
            </div>
          )}
          {translatedText && displayTranslate[index] && (
            <div className="mt-4 p-4 border max-w-[30rem] relative right-[-1rem] flex flex-start flex-col text-white rounded-r-xl rounded-b-xl bg-[#4A4A4A] w-fit">
              <h3 className="font-bold">Translation:</h3>
              <p>{translatedText}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}