FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run build
EXPOSE 3000
CMD ["yarn", "start"]
