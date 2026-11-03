
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

export default function useTranslatedText(text) {
  const { language, translate } = useLanguage();
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    let active = true;

    async function getTranslation() {
      try {
        const result = await translate(text);

        if (active) {
          setTranslated(result || text);
        }
      } catch (error) {
        console.error("Translation error:", error);

        if (active) {
          setTranslated(text);
        }
      }
    }

    getTranslation();

    return () => {
      active = false;
    };
  }, [text, language, translate]);

  return translated;
}
