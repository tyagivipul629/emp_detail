var express=require('express');
var app=express();
var mysql=require('mysql');
var path=require('path');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname+'/public'));
var connection=mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'vipul1234',
	database: 'employee'
});
connection.connect((function(err){
	if(err){
		console.log('error connecting;'+err.stack);
	}
	else{
		console.log('connected as id:'+connection.threadID);
	}
}));
app.get('/',function(req, res){
	res.sendFile(path.join(__dirname+'/index3.html'));
});
app.post('/sub',function(req,res){
	var emplname= req.body.empname;
	var obj={};
	var sql="select * from records where empname like '%"+emplname+"%';";
	connection.query(sql,function(err, result){
		if(err) throw err;
		if(result.length==0)
		{
			obj={'status':'error','data':result};
		}
		else{
			obj={'status':'success','data':result};
		}
		obj=JSON.stringify(obj);
		res.send(obj);
	});
});
app.listen(3000);
