var BabyObj = function () {
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	// this.babyEye = new Image();
	// this.babyBody = new Image();
	// this.babyTail = new Image();

	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
};
BabyObj.prototype.init = function(){
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	// this.babyEye.src = "src/babyEye0.png";
	// this.babyBody.src= "src/baby.png";
	// this.babyTail.src = "src/babyTail0.png";
};
BabyObj.prototype.draw = function(){
	this.x = lerpDistance(mom.x,this.x,0.98);	//鱼宝宝跟随鱼妈妈
	this.y = lerpDistance(mom.y,this.y,0.98);
	//delta angle
	//Math.atna2(y,x)
	var deltaY = mom.y -this.y;
	var deltaX = mom.y - this.x;
	var beta = Math.atan2(deltaY,deltaX) + 1.6*Math.PI;//-PI,PI
	this.angle = lerpAngle(beta,this.angle,0.6);

	//baby tail count
	this.babyTailTimer += deltaTime;
	if (this.babyTailTimer > 50) {
	 	this.babyTailCount = (this.babyTailCount + 1) % 8;
	 	this.babyTailTimer %= 50;
	 } 

	this.babyEyeTimer += deltaTime;
	if (this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
	 	this.babyEyeTimer %= this.babyEyeInterval;
	 	if (this.babyEyeCount === 0) {		//小鱼睁着眼睛时间
	 		this.babyEyeInterval = Math.random() * 1500 + 2000;
	 	}
	 	else{	//眯着眼睛时间
	 		this.babyEyeInterval = 200;
	 	}
	}

	this.babyBodyTimer += deltaTime;
	if (this.babyBodyTimer > 300) {
		this.babyBodyCount ++;
		this.babyBodyTimer %= 300;
		if (this.babyBodyCount > 19) {
			this.babyBodyCount = 19;
			//gameover
			data.gameOver = true;
		}
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width * 0.5 + 24,-babyTail[babyTailCount].height * 0.5);

	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width * 0.5,-babyBody[babyBodyCount].height * 0.5);

	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width * 0.5,-babyEye[babyEyeCount].height * 0.5);
	ctx1.restore();
};