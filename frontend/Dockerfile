FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . ./

ENV PORT=3000
ENV URI_USER_SVC=https://user-service-ragb43dwzq-de.a.run.app
ENV const URI_COLLAB_SVC=https://collab-service-ragb43dwzq-de.a.run.app
ENV const URI_MATCHING_SVC=https://matching-service-ragb43dwzq-de.a.run.app
ENV URI_QUESTION_SVC=https://question-service-ragb43dwzq-de.a.run.app
ENV NODE_OPTIONS=--max_old_space_size=4096


RUN npm run build
