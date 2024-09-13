# Use node:18-alpine as base image
FROM node:18-alpine

# Set working directory
RUN mkdir -p /var/app 

# WORKDIR: 코드 실행 경로(작업 경로)
WORKDIR /var/app

# Copy package.json and package-lock.json
# COPY package.json package-lock.json ./

# Install dependencies
# Copy the rest of the application files
COPY . .
RUN npm ci

# Expose the necessary port (optional if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
