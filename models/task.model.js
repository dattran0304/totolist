const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TO FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false)

// Connect to the database
mongoose.connect('mongodb://127.0.0.1/todolist', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const TaskSchema = new Schema({
	title: String
}, {
	collection: 'tasks'
});

const TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = TaskModel;