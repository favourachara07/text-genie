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
    detectedLanguage,
    setDetectedLanguage,
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
    <div className="flex flex-col w-full md:w-auto justify-end items-end space-y-2">
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
          <p className="mb-2 hidden md:block text-white">{detectedLanguage}</p>

          <label className="block font-medium mb-2 text-white">
            Translate to:
            <select
              className="ml-2 p-1 border rounded bg-gray-700 text-white"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="pt">Portuguese</option>
              <option value="es">Spanish</option>
              <option value="ru">Russian</option>
              <option value="tr">Turkish</option>
              <option value="fr">French</option>
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
              otherClass="py-2.5 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Translate"
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default TranslateButton;