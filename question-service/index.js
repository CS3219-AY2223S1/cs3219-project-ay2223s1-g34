import express from 'express';
import cors from 'cors';
import { getQuestion as processQuestionRequest } from './controller/question-controller.js';
import { getQuestionsByFilter as processQuestionsByFilterRequest } from './controller/question-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: true, credentials: true })) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()
router.get('/', (_, res) => res.send('Hello World from question-service'))
router.get('/getQuestion', processQuestionRequest)
router.get('/getQuestionsByFilter', processQuestionsByFilterRequest)

app.use('/api/question', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

let port = process.env.PORT;
app.listen(port, () => console.log('question-service listening on port %d', port));