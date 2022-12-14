import { ormGetQuestionRandom as _getQuestionRandom } from '../model/question-orm.js'
import { ormGetQuestionSpecific as _getQuestionSpecific } from '../model/question-orm.js'
import { ormGetQuestionsByFilter as _getQuestionsByFilter } from '../model/question-orm.js'

// [GET - Public] Get a question. Returns the JSON of the question contents
export async function getQuestion(req, res) {
    try {
        const { difficulty, topic, qid } = req.body;
        if (topic && difficulty) {
            const resp = await _getQuestionRandom(difficulty, topic);
            if (resp.err) {
                console.log(`There was an error when querying question-orm. Reponse: ${resp}`);
                return res.status(500).json({ message: 'Could not get a question!' });
            } else if (resp) {
                console.log(`Found question with difficulty ${difficulty} and topic ${topic} successfully!`)
                return res.status(200).json({ question: resp });
            } else {
                console.log(`Some unknown error occured in question-controller`);
                return res.status(400).json({ message: 'Question could not be fetched for some unknown reason.' });
            }
        } else if (qid) {
            const resp = await _getQuestionSpecific(qid);
            if (resp.err) {
                console.log(`There was an error when querying question-orm. Reponse: ${resp}`);
                return res.status(500).json({ message: 'Could not get a question!' });
            } else if (resp) {
                console.log(`Found question with QID successfully!`)
                return res.status(200).json({ question: resp });
            } else {
                console.log(`Some unknown error occured in question-controller`);
                return res.status(400).json({ message: 'Question could not be fetched for some unknown reason.' });
            }
        } else {
            return res.status(400).json({ message: 'API query parameters not valid! Needed (difficulty and topic) or (qid).' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when getting the question!' })
    }
}

// [GET - Public] Get a list of questions that satisfy particular filters. Returns the list of JSON of the question contents
export async function getQuestionsByFilter(req, res) {
    try {
        const { qid, difficulty, topic } = req.body;
        const resp = await _getQuestionsByFilter(qid, difficulty, topic);
        if (resp.err) {
            console.log(`There was an error when querying question-orm. Reponse: ${resp}`);
            return res.status(500).json({ message: 'Could not get the questions!' });
        } else if (resp) {
            console.log(`Found questions after applying filters of with qid ${qid}, difficulty ${difficulty} and topic ${topic} successfully!`)
            return res.status(200).json({ questions: resp });
        } else {
            console.log(`Some unknown error occured in question-controller`);
            return res.status(400).json({ message: 'Questions could not be fetched for some unknown reason.' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when getting the questions!' })
    }
}