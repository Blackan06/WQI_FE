# Build stage
FROM node:16-alpine as builder
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add security headers
RUN echo 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;' >> /etc/nginx/conf.d/security-headers.conf
RUN echo 'add_header X-Content-Type-Options "nosniff" always;' >> /etc/nginx/conf.d/security-headers.conf
RUN echo 'add_header X-Frame-Options "ALLOW-FROM https://grafana.anhkiet.xyz" always;' >> /etc/nginx/conf.d/security-headers.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]