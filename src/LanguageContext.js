
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import { translateText } from "./translationApi";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const translate = useCallback(
    async (text) => {
      if (!text) return text;

      if (language === "en") {
        return text;
      }

      return await translateText(text, language);
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translate }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
