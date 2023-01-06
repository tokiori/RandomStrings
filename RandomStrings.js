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
		this.info.count = 0;
		this.info.created = [];
		if(typeof(WScript) !== "undefined"){
			file="./" + WScript.ScriptName.replace(/\.\w+$/, ".txt");
		}
		for(key in options){
			this.options[key] = options[key];
		}
	},
	isWindows:function(){
		return typeof(ActiveXObject) !== "undefined"
	},
	isWeb:function(){
		return typeof(document) !== "undefined"
	},
	newline:function(){
		if(this.isWindows()){
			return "\r\n";
		} else if(this.isWeb()){
			return "<br />\r\n";
		}
	},
	write:function(msg, elemkey){
		if(this.isWindows()){
			var fs = new ActiveXObject("Scripting.FileSystemObject");
			var file = fs.OpenTextFile(this.options.file, 2, true );
			file.WriteLine(msg.join(this.newline()));
			file.Close();
			fs = null;
		} else if(this.isWeb()){
			document.querySelector(elemkey).innerHTML = msg.join(this.newline());
		}
	},
	echo:function(arg){
		if(this.isWindows()){
			WScript.echo(arg);
		} else if(this.isWeb()){
			alert(arg);
		}
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
		msg.push(this.info.created.join(this.newline()));
		return msg;
	},
	exec:function(elemkey){
		this.get();
		var msg = this.log();
		this.write(msg, elemkey);
		if(!!this.options.show){
			msg.push("");
			msg.push("[saveto] : ");
			msg.push(this.options.file);
			this.echo(msg.join("\r\n"));
		}
		return this.info.created;
	}
};
