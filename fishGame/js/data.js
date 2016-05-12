var DataObj = function() {
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false; 
	this.alpha = 0;
};

// DataObj.prototype.reset = function() {
// 	this.fruitNum = 0;
// 	this.double = 1;
// };

DataObj.prototype.draw = function () {
	var w = can1.width;
	var h = can1.height;

	ctx1.save();
	ctx1.fillStyle = "white";
	ctx1.font = "20px Verdana";
	ctx1.textAlign = "center";
	ctx1.shadowBlur=20;
	ctx1.shadowColor="white";
	// ctx1.fillText("Num " + this.fruitNum, w * 0.5, h - 50); 
	// ctx1.fillText("double " + this.double, w * 0.5, h - 80); 
	ctx1.fillText("Score " + this.score, w * 0.5, h - 20); 

	if (this.gameOver) {
		this.alpha += deltaTime * 0.0005;
		if (this.alpha > 1) {
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
		ctx1.font = "26px Verdana";
		ctx1.fillText("GAME OVER",w * 0.5, h * 0.5); 
	}
	ctx1.restore();
};

DataObj.prototype.addScore = function () {
	this.score += this.fruitNum * 100 * this.double;
	// console.log(this.score);
	this.double = 1;
	this.fruitNum = 0;
};