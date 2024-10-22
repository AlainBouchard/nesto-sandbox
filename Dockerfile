# Use an official Node.js image as the base image
FROM cypress/base:20.16.0

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN npx cypress install

ARG LANG=en
ENV LANG=$LANG
EXPOSE 1234

CMD ["npm", "run", "cypress:run:lang"]
