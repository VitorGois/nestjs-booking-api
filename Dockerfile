# ====================================================
# Build Stage
#
FROM node:20-slim as build
WORKDIR /build

# Copy package manager files
COPY package.json pnpm-lock.yaml /build/

# Install dependencies
RUN npm i -g pnpm
RUN pnpm i --frozen-lockfile --ignore-scripts

# Copy source code and build application
COPY . /build/
RUN pnpm build

# ====================================================
# Application Stage
#
FROM node:20-slim as app
WORKDIR /app
EXPOSE 8081

# Copy built application
COPY --from=build /build/dist /app

# Install production dependencies
RUN npm i -g pnpm
RUN pnpm i --frozen-lockfile --ignore-scripts --prod

# Run application
CMD [ "pnpm", "start" ]