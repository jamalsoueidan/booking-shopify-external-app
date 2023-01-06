FROM node:18-alpine

EXPOSE 8081
RUN npm install
RUN cd frontend && npm install && npm run build
CMD ["npm", "run", "serve"]
