FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
COPY src/apps/helsa/principal-api/package.json ./src/apps/helsa/principal-api/package.json
COPY src/contexts/shared/core/package.json ./src/contexts/shared/core/package.json
COPY src/contexts/shared/adapters/server/package.json ./src/contexts/shared/adapters/server/package.json
COPY src/contexts/helsa/package.json ./src/contexts/helsa/package.json
COPY src/packages/eslint-config-ducen/package.json ./src/packages/eslint-config-ducen/package.json
COPY src/packages/tsconfig-ducen/package.json ./src/packages/tsconfig-ducen/package.json
RUN npm ci
COPY . .
RUN npm run build:back -w @shared/core
RUN npm run build -w @shared/adapters-server
RUN npm run build:back -w @helsa/modules
EXPOSE 3001/tcp
CMD ["npm", "run", "build", "-w", "@helsa/principal-api"]
