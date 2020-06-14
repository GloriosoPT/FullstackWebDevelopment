const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        oktaId: String,
        displayName: String
    }
);

mongoose.model('users', userSchema);