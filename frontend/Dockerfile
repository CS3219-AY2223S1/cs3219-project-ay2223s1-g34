FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . ./

ENV URI_USER_SVC=https://user-service-ragb43dwzq-de.a.run.app
ENV const URI_COLLAB_SVC=https://collab-service-ragb43dwzq-de.a.run.app
ENV const URI_MATCHING_SVC=https://matching-service-ragb43dwzq-de.a.run.app
ENV URI_QUESTION_SVC=https://question-service-ragb43dwzq-de.a.run.app

EXPOSE 3000
CMD [ "npm", "start" ]
