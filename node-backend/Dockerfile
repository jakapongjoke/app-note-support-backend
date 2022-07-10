FROM node:16.15
WORKDIR /usr/app 
COPY ./package.json ./
RUN npm install
COPY ./ /usr/app

CMD ["npm","start"]