import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    en: { type: String, required: true },
    hi: String,
    bn: String,
  },
  answer: {
    en: { type: String, required: true },
    hi: String,
    bn: String,
  }
}, { timestamps: true });

faqSchema.methods.getTranslated = function(lang, field) {
  return this[field][lang] || this[field].en;
};

export default mongoose.model('FAQ', faqSchema);
