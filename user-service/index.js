import express from 'express'
import cors from 'cors'
import cookies from 'cookie-parser'

import { createUser, signIn, deleteUser, changePassword, logout } from './controller/user-controller.js'
import { isAuth } from './middleware/auth.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookies());
app.use(cors({ origin: true, credentials: true })) // config cors so that front-end can use
app.options('*', cors())

// Router 
const router = express.Router()
router.post('/createacc', createUser)
router.post('/signin', signIn)
router.delete('/deleteacc/:email', isAuth, deleteUser)
router.put('/changepw/:email', isAuth, changePassword)
router.post('/logout', logout)

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'));
