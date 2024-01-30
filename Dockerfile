FROM mhart/alpine-node:16
WORKDIR /app
COPY package.json /app
RUN yarn install --ignore-engines
COPY . /app
CMD yarn start
EXPOSE 3000