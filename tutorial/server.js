var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname,'comments.json');
app.set('PORT', 3000); //设置端口

app.use('/',express.static(path.join(__dirname,'public'))); //将静态资源放在public 目录下面
//注册两个中间件，负责解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//注册中间件，负责跨域和缓存
app.use(function(req,res,next){
     res.setHeader('Access-Control-Allow-Origin','*');
     res.setHeader('Cache-Control','no-cache');
     next();
});
//设置get请求,将json 文件评论读出来
app.get('/api/comments',function(req,res){
	fs.readFile(COMMENTS_FILE,function(error,data){
		if(error){
			console.error(error);
			process.exit(1);//0成功退出 1 失败退出，proces 为全局方法
		}
		res.json(JSON.parse(data));
	});
});

//设置post 请求 ，每次用户填写的数据将被保存到commens.json ,这里相当于数据库的作用
app.post('/api/comments',function(req,res){
	fs.readFile(COMMENTS_FILE,function(error,data){
		if(error){
			console.error(error);
			process.exit(1);//0成功退出 1 失败退出，proces 为全局方法
		}
		var comments = JSON.parse(data);
		var newComment = {
			id: Date.now(),
			author: req.body.author,
			text: req.body.text
		};
		comments.push(newComment);
		fs.writeFile(COMMENTS_FILE,JSON.stringify(comments, null, 4),function(error){
			if(error){
				console.error(error);
				process.exit(1);//0成功退出 1 失败退出，proces 为全局方法				
			}
			res.json(comments);
		});
	});
});

app.listen(app.get('PORT'),function(){
	console.log('Server start at http://127.0.0.1:' + app.get('PORT'));
});//监听端口

