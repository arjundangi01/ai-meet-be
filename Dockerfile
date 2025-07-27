FROM node:18

WORKDIR /usr/src/app

# Add required packages for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
    libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 \
    libdbus-1-3 libgbm1 libgtk-3-0 libnss3 libxss1 libasound2 \
    --no-install-recommends && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY . .

RUN npm install 

# Copy prisma schema and generate client for correct platform
COPY prisma ./prisma
RUN npx prisma generate


CMD ["node", "dist/main.js"]
