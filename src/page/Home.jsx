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
  // const functions = [
  //   { functionName: "summarize", functionDescription: "Summarize the text" },
  //   { functionName: "translate", functionDescription: "Translate the text" },
  // ];

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    messages.push(inputValue);
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
      {text && (
        <div className="h-auto max-h-[100vh] overflow-y-auto ">
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col items-end">
              <ChatBubble input={message} />
              <div className="fle mt-2">
                <Button type="feature"  >
                <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md text-black ">
                      Summarize
                    </span>
                </Button>
                <Button
                  onClick={() => setDisplayTranslate(true)}
                  type="feature"
                >
                  <span className="relative px-3 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md text-black ">
                      Translate
                    </span>
                </Button>
              </div>
              {displayTranslate && (
                <div className="w-full flex justify-center">
                  <div className="md:hidden">
                    <Button type="feature">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md text-black ">
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
            </div>
          ))}
          {loading ? (
            // <div className="mt-4 p-4 border relative right-[-1rem] flex flex-start flex-col text-white rounded-r-xl rounded-b-xl bg-[#4A4A4A] w-fit">
            //   <h3 className="font-bold">Translation:</h3>
            //   <p>Loading...</p>
            // </div>
            /* From Uiverse.io by Javierrocadev */
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
          ) : translatedText ? (
            <div className="mt-4 p-4 border relative right-[-1rem] flex flex-start flex-col text-white rounded-r-xl rounded-b-xl bg-[#4A4A4A] w-fit">
              <h3 className="font-bold">Translation:</h3>
              <p>{translatedText}</p>
            </div>
          ) : null}
        </div>
      )}
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
        // <h2 className="font-bold text-2xl text-center mt-24">How can i help you today</h2>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col justify-between">
        <div className="w-full mb-8 border h-16 md:h-full rounded-[2rem] bg-white flex justify-between  border-[#40ffaa]">
          <div className="  rounded-lg flex-1 overflow-hidden">
            {/* <label htmlFor="comment" className="sr-only">
              Your comment
            </label> */}
            <textarea
              id="comment"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              rows="4"
              className="w-full px-0 text-sm ml-4 mt-3 text-gray-900 bg-white border-0 focus:ring-0 outline-none focus:ring-transparent  resize-none"
              placeholder="Ask whatever you want"
            ></textarea>
          </div>
          <div className="flex items-center justify-between mr-2 border-gray-200">
            <Button type="submit" title="Send" />
          </div>
        </div>
      </form>
    </div>
  );
}
