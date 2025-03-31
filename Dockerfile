FROM node:16 as build-src
WORKDIR /app
COPY . .
RUN yarn install --ignore--platform
ENV API_PATH="https://cmsapi.hisoft.vn"
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-src /app/build /usr/share/nginx/html 
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]