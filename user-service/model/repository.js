import UserModel from './user-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create new account
export async function createUser(params) { 
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(params.password, salt)

  return new UserModel({
    "username": params.username,
    "email": params.email,
    "password": hashedPassword
  })
}

// Delete account
export async function deleteUser(params) { 
  // TODO: Check auth
  return await UserModel.findOneAndRemove({"email": params})
}

// Change password
export async function changePassword(email, newPassword) { 
  // TODO: Check auth
  return await UserModel.findOneAndUpdate({"email": email}, {"password": newPassword})
}

// Check username / email already exists
export async function isExist(username, email) {
  const usernameExist = await UserModel.findOne({"username": username})
  const emailExist = await UserModel.findOne({"email": email})
  return usernameExist || emailExist
}

// Check email and password valid for sign in
export async function isValidSignIn(email, password) {
  const account = await UserModel.findOne({"email": email})
  // Email registered
  if (account) {
    // Check email and hashed password match
    if (await bcrypt.compare(password, account.password)) {
      return account.username
    } else {
      return null
    }
  } 
  // Email is not registered
  else {
    return null
  }
}
