import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            // Verify token
            jwt.verify(token, process.env.JWT_SECRET)
            console.log("User is verified!")
            next()
        } catch (error) {
            console.log("User is verified!")
            console.log(error)
            return res.status(401).json({message: 'Unauthorized action!'});
        }
    } else {
        console.log("'Missing authorization token!")
        return res.status(401).json({message: 'Missing authorization token!'});
    }
}
