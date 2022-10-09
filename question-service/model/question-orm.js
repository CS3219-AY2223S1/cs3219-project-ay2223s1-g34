import { getQuestionRandom } from './repository.js';
import { getQuestionSpecific } from './repository.js';
import { getQuestionsByFilter } from './repository.js';

// Need to separate orm functions from repository to decouple business logic from persistence

export async function ormGetQuestionRandom(difficulty, topic) {
    try {
        const question = await getQuestionRandom(difficulty, topic);
        if (question) { // If question exists, return its JSON
            return {
                'QID': question.QID,
                'difficulty': question.difficulty,
                'topic': question.topic,
                'contents': question.contents
            };
        } else {        // If question does not exist don't return anything
            return null;
        }
    } catch (err) {
        console.log('ERROR: Could not get a question');
        return { err };
    }
}

export async function ormGetQuestionSpecific(qid) {
    try {
        const question = await getQuestionSpecific(qid);
        if (question) { // If question exists, return its JSON
            return {
                'QID': question.QID,
                'difficulty': question.difficulty,
                'topic': question.topic,
                'contents': question.contents
            };
        } else {        // If question does not exist don't return anything
            return null;
        }
    } catch (err) {
        console.log('ERROR: Could not get a question');
        return { err };
    }
}

export async function ormGetQuestionsByFilter(qid, difficulty, topic) {
    try {
        const questions = await getQuestionsByFilter(qid, difficulty, topic);
        if (questions) { // If there are any questions that match the filters, return their JSON
            for (let index = 0; index < questions.length; index++) {
                const q = questions[index];
                questions[index] = {
                    'QID': q.QID,
                    'difficulty': q.difficulty,
                    'topic': q.topic,
                    'contents': q.contents
                };
            }
            return questions;
        } else {        // If no question matches the filter, don't return anything
            return null;
        }
    } catch (err) {
        console.log('ERROR: Could not get a question');
        return { err };
    }
}