
FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm install && npm run build-prod

FROM nginx:alpine

COPY --from=build /app/dist/heroes /usr/share/nginx/html

COPY /server/db.json /data/db.json

RUN apk add --no-cache nodejs npm && npm install -g json-server

EXPOSE 80

EXPOSE 3000

CMD nginx -g "daemon off;" & json-server --host 0.0.0.0 --port 3000 /data/db.json
