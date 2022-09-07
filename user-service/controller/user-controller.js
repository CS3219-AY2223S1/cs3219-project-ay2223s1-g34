import { ormCreateUser as _createUser } from '../model/user-orm.js'
import { ormSignIn as _signIn } from '../model/user-orm.js'
import { ormDeleteUser as _deleteUser } from '../model/user-orm.js'
import { ormChangePassword as _changePassword } from '../model/user-orm.js'

// [POST - Public] Create user with username, email and password
export async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (username && email && password) {
            const resp = await _createUser(username, email, password);
            if (resp.err) {
                return res.status(400).json({message: 'Could not create a new user!'});
            } 
            if (resp) {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: `Created new user ${username} successfully!`});
            } else {
                console.log(`Username or email address already in use!`)
                return res.status(400).json({message: 'Username or email address already in use!'});
            }
        } else {
            return res.status(400).json({message: 'Please fill up all fields!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

// [GET - Public] Sign in with username and password 
export async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const resp = await _signIn(email, password);
            if (resp) {
                console.log(resp)
                console.log(`Successfully signed in as ${resp}!`)
                return res.status(200).json({message: `Successfully signed in as ${resp}!`});
            } else {
                console.log(`Username or email address incorrect!`)
                return res.status(400).json({message: 'Username or email address incorrect!'});
            }
        } else {
            return res.status(400).json({message: 'Please fill up all fields!'});
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Database failure when signing in!'})
    }
}


// [DELETE - Private] Delete account
export async function deleteUser(req, res) {
    try {
        // TODO: Add auth
        const email = req.params.email;
        if (email) {
            const resp = await _deleteUser(email);
            if (resp) {
                console.log(`Deleted ${email} successfull!`)
                return res.status(200).json({message: `Deleted ${email} successfull!`});
            } else {
                console.log(`Deleted ${email} unsuccessfull!`)
                return res.status(400).json({message: `Deleted ${email} unsuccessfull!`});
            }
        } else {
            return res.status(400).json({message: 'Please fill up all fields!'});
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Database failure when deleting user!'})
    }
}

// [PUT - Private] Change password
export async function changePassword(req, res) {
    try {
        // TODO: Add auth
        const email = req.params.email;
        const password  = req.body.password;

        if (email && password) {
            const resp = await _changePassword(email, password);
            if (resp) {
                console.log(`Change password successfull!`)
                return res.status(200).json({message: `Change password successfull!`});
            } else {
                console.log(`Change password unsuccessfull!`)
                return res.status(400).json({message: `Change password unsuccessfull!`});
            }
        } else {
            return res.status(400).json({message: 'Please fill up all fields!'});
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Database failure when deleting user!'})
    }
}
