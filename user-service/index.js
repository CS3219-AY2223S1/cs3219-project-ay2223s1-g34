import express from 'express'
import cors from 'cors'
import { createUser, signIn, deleteUser, changePassword } from './controller/user-controller.js'
import { isAuth } from './middleware/auth.js'

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

// Controller will contain all the User-defined Routes
//router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/createacc', createUser)
router.post('/signin', signIn)
router.delete('/deleteacc/:email', isAuth, deleteUser)
router.put('/changepw/:email', isAuth, changePassword)

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'));