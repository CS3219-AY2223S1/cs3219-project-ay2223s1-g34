import { getQuestionRandom } from './repository.js';
import { getQuestionSpecific } from './repository.js';

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