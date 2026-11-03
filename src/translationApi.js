
export async function translateText(text, targetLanguage) {
  if (!text || !text.trim()) {
    return text;
  }

  if (targetLanguage === "en") {
    return text;
  }

  const url = new URL(
    "https://api.mymemory.translated.net/get"
  );

  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `en|${targetLanguage}`);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Translation API request failed");
    }

    const data = await response.json();

    if (data.responseStatus !== 200) {
      throw new Error("Translation was not successful");
    }

    return data.responseData.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
}
