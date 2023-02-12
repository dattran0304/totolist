const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TO FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false)

// Connect to the database
/* local
mongoose.connect('mongodb://127.0.0.1/todolist', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
*/
//railway
const MONGOHOST = 'containers-us-west-195.railway.app'
const MONGOPASSWORD = '77WvuJcng0hDeo5bLIHw'
const MONGOPORT = '7958'
const MONGOUSER = 'mongo'
mongoose.connect(`mongodb://${{ MONGOUSER }}:${{ MONGOPASSWORD }}@${{ MONGOHOST }}:${{ MONGOPORT }}`, {
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