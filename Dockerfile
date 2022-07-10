FROM node:16.15
WORKDIR /usr/src/app

ADD package.json ./
RUN npm install
ADD . .
EXPOSE 8080

CMD ["npm", "start"]