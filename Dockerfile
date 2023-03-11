FROM node:16-alpine
ARG mode
RUN if [ "x$mode" = "dev" ] ; then echo "Development" ; else echo "Production" ; fi
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN if [ "x$NODE_ENV" = "dev" ] ; then echo "Development" ; else echo "Production" ; fi
EXPOSE 8081
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
RUN cd frontend && npm install && npm run build:dev
CMD ["npm", "run", "serve"]
