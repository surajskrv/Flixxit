FROM node:18-alpine

WORKDIR /app

# Copy root dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy backend source code
COPY backend ./backend

EXPOSE 5000

CMD ["npm", "start"]
