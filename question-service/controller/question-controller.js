import { ormGetQuestionRandom as _getQuestionRandom } from '../model/question-orm.js'

// [GET - Public] Get a question. Returns the JSON of the question contents
export async function getQuestion(req, res) {
    try {
        const { difficulty, topic } = req.body;
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
        } else {
            return res.status(400).json({ message: 'Question difficulty and/or topic are missing!' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when getting the question!' })
    }
}
