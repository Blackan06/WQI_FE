# Build stage
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Create simple nginx config for SPA
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Add security headers
RUN echo 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;' >> /etc/nginx/conf.d/security-headers.conf
RUN echo 'add_header X-Content-Type-Options "nosniff" always;' >> /etc/nginx/conf.d/security-headers.conf
RUN echo 'add_header X-Frame-Options "ALLOW-FROM https://grafana.anhkiet.xyz" always;' >> /etc/nginx/conf.d/security-headers.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]