import mongoose from "mongoose";
var Schema = mongoose.Schema;

// For blacklisting purposes
let JWTModelSchema = new Schema({
	token: {
		type: String,
		required: true,
		unique: true,
	},
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 6000,
    }
});

export default mongoose.model("JWTModel", JWTModelSchema);
