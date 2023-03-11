FROM node:16-alpine
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
RUN echo $NODE_ENV
EXPOSE 8081
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN cd frontend && npm install && npm run build
CMD ["npm", "run", "serve"]
