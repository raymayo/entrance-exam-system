# Base image
FROM node:22

# Set work directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install --only=production

# Copy rest of backend code
COPY . .

# Expose API port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
