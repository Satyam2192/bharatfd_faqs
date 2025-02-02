import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import faqModel from './models/faq.model.js';
import faqRoutes from './routes/faq.routes.js';

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const adminBro = new AdminJS({
    databases: [mongoose],
    rootPath: '/admin',
    resources: [{
        resource: faqModel,
        options: {
            properties: {
                'question.en': { type: 'richtext' },
                'question.hi': { type: 'richtext' },
                'question.bn': { type: 'richtext' },
                'answer.en': { type: 'richtext' },
                'answer.hi': { type: 'richtext' },
                'answer.bn': { type: 'richtext' }
            }
        }
    }],
    branding: {
        companyName: 'FAQ Admin'
    }
});

const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'admin'
}

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        if (email === ADMIN.email && password === ADMIN.password) {
            return ADMIN
        }
        return null
    },
    cookiePassword: process.env.COOKIE_SECRET,
    cookieName: 'adminjs',
    sessionOptions: {
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET
    }
});

const app = express();
app.use(express.json());
app.use(adminBro.options.rootPath, adminRouter);
app.use('/api/faqs', faqRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`AdminJS at http://localhost:${PORT}${adminBro.options.rootPath}`);
    });
}

export default app;
