# Use an official Node.js image fixed version as the base image (avoid using latest for stability)
FROM cypress/base:20.16.0

# Use package-lock.json and npm ci for reproducibility.
WORKDIR /usr/src/app
COPY package.json package-lock.json ./ 
RUN npm ci
COPY . .

RUN npx cypress install

ARG LANG=en
ENV LANG=$LANG

CMD ["npm", "run", "cypress:run:lang"]
