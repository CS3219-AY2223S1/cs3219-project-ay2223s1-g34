FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . ./

ENV PORT=3000
ENV REACT_APP_URI_USER_SVC=https://user-service-ragb43dwzq-de.a.run.app
ENV REACT_APP_URI_COLLAB_SVC=https://collab-service-ragb43dwzq-de.a.run.app
ENV REACT_APP_URI_MATCHING_SVC=https://matching-service-ragb43dwzq-de.a.run.app
ENV REACT_APP_URI_QUESTION_SVC=https://question-service-ragb43dwzq-de.a.run.app

EXPOSE 3000
RUN npm run build
RUN npm install serve
CMD ["npm", "run", "serve"]