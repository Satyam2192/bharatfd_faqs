import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';
import FAQ from '../models/faq.model.js';
import redis from '../utils/redis.js';

describe('FAQ API', () => {
  before(async function() {
    this.timeout(10000);
    
    try {
      // Ensure mongoose is disconnected before connecting
      try {
        await mongoose.disconnect();
      } catch (err) {
        // Ignore disconnection errors if not connected
      }
      
      // Wait for MongoDB connection
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/faq_test');
    } catch (err) {
      console.error('Error in before hook:', err);
      throw err;
    }
  });

  beforeEach(async function() {
    this.timeout(5000); 
    try {
      await FAQ.deleteMany({});
      await redis.flush();
    } catch (err) {
      console.error('Error in beforeEach:', err);
    }
  });

  describe('GET /api/faqs', () => {
    it('should get FAQs in English by default', async () => {
      const faq = new FAQ({
        question: { en: 'Test Question', hi: 'टेस्ट प्रश्न' },
        answer: { en: 'Test Answer', hi: 'टेस्ट उत्तर' }
      });
      await faq.save();

      const res = await request(app).get('/api/faqs');
      
      expect(res.status).to.equal(200);
      expect(res.body[0].question).to.equal('Test Question');
      expect(res.body[0].answer).to.equal('Test Answer');
    });

    it('should get FAQs in Hindi', async () => {
      const faq = new FAQ({
        question: { en: 'Test Question', hi: 'टेस्ट प्रश्न' },
        answer: { en: 'Test Answer', hi: 'टेस्ट उत्तर' }
      });
      await faq.save();

      const res = await request(app).get('/api/faqs?lang=hi');
      
      expect(res.status).to.equal(200);
      expect(res.body[0].question).to.equal('टेस्ट प्रश्न');
      expect(res.body[0].answer).to.equal('टेस्ट उत्तर');
    });
  });

  after(async function() {
    this.timeout(5000);
    try {
      // Clean up data
      await FAQ.deleteMany({});
      await redis.flush();
      
      // Close connections
      await mongoose.disconnect();
      const client = await redis.getRedisClient();
      await client.quit();
    } catch (err) {
      console.error('Error in cleanup:', err);
    }
  });
});