var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
    name: {type: 'string'},
    password: { type: 'string'},
    gender: { type: 'string', enum: ['m', 'f', 'x']},
    bio: { type: 'string'}
});
exports.User.index({ name: 1}, { unique: true}).exec();