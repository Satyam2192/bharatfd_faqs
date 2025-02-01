import express from 'express';
import { formidable } from 'formidable';
import { getFAQs, createFAQ } from '../controllers/faq.controllers.js';

const router = express.Router();

router.get('/', getFAQs);
router.post('/', createFAQ);

router.post('/upload', async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true
  });
  
  try {

    const { fields, files } = await form.parse(req);
    res.json({ fields, files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
