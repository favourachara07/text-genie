import React, { createContext, useState } from "react";

export const TranslateContext = createContext();

export const TranslateProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState(
    "Not sure what language this is"
  );
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [isSupported, setIsSupported] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detector, setDetector] = useState(null);
  const [displayTranslate, setDisplayTranslate] = useState(false);

  return (
    <TranslateContext.Provider
      value={{
        text,
        setText,
        detectedLanguage,
        setDetectedLanguage,
        translatedText,
        setTranslatedText,
        selectedLanguage,
        setSelectedLanguage,
        isSupported,
        setIsSupported,
        loading,
        setLoading,
        detector,
        setDetector,
        displayTranslate, setDisplayTranslate
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};
