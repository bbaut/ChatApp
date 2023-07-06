FROM --platform=linux/amd64 node:18
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
CMD [ "npm", "run", "start" ]