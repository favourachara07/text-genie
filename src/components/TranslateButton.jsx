import { useState, useEffect, useContext } from "react";
import { TranslateContext } from "../context/TranslateContext";
import {
  initializeLanguageDetector,
  detectLanguage,
  translateText,
} from "../utils";
import Button from "./Button";

const TranslateButton = ({ input }) => {
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
    setDisplayTranslate,
  } = useContext(TranslateContext);

  const [checkingSupport, setCheckingSupport] = useState(true);

  useEffect(() => {
    // Check if AI Translation and Language Detection APIs are supported
    if (
      "ai" in self &&
      "translator" in self.ai &&
      "languageDetector" in self.ai
    ) {
      initializeLanguageDetector(setDetector, setIsSupported).finally(() => {
        setCheckingSupport(false);
      });
    } else {
      alert(
        "Your browser doesn't support the AI Translator or Language Detector API."
      );
      setCheckingSupport(false);
    }
  }, []);

  useEffect(() => {
    if (input && detector) {
      detectLanguage(detector, input, setDetectedLanguage);
    }
  }, [input, detector]);

  return (
    <div className="flex flex-row md:flex-col w-fit justify-end items-end">
      {checkingSupport ? (
        <div className="bg-gray-200 text-gray-700 p-2 rounded">
          Checking support...
        </div>
      ) : !isSupported ? (
        <div className="bg-red-500 text-white p-2 rounded">
          Your browser doesn&apos;t support the Translator or Language Detector APIs.
        </div>
      ) : (
        <>
          <p className="mb-2 hidden md:block text-gray-700">{detectedLanguage}</p>

          <label className="block font-medium mb-[0.3rem] mr-2 md:mr-0">
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

          <Button
            onClick={() => {
              translateText(
                detector,
                text,
                selectedLanguage,
                setTranslatedText,
                setLoading
              );
              setDisplayTranslate(false);
            }}
            title={loading ? "Translating..." : "Translate"}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          />
        </>
      )}
    </div>
  );
};

export default TranslateButton;