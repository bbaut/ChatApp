FROM --platform=linux/amd64 node:18
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
EXPOSE 4001
CMD [ "npm", "run", "start" ]

