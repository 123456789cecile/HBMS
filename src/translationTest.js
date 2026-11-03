
import { translateText } from "./translationApi";

async function testTranslation() {
  try {
    const result = await translateText(
      "Welcome to the hospital",
      "rw"
    );

    console.log("Translation result:", result);
  } catch (error) {
    console.error("Translation failed:", error);
  }
}

testTranslation();
