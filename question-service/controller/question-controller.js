import { ormGetQuestion as _getQuestion } from '../model/question-orm.js'

// [POST - Public] Get a question. Returns the JSON of the question contents
export async function getQuestion(req, res) {
    try {
        const { difficulty, topic } = req.body;
        if (topic && difficulty) {
            const resp = await _getQuestion(difficulty, topic);
            console.log(resp);
            if (resp.err) {
                return res.status(400).json({ message: 'Could not get a question!' });
            } else if (resp) {
                console.log(`Found question with difficulty ${difficulty} and topic ${topic} successfully!`)
                return res.status(201).json({ question: resp });
            } else {
                return res.status(400).json({ message: 'Question could not be fetched for some unknown reason.' });
            }
        } else {
            return res.status(400).json({ message: 'Question difficulty and/or topic are missing!' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when getting the question!' })
    }
}
