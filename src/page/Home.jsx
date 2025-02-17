import { useContext, useState } from "react";
import Button from "../components/Button";
import ChatBubble from "../components/ChatBubble";
import TranslateButton from "../components/TranslateButton";
import SpotlightCard from "../ui/Card";
import { TranslateContext } from "../context/TranslateContext";
import SplitText from "../ui/SplitText";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const { text, setText, translatedText } = useContext(TranslateContext);
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
            <div key={index}>
              <ChatBubble input={message} />
              <div className="w-full flex justify-center">
                <SpotlightCard
                  className="custom-spotlight-card w-fit"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                <TranslateButton  input={text} />
                </SpotlightCard>
              </div>
            </div>
          ))}
           {translatedText && (
            <div className="mt-4 p-4 border relative right-[-1rem] flex flex-start flex-col text-white rounded-r-xl rounded-b-xl bg-[#4A4A4A] w-fit">
              <h3 className="font-bold">Translation:</h3>
              <p>{translatedText}</p>
            </div>
          )}
          
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
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-white flex justify-between">
          <div className="  rounded-t-lg flex-1 ">
            {/* <label htmlFor="comment" className="sr-only">
              Your comment
            </label> */}
            <textarea
              id="comment"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              rows="4"
              className="w-full px-0 text-sm ml-4 mt-3 text-gray-900 bg-white border-0 focus:ring-0 outline-none focus:ring-transparent  "
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
