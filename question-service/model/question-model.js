import mongoose from 'mongoose';

var Schema = mongoose.Schema;

let QuestionModelSchema = new Schema({
    QID: {  // unique Question IDentification number
        type: Number,
        required: true,
        unique: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    }
})

export default mongoose.model('QuestionModel', QuestionModelSchema);
