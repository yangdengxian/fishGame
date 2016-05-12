var can1 = {};
var can2 = {};
var ctx1 = "";
var ctx2 = "";
var canWidth = 0;
var canHeight = 0;
var lastTime = 0;		
var deltaTime = 0;		//时间帧
var bgPic = new Image();		//背景图

var ame = {};	//海葵对象

var fruit = {};	//果实对象

var mom = {}; //鱼妈妈
var bigTail = [];
var bigEye = [];
var bigBodyOrg = [];
var bigBodyBlue = [];

var baby = {}; //鱼宝宝
var babyTail = [];
var babyEye = [];
var babyBody = [];

var data = {};

var wave = {};

var halo = {};

var dust = {};
var dustPic = [];
var mx,my;	//鼠标位置

document.body.onload = game;
function game () {
	lastTime = Date.now();
	init();
	gameloop();
}
function init () {
	can1 = document.getElementById('canvas1');	//fishes,dust,ui,circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');	//background,fruits
	ctx2 = can2.getContext('2d');
	// debugger;
	can1.addEventListener("mousemove", onMousemove,false);
	canWidth = can1.width;
	canHeight = can1.height;
	bgPic.src = "src/background.jpg";

	ame = new AmeObj();
	ame.init();

	fruit = new FruiteObj();
	fruit.init();

	mom = new MomObj();
	mom.init();

	baby = new BabyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	for (var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "src/babyTail" + i + ".png";
	}

	for (var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "src/babyEye" + i + ".png";
	}

	for (var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = "src/babyFade" + i + ".png";
	}

	for (var i = 0; i < 8; i++) {
		bigTail[i] = new Image();
		bigTail[i].src = "src/bigTail" + i + ".png";
	}

	for (var i = 0; i < 2; i++) {
		bigEye[i] = new Image();
		bigEye[i].src = "src/bigEye" + i + ".png";
	}

	for (var i = 0; i < 8; i++) {
		bigBodyOrg[i] = new Image();
		bigBodyBlue[i] = new Image();
		bigBodyOrg[i].src = "src/bigSwim" + i + ".png";
		bigBodyBlue[i].src = "src/bigSwimBlue" + i + ".png";
	}

	for (var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "src/dust" + i + ".png";
	}
	
	data = new DataObj();

	wave = new WaveObj();
	wave.init();

	halo = new HaloObj();
	halo.init();

	dust = new DustObj();
	dust.init();


}
function gameloop () {
	window.requestAnimFrame(gameloop);
	var now =Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	drawBackground();
	if (deltaTime >= 40) {		//防止页面间切换，果实太大bug
		deltaTime = 40;
	}
	ame.draw();
	fruitLisener();
	fruit.draw();

	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	eatFruits();

	baby.draw();
	babyEatFruits();

	data.draw();

	wave.draw();

	halo.draw();

	dust.draw();

}
function onMousemove (e) {
	if (e.offsetX || e.layerX) {
		mx = e.offsetX == undefined ? e.layerX : e.offsetX;
		my = e.offsetY == undefined ? e.layerY : e.offsetY;
	}
	// body...
}
