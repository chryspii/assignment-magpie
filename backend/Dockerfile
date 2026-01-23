# ================================
# Build stage
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY next.config.ts ./
COPY tsconfig.json ./
COPY prisma.config.ts ./prisma.config.ts
COPY app ./app
COPY lib ./lib
COPY prisma ./prisma
COPY trigger ./trigger

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
RUN npm run build


# ================================
# Runtime stage
# ================================
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Copy runtime artifacts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/app ./app
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/trigger ./trigger

EXPOSE 3000

CMD ["npm", "run", "start"]
