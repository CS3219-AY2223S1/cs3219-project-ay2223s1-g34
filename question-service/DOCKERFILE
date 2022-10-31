FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./

ENV ENV=PROD
ENV DB_CLOUD_URI=mongodb+srv://admin:admin123@cluster0.esazx24.mongodb.net/cs3219-project-user-service?retryWrites=true&w=majority
ENV JWT_SECRET=threedoorcabinet
ENV FRONTEND_URL=http://localhost:3000
ENV FROM_NAME=PeerPrep
ENV FROM_EMAIL=threedoorcabinet@gmail.com
ENV FROM_EMAIL_PW=ivxlghliklnbmhta

EXPOSE 8003
CMD [ "npm", "start" ]
