const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TO FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false)

// Connect to the local db
/* 
mongoose.connect('mongodb://127.0.0.1/todolist', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
*/

//Connect to the railway db
mongoose.connect('mongodb://mongo:77WvuJcng0hDeo5bLIHw@containers-us-west-195.railway.app:7958', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const TaskSchema = new Schema({
	title: String
}, {
	collection: 'todolist'
});	

const TaskModel = mongoose.model('todolis', TaskSchema);

module.exports = TaskModel;