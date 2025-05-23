# Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --force && \
    npm cache clean --force

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Create non-root user and set permissions
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

EXPOSE 8000

CMD [ "npm", "start" ]