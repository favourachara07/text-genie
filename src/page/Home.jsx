import { useState } from "react";
import Button from "../assets/components/Button";
import ChatBubble from "../assets/components/ChatBubble";

export default function Home() {
    const [userInput, setUserInput] = useState('');
    const [inputValue, setInputValue] = useState('');
  
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setUserInput(inputValue);
    };
  return (
    <div>
      {userInput && <ChatBubble input={userInput} />}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
          type="text"
          placeholder="Type whatever you want"
          className="p-2 rounded-lg border-2 border-gray-300"
          value={inputValue}
          onChange={handleChange}
        />
        <Button type="submit" title="Send" />
      </form>
    </div>
  );
}
