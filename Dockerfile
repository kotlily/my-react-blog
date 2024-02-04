# Set base image
FROM node:18-alpine

# Set environment variables and specifically set the locale to avoid issues with the date format
ENV LANG C.UTF-8

# Set working directory for frontend
WORKDIR /usr/src/app/my-blog/frontend

# Copy required distribution files to working directory (e.g. package.json and package-lock.json public/ src/)
COPY my-blog/package*.json ./
COPY my-blog/public ./public
COPY my-blog/src ./src

# Install dependencies
RUN npm install

# Build frontend
RUN npm run build

# Set working directory for backend
WORKDIR /usr/src/app/my-blog/backend

# Copy frontend build to backend build directory
RUN mv ../frontend/build ./

# Remove frontend files after copying build
RUN rm -rf ../frontend

# Copy required distribution files to working directory (e.g. package.json and package-lock.json src/)
COPY my-blog-backend/package*.json ./
COPY my-blog-backend/src ./src

# Install dependencies
RUN npm install

# Start backend
CMD ["npm", "start"]
