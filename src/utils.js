export const initializeLanguageDetector = async (setDetector, setIsSupported) => {
    try {
      const capabilities = await self.ai.languageDetector.capabilities();
      console.log("Language Detector Capabilities:", capabilities);
  
      if (capabilities.available === "no") {
        console.warn("Language Detector API is not usable.");
        return;
      }
  
      let detectorInstance;
      if (capabilities.available === "readily") {
        detectorInstance = await self.ai.languageDetector.create();
      } else {
        detectorInstance = await self.ai.languageDetector.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Downloading model: ${e.loaded} / ${e.total} bytes`);
            });
          },
        });
        await detectorInstance.ready;
      }
  
      setDetector(detectorInstance);
      setIsSupported(true);
    } catch (error) {
      console.error("Error initializing Language Detector:", error);
    }
  };
  
  export const detectLanguage = async (detector, text, setDetectedLanguage) => {
    if (!detector) {
      console.warn("Language Detector is not ready.");
      return;
    }
  
    try {
      const results = await detector.detect(text);
      if (results.length > 0) {
        const topResult = results[0]; // Most confident language
        setDetectedLanguage(
          `Detected: ${topResult.detectedLanguage} (Confidence: ${Math.round(
            topResult.confidence * 100
          )}%)`
        );
      } else {
        setDetectedLanguage("Could not detect language.");
      }
    } catch (error) {
      console.error("Language detection failed:", error);
      setDetectedLanguage("Detection failed.");
    }
  };
  
  export const translateText = async (
    detector,
    text,
    selectedLanguage,
    setTranslatedText,
    setLoading
  ) => {
    if (!("ai" in self) || !("translator" in self.ai)) {
      console.error("Translation API not available.");
      return;
    }
  
    if (!text.trim()) {
      console.warn("No text to translate.");
      return;
    }
  
    setLoading(true);
  
    try {
      console.log(`Translating from detected to '${selectedLanguage}'`);
      const results = await detector.detect(text);
      const topResult = results[0];
      const lang = topResult.detectedLanguage;
      console.log(lang);
      const translator = await self.ai.translator.create({
        sourceLanguage: lang, // Use detected language
        targetLanguage: selectedLanguage,
      });
  
      const translatedText = await translator.translate(text);
      setTranslatedText(translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Translation failed.");
    }
  
    setLoading(false);
  };