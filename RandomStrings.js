var RandomStrings = function(options){
	this.init(options);
	return this;
};
RandomStrings.prototype = {
	// default options
	options:{
//		file:"./" + WScript.ScriptName.replace(/\.\w+$/, ".txt"),
		ptn:"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\-\_])[0-9a-zA-Z\-\_]+$",
		str:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_",
		num:4,
		len:16,
		max:999,
		show:true
	},
	info:{
		status:"wait",
		reason:"",
		count:0,
		created:[]
	},
	init:function(options){
		if(typeof(WEscript) !== "undefined"){
			file="./" + WScript.ScriptName.replace(/\.\w+$/, ".txt");
		}
		for(key in options){
			this.options[key] = options[key];
		}
	},
	isWindows:function(msg){
		return typeof(ActiveXObject) !== "undefined"
	},
	isWeb:function(msg){
		return typeof(document) !== "undefined"
	},
	write:function(msg){
		this._writeWindows(msg);
		this._writeWeb(msg);
	},
	_writeWindows:function(msg){
		if(typeof(ActiveXObject) === "undefined"){
			return false;
		}
		var fs = new ActiveXObject("Scripting.FileSystemObject");
		var file = fs.OpenTextFile(this.options.file, 2, true );
		file.WriteLine(msg.join("\r\n"));
		file.Close();
		fs = null;
	},
	_writeWeb:function(msg){
		if(typeof(document) === "undefined"){
			return false;
		}
		document.write(msg.join("<br />\r\n"));
	},
	build:function(){
		var arr=[];
		for(i=0; i < this.options.len; i++) {
			var j = Math.floor(Math.random() * this.options.str.length);
			arr.push(this.options.str.substr(j,1));
		}
		return arr.join("");
	},
	create:function(){
		var randstr = this.build();
		var regex = new RegExp(this.options.ptn);
		this.info.count++;
		if(this.options.max <= this.info.count){
			this.info.status = "error";
			this.info.reason = "unmatch and over max count.";
			return "";
		}
		return (randstr.match(regex)) ? randstr : this.create();
	},
	echo:function(arg){
		this._echoWindows(arg);
		this._echoWeb(arg);
	},
	_echoWindows:function(arg){
		if(typeof(WScript) === "undefined"){
			return false;
		}
		WScript.echo(arg);
		return true;
	},
	_echoWeb:function(arg){
		if(typeof(alert) === "undefined"){
			return false;
		}
		alert(arg);
		return true;
	},
	get:function(){
		var created = [];
		for(var i=0; i < this.options.num; i++){
			if(this.info.status == "error"){
				return this.info.created;
			}
			this.info.created.push(this.create());
		}
		this.info.status = "complete";
		return this.info.created;
	},
	log:function(){
		var msg=[];
		msg.push("[options]");
		msg.push("string : " + this.options.str);
 		msg.push("length : " + this.options.len);
		msg.push("pattern: " + this.options.ptn);
		msg.push("number : " + this.options.num);
		msg.push("maxtry : " + this.options.max);
		msg.push("");
		msg.push("[info] : ");
		msg.push("status : " + this.info.status);
		if(this.info.status === "error"){
			msg.push("reason : " + this.info.reason);
		}
		msg.push("count  : " + this.info.count);
		msg.push("match  : " + Math.floor(this.info.created.length / this.info.count * 100) + "%");
		msg.push("");
		msg.push("[create] : ");
		msg.push(this.info.created.join("\r\n"));
		return msg;
	},
	exec:function(){
		this.get();
		var msg = this.log();
		this.write(msg);
		if(!!this.options.show){
			msg.push("");
			msg.push("[saveto] : ");
			msg.push(this.options.file);
			this.echo(msg.join("\r\n"));
		}
		return this.info.created;
	}
};
