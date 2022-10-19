FROM node

ENV MYSQL_PASSWORD=12345

RUN mkdir -p /home/app

COPY . /home/app

CMD [ "node", "/home/app/dist/src/app.js" ] 