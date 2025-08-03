FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install system dependencies (including yarn)
RUN apk add --no-cache \
    curl \
    gcc \
    g++ \
    make \
    python3 \
    yarn

# Copy package files first for better caching
COPY package.json yarn.lock* ./

# Install project dependencies
RUN yarn install --frozen-lockfile

# Copy all other files
COPY . .

# Build Next.js application
RUN yarn build

# Environment variables for runtime
ENV HOST=0.0.0.0
ENV PORT=8005
EXPOSE 8005

# Start command (simplified)
CMD ["yarn", "start"]