import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

            // Check if token belongs to the requested user
            if (verifiedToken.email === req.email) {
                console.log("User is verified!")
                next()
            } else {
                console.log('Unauthorized action!')
                return res.status(401).json({message: 'Unauthorized action!'});
            }
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
