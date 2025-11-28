# ------------------------
# 1. Base Builder Image
# ------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (take advantage of Docker layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy rest of the code
COPY . .

# Build Next.js (production mode)
RUN npm run build


# ------------------------
# 2. Production Runtime Image
# ------------------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary build artifacts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "start"]
