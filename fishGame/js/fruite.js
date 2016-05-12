var FruiteObj = function(){
	this.alive = [];	//是否活跃
	this.x = [];
	this.y = [];
	this.l = [];
	this.spd = [];
	this.ameNo = [];
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
};
FruiteObj.prototype.num = 30;
FruiteObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;	//果实绘制尺寸
		this.ameNo[i] = 0;
		this.spd[i] = Math.random() * 0.01 + 0.005; //果实漂浮速度
		// debugger;
		this.fruitType[i] = ""; //blue,orange
		this.born(i);
	}
	// console.log("a");
	this.orange.src = "src/fruit.png";
	this.blue.src = "src/blue.png";
};
FruiteObj.prototype.draw = function(){
	for (var i = 0; i < this.num; i++) {
		if (this.alive[i]) {
			if (this.fruitType[i] == "blue") {
				var pic = this.blue;
			}
			else {
				var pic = this.orange;
			}
			if (this.l[i] <= 14 ) {
				var No = this.ameNo[i];
				this.x[i] = ame.headX[No];
				this.y[i] = ame.headY[No];
				// console.log(this.x[i]);
				this.l[i] += this.spd[i] * deltaTime;
				ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,
					this.l[i],this.l[i]);
			}
			else{
				this.y[i] -= this.spd[i] * 6 * deltaTime;
				ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,
					this.l[i],this.l[i]);
			}
				
			if (this.y[i] <= 10) {
				// debugger;
				this.alive[i] = false;
			}
		}
	}
};
FruiteObj.prototype.born = function(i){
	this.ameNo[i] = Math.floor(Math.random() * ame.num);
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if (ran < 0.2) {
		this.fruitType[i] = "blue";
	}
	else {
		this.fruitType[i] = "orange";
	}
};
FruiteObj.prototype.dead = function(i){
	this.alive[i] = false;
};

function fruitLisener(){
	// debugger;
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) {
			num ++;
		}
	}
	if (num <= 14) {
		// debugger;
		sendFruite();
		return;
	}
	// console.log("hehe");
}
function sendFruite(){
	for (var i = 0; i < fruit.num; i++) {
		if (!fruit.alive[i]) {
            fruit.born(i);
            return;
		}
	}
}