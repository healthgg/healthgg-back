# Use node:18-alpine as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
# COPY . .

# Expose the necessary port (optional if needed)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
