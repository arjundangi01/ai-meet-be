# Step 1: Build stage
FROM node:18 AS builder

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS
RUN npm run build


# Step 2: Production stage
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy only package.json for prod deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy dist + prisma + generated client
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /usr/src/app/prisma ./prisma

# Start app
CMD ["node", "dist/main.js"]
