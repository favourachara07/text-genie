import { useContext, useState } from "react";
import Button from "../components/Button";
import ChatBubble from "../components/ChatBubble";
import TranslateButton from "../components/TranslateButton";
import { TranslateContext } from "../context/TranslateContext";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const { text, setText } = useContext(TranslateContext);
  const [inputValue, setInputValue] = useState("");

  const functions = [
    { functionName: "summarize", functionDescription: "Summarize the text" },
    { functionName: "translate", functionDescription: "Translate the text" },
  ];

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
        <div className="h-auto max-h-[100vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index}>
              <ChatBubble input={message} />
              <TranslateButton index={index} input={text} />
            </div>
          ))}
        </div>
      )}
      {messages.length === 0 && (
        <h2 className="font-bold text-2xl text-center mt-24">How can i help you today</h2>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col justify-between">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-white flex justify-between">
          <div className=" bg-white rounded-t-lg flex-1 ">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
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
