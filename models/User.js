var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var userSchema=new Schema({
UserName:{type:String, required:true},
// Email:{type:String, required:true},
Password:{type:String, required:true},
// Date:{type:Date, default:Date.now},
// ConfirmPassword:{type:String}
});

var User=mongoose.model('user',userSchema,'user');
module.exports=User;