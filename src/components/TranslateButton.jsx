import { useState, useEffect, useContext } from "react";
import { TranslateContext } from "../context/TranslateContext";
import {
  initializeLanguageDetector,
  detectLanguage,
  translateText,
} from "../utils";

const TranslateButton = () => {
  const {
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
  } = useContext(TranslateContext);

  useEffect(() => {
    // Check if AI Translation and Language Detection APIs are supported
    if (
      "ai" in self &&
      "translator" in self.ai &&
      "languageDetector" in self.ai
    ) {
      initializeLanguageDetector(setDetector, setIsSupported);
    } else {
      alert(
        "Your browser doesn't support the AI Translator or Language Detector API."
      );
    }
  }, []);

  return (
    <div className="p-4 max-w-full flex flex-col justify-end items-end">


      {!isSupported && (
        <div className="bg-red-500 text-white p-2 rounded">
          Your browser doesn&apos;t support the Translator or Language Detector APIs.
        </div>
      )}

      {isSupported && (
        <>
          <p className="mb-2 text-gray-700">{detectedLanguage}</p>

          <label className="block font-medium mb-2">
            Translate to:
            <select
              className="ml-2 p-1 border rounded"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ja">Japanese</option>
              <option value="es">Spanish</option>
            </select>
          </label>

          <button
            onClick={() =>
              translateText(
                detector,
                text,
                selectedLanguage,
                setTranslatedText,
                setLoading
              )
            }
            className="bg-blue-500 text-white px-4 max-w-20 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Translating..." : "Translate"}
          </button>

          {translatedText && (
            <div className="mt-4 p-2 border relative right-[50rem] flex flex-start flex-col rounded bg-gray-100">
              <h3 className="font-bold">Translation:</h3>
              <p>{translatedText}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TranslateButton;