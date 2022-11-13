from node

WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .
#EXPOSE 8080
EXPOSE 3000

CMD ["npm", "start"]
#CMD ["node", "server.js"]
