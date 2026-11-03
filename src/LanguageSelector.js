
import React from "react";
import { useLanguage } from "./LanguageContext";

function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(event) => setLanguage(event.target.value)}
      aria-label="Choose language"
    >
      <option value="en">English</option>
      <option value="rw">Kinyarwanda</option>
    </select>
  );
}

export default LanguageSelector;
