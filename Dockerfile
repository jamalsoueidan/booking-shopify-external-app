FROM node:18-alpine

EXPOSE 8081
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN cd frontend && npm install && npm run build:dev
CMD ["npm", "run", "serve"]
