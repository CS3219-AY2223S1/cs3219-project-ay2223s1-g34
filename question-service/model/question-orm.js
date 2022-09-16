import { getQuestion } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormGetQuestion(difficulty, topic) {
    try {
        const question = await getQuestion(difficulty, topic);
        if (question) { // If question exists, return its JSON
            return question.contents;
        } else {        // If question does not exist don't return anything
            return null;
        }
    } catch (err) {
        console.log('ERROR: Could not get a question');
        return { err };
    }
}

