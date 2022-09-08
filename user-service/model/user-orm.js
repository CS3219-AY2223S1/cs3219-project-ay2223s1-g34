import { createUser, deleteUser, isExist, isValidSignIn, changePassword } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, email, password) {
    try {
        // Check whether username / email already exist
        const isExistingUser = await isExist(username, email)
        if (isExistingUser) {
            return false
        } else {
            try {
                // Create User
                const newUser = await createUser({username, email, password})
                await newUser.save()
                return true
            } catch (err) {
                console.log('ERROR: Invalid email address')
                return { err }
            }
        }
    } catch (err) {
        console.log('ERROR: Could not create new user')
        return { err }
    }
}

export async function ormDeleteUser(email) {
    try {
        return deleteUser(email)
    } catch (err) {
        console.log('ERROR: Delete account unsuccessful')
        return { err }
    }
}

export async function ormChangePassword(email, password) {
    try {
        return changePassword(email, password)
    } catch (err) {
        console.log('ERROR: Change password unsuccessful')
        return { err }
    }
}
export async function ormSignIn(email, password) {
    try {
        // Check whether correct email and password
        return await isValidSignIn(email, password)
    } catch (err) {
        console.log('ERROR: Username or email address incorrect!')
        return { err }
    }
}


