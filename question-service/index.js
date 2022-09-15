import express from 'express';
import cors from 'cors';
import { getQuestion as processQuestionRequest } from './controller/question-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()
router.get('/', (_, res) => res.send('Hello World from question-service'))
router.post('/', processQuestionRequest)

app.use('/api/question', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('question-service listening on port 8000'));