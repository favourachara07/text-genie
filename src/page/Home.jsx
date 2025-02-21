import { useContext, useState } from "react";
import Button from "../components/Button";
import SplitText from "../ui/SplitText";
import { TranslateContext } from "../context/TranslateContext";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import Welcome from "../components/Welcome";
import SpotlightCard from "../ui/Card";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const {
    text,
    setText,
    translatedText,
    setIsModalOpen,
    loading,
    isModalOpen,
  } = useContext(TranslateContext);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");

  const functions = [
    { name: "Summarize", desc: "Not working at the moment", class:'text-red-500' },
    { name: "Translate", desc: "Translate to different languages", class:'text-[#40ffaa]' },
    { name: "Detect", desc: "Know the language you are typing in", class:'text-[#40ffaa]' },
  ];

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    console.log("Name submitted:", name);
    setIsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {isModalOpen && <Welcome />}

      {messages.length === 0 && (
        <div className="flex justify-center items-center flex-col">
          <SplitText
            text="Summarize? Translate? What do you need help with?"
            className="text-2xl font-semibold text-center mt-20 text-white"
            delay={50}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <div className="flex gap-3 mt-3">
            {functions.map((fun, index) => (
              <SpotlightCard
                key={index}
                className="custom-spotlight-card md:w-[12rem] md:h-[10rem] p-4"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <h2 className={`${fun.class} md:text-[#7e7e7e] font-medium`}>{fun.name}</h2>
                <p className={` hidden md:block ${fun.class} `}>{fun.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      )}

      <MessageList
        messages={messages}
        loading={loading}
        translatedText={translatedText}
        text={text}
      />

      <MessageForm
        inputValue={inputValue}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}