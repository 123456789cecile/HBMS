
import React, { useState } from "react";
import { translateText } from "./translationApi";

function TranslationTest() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleTranslate() {
    setLoading(true);
    setError("");

    try {
      const translated = await translateText(
        "Welcome to the hospital",
        "rw"
      );

      setResult(translated);
    } catch (err) {
      setError("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
        <TranslationTest />
      <h2>Language Translator Test</h2>

      <p>Original: Welcome to the hospital</p>

      <button onClick={handleTranslate} disabled={loading}>
        {loading ? "Translating..." : "Translate to Kinyarwanda"}
      </button>

      {result && <p>Translation: {result}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TranslationTest;
