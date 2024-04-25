# Use the official Node.js 14 image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5080 to the outside world
EXPOSE 5080

# Command to run the application
#npx prisma studio

RUN npx prisma generate
CMD ["npx", "ts-node", "controller.ts"]
