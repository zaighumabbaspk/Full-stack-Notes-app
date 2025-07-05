# Stage 1: Frontend build
FROM node:18 as frontend-builder
WORKDIR /app
COPY Frontend/my-app/package*.json ./Frontend/my-app/
RUN npm install --prefix Frontend/my-app
COPY Frontend/my-app ./Frontend/my-app
RUN npm run build --prefix Frontend/my-app

# Stage 2: Backend setup
FROM node:18
WORKDIR /app
COPY Backend/package*.json ./Backend/
RUN npm install --prefix Backend
COPY Backend ./Backend
COPY --from=frontend-builder /app/Frontend/my-app/dist ./Frontend/my-app/dist

EXPOSE 3000
CMD ["node", "Backend/server.js"]