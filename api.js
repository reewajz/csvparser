var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var Customer= require('./models/Customer');
var Token= require('./models/Token');
var db = require('./db.js');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));


var checkToken= function(req,res,next){
    var tempToken='4d983d59b7306d4af66f4144e2d050711415e606';
    Token.findOne({Token:tempToken}).then(result=>{
        if(!result){
            var newt= new Token({
                Token:tempToken
            });
            newt.save().then(result=>{ console.log(result)});
        }
    });
    var token= req.headers.customertoken;
    if(token){
        Token.findOne({Token:token}).then(result=>{
            if(result){
                next();
            }else{
                res.json({result:false,message:'Invalid details!'});
            }
        }).catch(err=>{
            res.json({result:false,message:err.message});
        });

    }else{
        res.json({result:false,message:'no token is provided!'});
    }
}

app.use(checkToken);
  
app.get('/rest/v1/customer/:id',(req,res)=>{
    var id= req.params.id;

    if(id.includes('1',0) && id.length<=7){
        Customer.findOne({Customer:id}).then(data=>{
            if(data){
            res.json({result:true, data:data});
            }else{
                res.json({result:false,message:'no data found!'});
            }
        }).catch(err=>{
            res.send({result:false,message:err.message});
        });    
    }else if(id.includes('5',0) && id.length>=9){
        Customer.findOne({STBNO:id}).then(data=>{
            if(data){
                res.json({result:true, data:data});

            }else{
                res.json({result:false,message:'no data found!'});
            }
        }).catch(err=>{
            res.send({result:false,message:err.message});
        });
    }else{
        res.json({result:false,message:'Invalid ID!'});
    }
    
});



app.listen(8000, () => {
  console.log('API listening at 8000');
});
