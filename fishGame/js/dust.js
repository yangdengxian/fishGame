var DustObj = function() {
	this.x = [];
	this.y = [];
	this.alpha ;
	this.amp = [];
	this.No = [];
};

DustObj.prototype.num = 30;

DustObj.prototype.init = function() {
	for (var i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.No[i] = Math.floor(Math.random() * 7);
		this.amp[i] = 25 + Math.random() * 15;
	}
	this.alpha = 0;
};

DustObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008; 
	var l = Math.sin(this.alpha);
	for (var i = 0; i < this.num; i++) {
		var no = this.No[i];
		// console.log(no);
		ctx1.drawImage(dustPic[no],this.x[i] + this.amp[i] * l,this.y[i]);
	}
};