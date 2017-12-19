var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/either');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Question = new mongoose.Schema({
    _id: {
        type: ObjectId,
        default: function f() {
            return new mongoose.Types.ObjectId();
        }
    },
    question: String,
    answer1: String,
    answer2: String,
    rating: Number,
    status: String
});

mongoose.model('Question', Question);

var Answer = new mongoose.Schema({
    _id: {
        type: ObjectId,
        default: function f() {
            return new mongoose.Types.ObjectId();
        }
    },
    question: ObjectId,
    answer: Number,
    timestamp: Date,
    user: String
});

mongoose.model('Answer', Answer);

module.exports = mongoose.models;