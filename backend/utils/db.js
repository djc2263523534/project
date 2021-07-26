const mongoose = require('mongoose');
//1.连接数据库
mongoose.connect('mongodb://localhost/lagon-admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//2store.subscribe(handler)构建 User的模型
var usersSchema = mongoose.Schema({
    usersName: String,
    passWord: String
});


var Users = mongoose.model('Users', usersSchema);

exports.Users = Users