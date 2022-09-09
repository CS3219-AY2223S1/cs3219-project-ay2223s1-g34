import mongoose from 'mongoose';
var Schema = mongoose.Schema

let JWTModelSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model('JWTModel', JWTModelSchema)
