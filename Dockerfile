FROM node:18-alpine

ARG PORT

WORKDIR /app
COPY . .
RUN npm install

CMD ["npm", "run", "start:dev"]

EXPOSE ${PORT}
