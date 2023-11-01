FROM node:18-alpine AS build

CMD [ "cd", "/frontend" ]

COPY package.json .

RUN npm cache clean --force

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.3-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /dist /usr/share/nginx/html

EXPOSE 3000

CMD [ "nginx", "-g", "daemon off;" ]