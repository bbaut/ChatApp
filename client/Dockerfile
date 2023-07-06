FROM --platform=linux/amd64 node:18
WORKDIR /app
ADD . /app
# COPY ./package.json ./
RUN npm i
RUN npm run build
RUN npm i -g serve
EXPOSE 3000
CMD [ "serve", "-s", "build" ]
# COPY . .
# RUN npm run build

# FROM nginx
# EXPOSE 3000
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html