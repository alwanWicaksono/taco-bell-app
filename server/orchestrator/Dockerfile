FROM node:latest
WORKDIR /orchestrator
ENV PORT = 4002
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force
COPY ./ ./
CMD ["npm", "run", "start"]