import FAQ from '../models/faq.model.js';
import redis from '../utils/redis.js';
import { translateText } from '../utils/translate.js';

const SUPPORTED_LANGS = ['en', 'hi', 'bn'];

const getFAQs = async (req, res) => {
  try {
    const lang = SUPPORTED_LANGS.includes(req.query.lang) ? req.query.lang : 'en';
    const cacheKey = `faqs:${lang}`;

    // Check cache
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(cached);

    // Fetch from DB
    const faqs = await FAQ.find();
    const response = faqs.map(faq => ({
      id: faq._id,
      question: faq.getTranslated(lang, 'question'),
      answer: faq.getTranslated(lang, 'answer')
    }));

    // Cache response
    await redis.set(cacheKey, response);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    
    // Create base FAQ
    const faq = new FAQ({
      question: { en: question },
      answer: { en: answer }
    });

    // Translate to other languages
    for (const lang of SUPPORTED_LANGS.filter(l => l !== 'en')) {
      faq.question[lang] = await translateText(question, lang) || question;
      faq.answer[lang] = await translateText(answer, lang) || answer;
    }

    await faq.save();
    
    // Invalidate cache
    await redis.del(SUPPORTED_LANGS.map(l => `faqs:${l}`));
    
    res.status(201).json(faq);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getFAQs, createFAQ };
