#Frontend-Dockerfile
FROM node:14-alpine as build
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node . .
RUN npm install 
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /home/node/app/ /home/node
COPY --from=build /home/node/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY  nginx.conf /etc/nginx/conf.d
RUN apk update && apk upgrade busybox && apk add openssl
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
