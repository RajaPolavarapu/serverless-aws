require('dotenv').config();

const connectionURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.dvcuqyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        });
    }
};

module.exports = { connectToDatabase, User };
