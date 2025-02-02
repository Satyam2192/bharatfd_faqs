FROM node:16-alpine

WORKDIR /app

# Copy dependency manifests 
COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
