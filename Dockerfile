# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Add build arguments for public environment variables
ARG NEXT_PUBLIC_MAPBOX_API_KEY
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Copy .env.local if it exists
COPY .env.local* ./

# Build the Next.js application
RUN npm run build

# Generate sitemap
RUN npm run postbuild

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Set to production environment
ENV NODE_ENV production

# Copy necessary files from builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.local* ./
# Copy sitemap files
COPY --from=builder /app/public/sitemap*.xml ./public/
COPY --from=builder /app/public/robots.txt ./public/

# Use a non-root user for better security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
