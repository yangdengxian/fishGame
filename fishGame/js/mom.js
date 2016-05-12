var MomObj = function(){
	this.x =0;
	this.y =0;
	this.angle = 0;
	// this.momEye = new Image();
	// this.momBody = new Image();
	// this.momTail = new Image();
	this.bigTailTimer = 0;
	this.bigTailCount = 0;

	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval = 1000;

	this.momBodyCount = 0;
};
MomObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	// this.momEye.src = "src/bigEye0.png";
	// this.momBody.src= "src/bigSwim0.png";
	// this.momTail.src = "src/bigTail0.png";
};

MomObj.prototype.draw = function(){

	this.x = lerpDistance(mx,this.x,0.98);	//鱼妈妈跟随鼠标
	this.y = lerpDistance(my,this.y,0.98);

	//delta angle
	//Math.atna(y,x)
	var deltaY = my -this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//-PI,PI
	this.angle = lerpAngle(beta,this.angle,0.6);

	this.bigTailTimer += deltaTime;
	if (this.bigTailTimer > 50) {
	 	this.bigTailCount = (this.bigTailCount + 1) % 8;
	 	this.bigTailTimer %= 50;
	} 

	this.bigEyeTimer += deltaTime;
	if (this.bigEyeTimer > this.bigEyeInterval) {
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
	 	this.bigEyeTimer %= this.bigEyeInterval;
	 	if (this.bigEyeCount === 0) {		//鱼妈妈睁着眼睛时间
	 		this.bigEyeInterval = Math.random() * 1500 + 2000;
	 	}
	 	else{	//眯着眼睛时间
	 		this.bigEyeInterval = 200;
	 	}
	} 
	// console.log(this.angle);
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var bigEyeCount = this.bigEyeCount;
	ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width * 0.5,-bigEye[bigEyeCount].width * 0.5);

	var momBodyCount = this.momBodyCount;
	// console.log(momBodyCount);
	if (data.double == 1) {
		ctx1.drawImage(bigBodyOrg[momBodyCount],-bigBodyOrg[momBodyCount].width * 0.5,-bigBodyOrg[momBodyCount].width * 0.5);
	} else {
		ctx1.drawImage(bigBodyBlue[momBodyCount],-bigBodyBlue[momBodyCount].width * 0.5,-bigBodyBlue[momBodyCount].width * 0.5);
	}
	

	var bigTailCount = this.bigTailCount;
	ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width * 0.5 + 30,-bigTail[bigTailCount].width * 0.5 - 2);
	ctx1.restore();
};
