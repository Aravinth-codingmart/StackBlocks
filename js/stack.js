var myGamePiece;
var i=3;
var object = [];
var colour=["red","blue","magenta","green","gray","brown","orange","black","purple","violet"];
var h=0;
var gameover=0;
let draw;
var score=0;
var wid=innerWidth/15;
var hei=innerHeight/11;
function startGame() {
    myGameArea.start();
    myGamePiece = new component(Math.floor(Math.random()*100)%wid+wid, Math.floor(Math.random()*100)%(hei/2)+hei,
    	colour[Math.floor(Math.random()*100%10)],Math.floor(Math.random()*10000%window.innerWidth)
    	, 10);
}
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth-30;;
        this.canvas.height = window.innerHeight-60;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color=color;
    this.interval=setInterval(updateGame,10);    
    this.update =function(){
	    ctx = myGameArea.context;
    	ctx.fillStyle = this.color;
    	ctx.fillRect(this.x, this.y, this.width, this.height);
    	for(var i=0;i<object.length;i++){
    		ctx.fillStyle = object[i].color;
			ctx.fillRect(object[i].x,object[i].y,object[i].width,object[i].height);
    	}
    	ctx.fillStyle="black";
		ctx.font="30px Georgia	";
		ctx.fillText("Score : "+score,20,30);
	}
}
function updateGame(){
	myGameArea.clear();
	if(myGamePiece.x<=10)
		i=3;
	if(myGamePiece.x>=window.innerWidth-3*wid)
		i=-3;
	myGamePiece.x+=i;
	myGamePiece.update();
}
function cxt(){
	ctx = myGameArea.context;
	ctx.fillStyle = myGamePiece.color;
	ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
	ctx.fillRect(myGamePiece.x,myGamePiece.y,myGamePiece.width,myGamePiece.height);
   	ctx.fillStyle="black";
	ctx.font="30px Georgia";
	ctx.fillText("Score : "+score,20,30);
	for(var i=0;i<object.length;i++){
   		ctx.fillStyle = object[i].color;
		ctx.fillRect(object[i].x,object[i].y,object[i].width,object[i].height);
   	}
	if(myGamePiece.y<h)
		myGamePiece.y+=10;
	else{
		clearInterval(draw);
		check1();
	}
}
function check(){
	if(h==0)
		h=window.innerHeight-60;
	h-=myGamePiece.height;
	clearInterval(myGamePiece.interval);
	if(gameover==0)
		draw=setInterval(cxt,20);
}
function check1(){
	if(object.length>0 && ((myGamePiece.x+myGamePiece.width<object[object.length-1].x)||(myGamePiece.x>object[object.length-1].x+object[object.length-1].width))){
		ctx = myGameArea.context;
    	ctx.fillStyle = myGamePiece.color;
    	ctx.clearRect(myGamePiece.x,  myGamePiece.y, myGamePiece.width, myGamePiece.height);
    	myGamePiece.y=h;
    	ctx.fillRect(myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height);
    	gameover=1;
	}
	else{
		score++;
		if(object.length>0){
			if(myGamePiece.x<object[object.length-1].x){
				myGamePiece.width=myGamePiece.width-(object[object.length-1].x-myGamePiece.x);
				myGamePiece.x=object[object.length-1].x;
				if(myGamePiece.x+myGamePiece.width>object[object.length-1].x+object[object.length-1].width)
					myGamePiece.width=object[object.length-1].width;
			}
			else if(myGamePiece.x>object[object.length-1].x){
				if(object[object.length-1].width-(myGamePiece.x-object[object.length-1].x)<myGamePiece.width)
					myGamePiece.width=object[object.length-1].width-(myGamePiece.x-object[object.length-1].x);
			}
			else
				if(myGamePiece.width>object[object.length-1].width)
					myGamePiece.width=object[object.length-1].width;	
		}
		if(object.length<4){
			myGamePiece.y=h;
			object.push(myGamePiece);
		}
		else{
			h+=object[object.length-4].height;
			myGamePiece.y=h;			
			for(var i=0;i<object.length;i++)
				object[i].y+=object[object.length-4].height;
			object.push(myGamePiece);
		}
		myGamePiece = new component(Math.floor(Math.random()*100)%wid+wid, Math.floor(Math.random()*100)%(hei/2)+hei, colour[Math.floor(Math.random()*100%10)],Math.floor(Math.random()*10000%800)
    	, 10);
	}
}
function sleep(milliseconds) {
	const date = Date.now();
    let currentDate = null;
    do {
    	currentDate = Date.now();
  	} while (currentDate - date < milliseconds);
}
