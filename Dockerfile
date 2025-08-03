FROM node:22-alpine

ARG PORT
ENV PORT=${PORT}


# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN apk add --no-cache curl gcc g++ make python3 python3-dev py3-setuptools py3-pip

RUN npm install -g pnpm

RUN pnpm install

# Install serve globally
RUN npm install -g serve

# Copy application files
COPY . .

# Build the application
RUN pnpm run build
# Expose the desired port
EXPOSE $PORT

# Command to serve the build folder
CMD ["serve", "-s", "dist", "-l", $PORT]