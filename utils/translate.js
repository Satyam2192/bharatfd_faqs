import translate from '@vitalets/google-translate-api';

const translateText = async (text, targetLang) => {
  try {
    const { text: translatedText } = await translate(text, { to: targetLang });
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
};

export { translateText };
