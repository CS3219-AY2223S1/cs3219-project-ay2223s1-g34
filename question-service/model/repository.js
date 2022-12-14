import QuestionModel from './question-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function getQuestionRandom(difficulty, topic) {
  return await QuestionModel.findOne({ difficulty: difficulty, topic: topic });
}

export async function getQuestionSpecific(qid) {
  return await QuestionModel.findOne({ QID: qid });
}

export async function getQuestionsByFilter(qid, difficulty, topic) {
  const filter = { QID: qid, difficulty: difficulty, topic: topic };
  if (filter['QID'] == null) {
    delete filter['QID']
  }
  if (filter['difficulty'] == null) {
    delete filter['difficulty']
  }
  if (filter['topic'] == null) {
    delete filter['topic']
  }
  return await QuestionModel.find(filter);
}