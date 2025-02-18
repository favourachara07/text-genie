import { useContext, useState } from "react";
import Button from "../components/Button";
import ChatBubble from "../components/ChatBubble";
import TranslateButton from "../components/TranslateButton";
import SpotlightCard from "../ui/Card";
import { TranslateContext } from "../context/TranslateContext";
import SplitText from "../ui/SplitText";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const {
    text,
    setText,
    translatedText,
    displayTranslate,
    setDisplayTranslate,
    loading,
  } = useContext(TranslateContext);
  const [inputValue, setInputValue] = useState("");

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, inputValue]);
    setText(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
    console.log(messages);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {messages.length === 0 && (
        <SplitText
          text="Summarize? Translate? What do you need help with?"
          className="text-2xl font-semibold text-center mt-20"
          delay={50}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      )}

      <div className="h-auto max-h-[100vh] overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col mb-4">
            <div className="flex justify-end">
              <ChatBubble input={message} className="self-end" />
            </div>
            <div className="flex justify-end mt-2">
              <Button type="feature">
                <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white rounded-md text-black">
                  Summarize
                </span>
              </Button>
              <Button onClick={() => setDisplayTranslate(true)} type="feature">
                <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white rounded-md text-black">
                  Translate
                </span>
              </Button>
            </div>
            {displayTranslate && (
              <div className="w-full flex justify-center mt-2">
                <div className="md:hidden">
                  <Button type="feature">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md text-black">
                      <TranslateButton input={message} />
                    </span>
                  </Button>
                </div>
                <SpotlightCard
                  className="custom-spotlight-card w-fit h-fit hidden md:block"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <TranslateButton input={text} />
                </SpotlightCard>
              </div>
            )}
            {loading && (
              <div className="flex flex-row gap-2 mt-2">
                <div className="w-3 h-3 rounded-full bg-[#4A4A4A] animate-bounce"></div>
                <div className="w-3 h-3 rounded-full bg-[#4A4A4A] animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-3 h-3 rounded-full bg-[#4A4A4A] animate-bounce [animation-delay:-.5s]"></div>
              </div>
            )}
            {translatedText && (
              <div className="mt-4 p-4 border max-w-[30rem] relative right-[-1rem] flex flex-start flex-col text-white rounded-r-xl rounded-b-xl bg-[#4A4A4A] w-fit">
                <h3 className="font-bold">Translation:</h3>
                <p>{translatedText}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col justify-between">
        <div className="w-full mb-8 border h-16 md:h-full rounded-[2rem] bg-white flex justify-between border-[#40ffaa]">
          <div className="rounded-lg flex-1 overflow-hidden">
            <textarea
              id="comment"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              rows="4"
              className="w-full px-0 text-sm ml-4 mt-3 text-gray-900 bg-white border-0 focus:ring-0 outline-none focus:ring-transparent resize-none"
              placeholder="Ask whatever you want"
            ></textarea>
          </div>
          <div className="flex items-center justify-between mr-2 border-gray-200">
            <Button type="submit">
              <span className="relative px-2 py-2 transition-all ease-in duration-75  rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Send
              </span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
