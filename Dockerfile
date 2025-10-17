# Build stage
FROM node:24.7.0-alpine3.21 AS builder

# Install pnpm
RUN npm install -g pnpm@10.15.1

# Set working directory
WORKDIR /app

# Copy workspace configuration files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY tsconfig.json ./

# Copy service package.json
COPY services/web/package.json services/web/
COPY libraries/types/package.json libraries/types/
COPY libraries/utils/package.json libraries/utils/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY services/web services/web

# Build the application
WORKDIR /app/services/web
RUN pnpm build

# Production stage
FROM nginx:1.29.1-alpine3.22

# Copy built files from builder
COPY --from=builder /app/services/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY services/web/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
