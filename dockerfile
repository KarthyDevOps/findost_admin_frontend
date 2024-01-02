FROM node:14.19.3 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.19.3-alpine

WORKDIR /app

COPY --from=build /app/build ./build

COPY --from=build /app/package*.json ./

RUN npm install --production

EXPOSE 2273

CMD ["npm", "start"]
