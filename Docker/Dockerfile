FROM node:22.14-alpine3.21

WORKDIR /app

COPY ../package.json ./
COPY ../package-lock.json ./

RUN npm install --production

COPY ../build/app.js ./build/
COPY ../build/main.js ./build/
COPY ../build/utils.js ./build/

EXPOSE 3005

ENTRYPOINT ["npm", "start"]