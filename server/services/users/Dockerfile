FROM node:latest
WORKDIR /services/users
ENV PORT = 4001
COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force
COPY ./ ./
CMD ["npm", "run", "start"]