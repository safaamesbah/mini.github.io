var canvasID = "myCanvas";
var Cwidth = 510;
var Cheight = 510;
var canvas = document.getElementById(canvasID);
var ctx = canvas.getContext("2d");


// colors for ghost
var PURPLE = "#8C2074";
var GREEN = "#507c38";
var BLUE = "#505cc0";
var BROWN = "#985C28";
var EAT_GHOST = "#6C6C6C";
var RECOVERING = "#ECECEC";

// game grid
var Gwidth = 30;
var Gheight = 30;
var wheight = 3;
var numRows = Cwidth/Gheight;
var numCols = Cheight/Gwidth;



// colors for UI & Pacman
var background_color = "#eca0a0";
var border_color = "#841800";
var beans = "#1c209c";
var PACMAN_COLOR = "#fcfc68";


var PAC_man;
var ghost1;
var ghost2;
var ghost3;
var ghost4;





// game parameters
var intervalId;
var restartTimer = 0;
var timerDelay = 80;
var speed = 5;
var score = 0;
var life = 1;
var SCORE_GHOST = 100;
var GHOST_MAX = 136;
var beansLeft = GHOST_MAX;
var weakCounter;
var TIMER_WEAK = 10000/timerDelay;


//bean cases
var NORMAL_BEAN = 1
var POWER_BEAN = 2;

// size of sprites
var NORMAL_BEAN_RADIUS = 2;
var POWER_BEAN_RADIUS = 5;
var PACMAN_RADIUS = 9;
var GHOST_RADIUS = 9;

//spirtes instances
var welc_PAC_man;
var welc_ghost1;
var welc_ghost2;

var ghosts;

// directions
var UP = 1;
var DOWN = 2;
var LEFT = 3;
var RIGHT = 4;

//game state and map
var gameOn = false;
var gamePaused = false;


// grids that don't redraw
var staticGrids = [];
var staticGridsIndex = 0;


// start location of pacman
var pacmanStartLoc = [4,9];

// grids with no beans
var noBean = [pacmanStartLoc,[5,12],[5,13],[9,5],[9,6],[3,0],[5,6],[5,5],[12,7],[14,5],[12,10],[12,11],
[14,11],[0,2],[0,3],[0,4],[1,0],[4,0],[14,9],[15,11],[11,7],[15,13],[13,13],[13,14],[10,15],[11,13],[5,14]];
var noBeanIndex=noBean.length;


// power beans in blocks
var powerBeans = [[0,0], [3,13], [16,4], [16,12], [7,5], [12,6]];


// ghost house
var ghostHouse = [];
var ghostHouseIndex = 0;
/*======================END GLOBAL VARs====================*/


/*====================Initialization Methods==============*/

function draw_Canvas(width, height){
	if(width===undefined || !(width instanceof Number)){
		width = Cwidth;
	}
	if(height===undefined || !(height instanceof Number)){
		height = Cheight;
	}

	ctx.fillStyle = "#880000";
	ctx.fillRect(0,0,Cwidth,Cheight);
}

// draw blocks, print instruction on lower-left corner, show lives on top-right corner
function draw_blocks(){
	for(var i=0; i<blocks.length; i++){
		var oneRow = new Array(Cwidth/Gwidth);
		blocks[i] = oneRow;
	}

	// draw blocks with full beans
	for( var row = 0; row < Cheight/Gheight; row++){
		for(var col = 0; col < Cwidth/Gwidth; col++){
			var beanType = NORMAL_BEAN;
			var newGrid = new Grid(col*Gwidth,row*Gheight , mazeContent[row][col],beanType);
			
			blocks[row][col] = newGrid;
			newGrid.draw();
		}
	}

	//overwrite beans that shouldn't ecist
	for(var i=0; i<noBean.length; i++){
		var x = noBean[i][0];
		var y = noBean[i][1];
		blocks[x][y].beanType = undefined;
		blocks[x][y].draw();
	}

	// draw power beans
	for(var i=0; i<powerBeans.length;i++){
		var x = powerBeans[i][0];
		var y = powerBeans[i][1];
		blocks[x][y].beanType = POWER_BEAN;
		blocks[x][y].draw();
	}

}


function initFields () {
	// body...
	for (var i=6; i<10; i++){
		ghostHouse[ghostHouseIndex]=[i,9];
		ghostHouseIndex++;
	}


	//fill up staticGrids[]
	for (var i=0; i<2; i++){
		for (var j=8; j<17; j++){
			staticGrids[staticGridsIndex]=[i,j];
			staticGridsIndex++;
		}
	}
	for (var i=9; i<17; i++){
		for (var j=0; j<4; j++){
			staticGrids[staticGridsIndex]=[i,j];
			staticGridsIndex++;
		}
	}
	for (var i=2; i<6; i++){
		for (var j=14; j<17; j++){
			staticGrids[staticGridsIndex]=[i,j];
			staticGridsIndex++;
		}
	}

	//fill up noBean[]
	
	for (var i=1; i<=3; i++){
		noBean[noBeanIndex]=[i,6];
		noBeanIndex++;
	}
	for(var i=2; i<=3; i++){
		for(var j=2; j<=4; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	
	
	for (var i=14; i<=16; i++){
		noBean[noBeanIndex]=[4,i];
		noBeanIndex++;
	}
	
	for (var i=13; i<=16; i++){
		noBean[noBeanIndex]=[2,i];
		noBeanIndex++;
	}
	
	
	
	
	for (var i=5; i<=6; i++){
		noBean[noBeanIndex]=[8,i];
		noBeanIndex++;
	}
	
	
	for (var i=14; i<=15; i++){
		noBean[noBeanIndex]=[i,7];
		noBeanIndex++;
	}
	
	
	for (var j=15; j<=16; j++){
		noBean[noBeanIndex]=[5,j];
		noBeanIndex++;
	}
	
	
	
	for(var i=0; i<2; i++){
		for(var j=8; j<17; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	
	
	
	for (var j=13; j<=16; j++){
		noBean[noBeanIndex]=[3,j];
		noBeanIndex++;
	}
	
	for (var j=12; j<=15; j++){
		noBean[noBeanIndex]=[8,j];
		noBeanIndex++;
	}
	
	
	for(var i=9; i<17; i++){
		for(var j=0; j<4; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	
	for (var j=2; j<=3; j++){
		noBean[noBeanIndex]=[5,j];
		noBeanIndex++;
	}
	
	for (var j=2; j<=6; j++){
		noBean[noBeanIndex]=[6,j];
		noBeanIndex++;
	}
	
	for (var j=6; j<=8; j++){
		noBean[noBeanIndex]=[j,0];
		noBeanIndex++;
	}
	
	for (var j=1; j<=3; j++){
		noBean[noBeanIndex]=[8,j];
		noBeanIndex++;
	}
	
	
	
	
	for (var j=8; j<=11; j++){
		noBean[noBeanIndex]=[3,j];
		noBeanIndex++;
	}
	
	
	
	
	for (var i=5; i<10; i++){
		for(var j=8; j<11; j++){
			noBean[noBeanIndex]=[i,j];
			noBeanIndex++;
		}
	}
	for (var j=12; j<=16; j++){
		noBean[noBeanIndex]=[6,j];
		noBeanIndex++;
	}
	for (var j=12; j<13; j++){
		noBean[noBeanIndex]=[9,j];
		noBeanIndex++;
	}
	
	for (var j=14; j<16; j++){
		noBean[noBeanIndex]=[9,j];
		noBeanIndex++;
	}
	
	
	for (var j=8; j<=11; j++){
		noBean[noBeanIndex]=[11,j];
		noBeanIndex++;
	}
	
	
	for (var j=11; j<=15; j++){
		noBean[noBeanIndex]=[j,5];
		noBeanIndex++;
	}
	
	for(var j=15; j<16; j++){
		noBean[noBeanIndex]=[11, j];
		noBeanIndex++;
	}
	for(var i=13; i<16; i++){
		noBean[noBeanIndex]=[i, 15];
		noBeanIndex++;
	}
	
}

for(var i=8; i<10; i++){
		noBean[noBeanIndex]=[12,i];
		noBeanIndex++;
	}
	
	
	for(var i=7; i<=8; i++){
		noBean[noBeanIndex]=[16,i];
		noBeanIndex++;
	}
	
	
	for(var i=10; i<=11; i++){
		noBean[noBeanIndex]=[16,i];
		noBeanIndex++;
	}
	


/*================END Initialization Methods==============*/


/*====================Util Methods================*/
//draw a circle
function circle(ctx, cx, cy, radius) {

	ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2*Math.PI, true);
    ctx.fill();

}

//get opposite direction
function oppositeDir (direction) {
	switch(direction){
		case UP:
		return DOWN;
		break;

		case DOWN:
		return UP;
		break;

		case LEFT:
		return RIGHT;
		break;

		case RIGHT:
		return LEFT;
		break;

		default:
		return -1;//err
	}
}

function Index_row (yCord) {
	if(yCord === undefined){
		return -1;//err
	}
	return parseInt(yCord/Gheight);
}


function Index_column (xCord) {
	if(xCord === undefined){
		return -1;//err
	}
	return parseInt(xCord/Gwidth);
}

function xOnGridCenter (y) {
	return ((y - Gwidth/2) % Gwidth) === 0;
}

function yOnGridCenter (x) {
	return ((x - Gheight/2) % Gheight) === 0;
}


function onGridCenter (x,y) {
	return xOnGridCenter(y) && yOnGridCenter(x);
}


function fixGrids (x, y) {
	var row = Index_row(y);
	var col = Index_column(x);

	if(xOnGridCenter(y)){
 		blocks[row][col].draw();
 		if(col+1 < blocks.length && !staticArrayContains([row, col+1])){
 			blocks[row][col+1].draw();
 		}
 		if(col-1 >= 0 && !staticArrayContains([row, col-1])){
 			blocks[row][col-1].draw();
 		}
 	}
 	else if(yOnGridCenter(x)){
 		blocks[row][col].draw();
 		if(row+1 < blocks.length  && !staticArrayContains([row+1, col])){
 			blocks[row+1][col].draw();
 		}
 		if(row-1 >=0 && !staticArrayContains([row-1,col]) ){
 			blocks[row-1][col].draw();
 		}
 	}
}

function staticArrayContains(cord) {
	var x = cord[0];
	var y = cord[1];
	for(var i=0; i< staticGrids.length; i++ ){
		if(x=== staticGrids[i][0] &&
			y=== staticGrids[i][1]){
			return true;
		}
	}
	return false;
}

function ghostHouseContains(cord) {
	var x = cord[0];
	var y = cord[1];
	for(var i=0; i< ghostHouse.length; i++ ){
		if(x=== ghostHouse[i][0] &&
			y=== ghostHouse[i][1]){
			return true;
		}
	}
	return false;
}


//see if sprite can move one more step at the given (x,y) facing the given direction
function checkMove (x,y,direction) {
	if(!onGridCenter(x,y)){
		return true;
	}
	var checkMove = false;
	var currGrid = blocks[Index_row(y)][Index_column(x)];
	var gridType = currGrid.gridType;
	switch(direction){
		case UP:
		if(gridType != LEFT_TOP && gridType != RIGHT_TOP && gridType != TOP_BOTTOM
			&& gridType != TOP_ONLY && gridType!= LEFT_TOP_RIGHT 
			&& gridType != TOP_RIGHT_BOTTOM && gridType!= BOTTOM_LEFT_TOP){
			checkMove = true;
		}
		break;

		case DOWN:
		if(gridType != LEFT_BOTTOM && gridType != TOP_BOTTOM && gridType != RIGHT_BOTTOM
			&& gridType != BOTTOM_ONLY && gridType!= RIGHT_BOTTOM_LEFT
			&& gridType != BOTTOM_LEFT_TOP && gridType!= TOP_RIGHT_BOTTOM){
			checkMove = true;
		}
		break;

		case LEFT:
		if(gridType != LEFT_BOTTOM && gridType != LEFT_TOP && gridType != LEFT_ONLY
			&& gridType != LEFT_RIGHT && gridType!= LEFT_TOP_RIGHT
			&& gridType != BOTTOM_LEFT_TOP && gridType!= RIGHT_BOTTOM_LEFT){
			checkMove = true;
		}
		break;

		case RIGHT:
		if(gridType != RIGHT_BOTTOM && gridType != RIGHT_TOP && gridType != RIGHT_ONLY
			&& gridType != LEFT_RIGHT && gridType!= RIGHT_BOTTOM_LEFT 
			&& gridType != TOP_RIGHT_BOTTOM && gridType != LEFT_TOP_RIGHT){
			checkMove = true;
		}
		break;
		default:
		break;


	}
	return checkMove;
}
/*=================END Util Methods================*/


/*=================UI Update Methods===============*/

// draw instructions
function top_ten () {
	ctx.fillStyle = "white";
	ctx.font="12px monospace";
	ctx.textAlign = "left";

	var txt = "WELCOME TO \nPACMAN \nR to restart";
	var x = 12;
	var y = Cheight-200;
	var lineheight = 15;
	var lines = txt.split('\n');

	for (var i = 0; i<lines.length; i++)
	    ctx.fillText(lines[i], x, y + (i*lineheight) );


}



//show welcome screen
function interface(){

	gameOn = false;
	gamePaused = false;
	// welcome text
	ctx.fillStyle = "#fce08c";
	ctx.font = "80px monospace";
	ctx.textAlign = "center";
	ctx.fillText("PACMAN", 160, 150);
	ctx.font = "20px monospace";
	ctx.fillText("Press Enter to start", 270, 200);

	welc_PAC_man = new Pacman(Cwidth/2, Cheight/3*2, RIGHT);
	welc_PAC_man.radius = 70;
	welc_PAC_man.draw();
	intervalId = setInterval(updateInterface, timerDelay*2);
}

//welcome screen animation
function updateInterface () {
	ctx.fillStyle = "#880000";
	ctx.fillRect(0, Cheight/2, Cwidth,140);
	
	welc_PAC_man.mouthOpen = !welc_PAC_man.mouthOpen;
welc_PAC_man.draw();
}

//show || update score
function showScore(){
	ctx.fillStyle="#eca0a0";
	ctx.fillRect(Cwidth-250, 10, 190, 40);
	ctx.fillStyle = "#841800";
	ctx.font = "24px monospace";
	ctx.textAlign = "left";
	ctx.fillText("score: " + parseInt(score), Cwidth-200, 37);
}

//show win message
function win(){
	//draw popup
	ctx.fillStyle = "#442800";
	ctx.strokeStyle = "#3854a8";
	ctx.lineWidth=5;
    ctx.fillRect(Cwidth/2-150, Cheight/2-60, 300, 150);
	ctx.strokeRect(Cwidth/2-150, Cheight/2-60, 300, 150);

	//write message
	ctx.textAlign="center";
	ctx.fillStyle = "#7c9cdc";
	ctx.font = "30px monospace";
	ctx.fillText("you won!", Cheight/2, Cheight/2+6);
	ctx.font = "16px monospace";
	ctx.fillText("press R to play again", Cheight/2, Cheight/2+28);
	
	dbInsert();
	
}

//show lose message
function lose(){
	
	ctx.fillStyle = "#442800";
	ctx.strokeStyle = "#3854a8";
	ctx.lineWidth=5;
	ctx.fillRect(Cwidth/2-150, Cheight/2-60, 300, 150);
	ctx.strokeRect(Cwidth/2-150, Cheight/2-60, 300, 150);
	ctx.textAlign="center";
	ctx.fillStyle = "#7c9cdc";
	ctx.font = "30px monospace";
	ctx.fillText("GAME OVER :(", Cheight/2, Cheight/2+7);
	ctx.font = "16px monospace";
	ctx.fillText("press R to play again", Cheight/2, Cheight/2+28);

	
}

function writeToFile( d2){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile("test.txt", 8, false, 0);
    fh.WriteLine( d2);
    fh.Close();
}


//update canvas for each frame. 
function updateCanvas() {
	restartTimer++;
	if (gameOver()===true){
		
			clearInterval(intervalId);
			lose();
	
	}
	else if (pacmanWon()===true){
		clearInterval(intervalId);
		win();
	
	}
	else{
	if(weakCounter>0 && weakCounter<2000/timerDelay){
			for(var i=0; i<ghosts.length; i++){
				ghosts[i].isBlinking = !ghosts[i].isBlinking;
			}
		}
		if(weakCounter>0){
			weakCounter--;
		}
		if(weakCounter===0){
			for(var i=0; i<ghosts.length; i++){
				ghosts[i].isDead = false;
				ghosts[i].isWeak = false;
				ghosts[i.isBlinking = false];
				SCORE_GHOST= 200;
			}
		}

		eatBean();
		eatGhost();
		PAC_man.move();

		for(var i=0; i<ghosts.length; i++){
			if(ghosts[i].isDead === false){
				ghosts[i].move();
			}
		}

	 	fixGrids(PAC_man.x, PAC_man.y);
	 	for(var i=0; i<ghosts.length; i++){
			fixGrids(ghosts[i].x, ghosts[i].y);
		}

	    PAC_man.draw();
	    for(var i=0; i<ghosts.length; i++){
			ghosts[i].draw();
		}
	}
}

//try to eat a bean
function eatBean () {
	if(onGridCenter(PAC_man.x, PAC_man.y)){
		if(blocks[PAC_man.getRow()][PAC_man.getCol()].beanType===NORMAL_BEAN){
			score+= parseInt(5);
			showScore();
			beansLeft--;
		}
		else if (blocks[PAC_man.getRow()][PAC_man.getCol()].beanType===POWER_BEAN){
			score+=parseInt(30);
			showScore();
			beansLeft--;

			//ghosts enter weak mode
			for(var i=0; i<ghosts.length; i++){
				ghosts[i].isWeak=true;
			}
			weakCounter=TIMER_WEAK;
		}
		blocks[PAC_man.getRow()][PAC_man.getCol()].beanType=undefined;
		blocks[PAC_man.getRow()][PAC_man.getCol()].draw();
	}
}

//try to eat a weak ghost
function eatGhost () {
	for(var i=0; i<ghosts.length; i++){
		if(Math.abs(PAC_man.x-ghosts[i].x)<=5 && Math.abs(PAC_man.y-ghosts[i].y)<=5
			&& ghosts[i].isWeak && !ghosts[i].isDead){
			score += parseInt( SCORE_GHOST);
			showScore();
			ghosts[i].isDead = true;
			ghosts[i].toGhostHouse();
		}
	}
}

function gameOver(){
	for(var i=0; i<ghosts.length; i++){
		if(Math.abs(PAC_man.x-ghosts[i].x)<=5 && Math.abs(PAC_man.y-ghosts[i].y)<=5
			&& !ghosts[i].isWeak){
			
			return true;
	
	}
	}
	return false;

	}

function pacmanWon(){
	return beansLeft === 0;
}


/*==================END UI Update Methods================*/


/*==================Game Control Methods===================*/
//listen to keyDown event
function onKeyDown (event) {
	var keycode = event.keyCode;
	
	var restartCode = 82; //r to restart

	
	var sCode = 13;
	//arrow keys
	
	var leftCode = 37;
	var upCode = 38;
	var rightCode = 39;
	var downCode = 40;

	//start game
	if(!gameOn){
		if(keycode === sCode){
			clearInterval(intervalId);
			gameOn = true;
			draw_blocks();
			run();
			return;
		}
		
	}
	else{

		


		//restart game
		if( keycode === restartCode && restartTimer > 0) {
			//can't restart game if a game was just refreshed.
			restartTimer = 0;
			clearInterval(intervalId);
			gameOn = true;
			gamePaused = false;
			score = 0;
			life = 1;
			beansLeft = GHOST_MAX;
			draw_blocks();
			run();
		}  

		//4-way controls
		switch(keycode){
			case upCode:
			
			PAC_man.nextDir = PAC_man.direction===UP ? undefined: UP;
			break;

			case rightCode:
			
			PAC_man.nextDir = PAC_man.direction===RIGHT? undefined : RIGHT;
			break;

			case leftCode:
			
			PAC_man.nextDir = PAC_man.direction === LEFT? undefined : LEFT;
			break;

			case downCode:
			
			PAC_man.nextDir = PAC_man.direction === DOWN? undefined : DOWN;
			break;

			default:
			break;

		}
	}	
}

//run the game. Create PAC_man and 4 ghosts. Reset their positions.
function run(isGodMode) {
	showScore();
    
    PAC_man = new Pacman(pacmanStartLoc[1]*Gwidth + Gwidth/2, pacmanStartLoc[0]*Gheight + Gheight/2, RIGHT);
    if(isGodMode===undefined || !isGodMode){
	    ghost1 = new Ghost(0,0, PURPLE, DOWN);
	    ghost2 = new Ghost(0,0, BLUE, DOWN);
	    ghost3 = new Ghost(0,0, GREEN, DOWN);
	    ghost4 = new Ghost(0,0, BROWN, DOWN);

	    ghost1.toGhostHouse();
	    ghost2.toGhostHouse();
	    ghost3.toGhostHouse();
	    ghost4.toGhostHouse();

	    ghosts = [ghost1, ghost2, ghost3, ghost4];

	    ghost2.draw();
		ghost1.draw();
		ghost3.draw();
		ghost4.draw();
	}
	else{
		ghosts = [];
	}
	top_ten();

	PAC_man.draw();
	intervalId = setInterval(updateCanvas, timerDelay);
	
}
/*===============END Game Control Methods===================*/



/*-----------GAME START-----------*/
initFields();
draw_Canvas(Cwidth, Cheight);
canvas.addEventListener('keydown', onKeyDown, false);
canvas.setAttribute('tabindex','0');
canvas.focus();
interface();






var blocks = new Array(Cheight/Gheight);
var mazeContent = [

//ROW1
[BOTTOM_LEFT_TOP,RIGHT_TOP,BOTTOM_LEFT_TOP,TOP_BOTTOM,TOP_RIGHT_BOTTOM,LEFT_TOP,TOP_BOTTOM,RIGHT_TOP,LEFT_TOP,TOP_ONLY,TOP_ONLY,TOP_ONLY,TOP_ONLY,TOP_ONLY,TOP_ONLY,RIGHT_TOP,CLOSED_GRID],



//ROW2
[CLOSED_GRID,LEFT_ONLY,TOP_BOTTOM,TOP_BOTTOM,TOP_BOTTOM,RIGHT_ONLY,LEFT_TOP_RIGHT,LEFT_RIGHT,LEFT_BOTTOM,BOTTOM_ONLY,BOTTOM_ONLY,BOTTOM_ONLY,BOTTOM_ONLY,BOTTOM_ONLY,BOTTOM_ONLY,BOTTOM_ONLY,TOP_RIGHT_BOTTOM],



//ROW3
[ BOTTOM_LEFT_TOP,RIGHT_ONLY,LEFT_TOP,TOP_BOTTOM,RIGHT_TOP,LEFT_RIGHT,LEFT_RIGHT,LEFT_ONLY,TOP_BOTTOM,TOP_BOTTOM,TOP_BOTTOM,TOP_BOTTOM,RIGHT_TOP,BOTTOM_LEFT_TOP,TOP_ONLY,TOP_BOTTOM,TOP_RIGHT_BOTTOM
],



//ROW4

[LEFT_TOP_RIGHT,LEFT_RIGHT,RIGHT_BOTTOM_LEFT,CLOSED_GRID,RIGHT_BOTTOM_LEFT,LEFT_RIGHT,RIGHT_BOTTOM_LEFT,LEFT_RIGHT,BOTTOM_LEFT_TOP,TOP_BOTTOM,TOP_BOTTOM,TOP_RIGHT_BOTTOM,LEFT_ONLY,RIGHT_TOP,LEFT_RIGHT,LEFT_TOP,TOP_RIGHT_BOTTOM
],




//ROW5
[RIGHT_BOTTOM_LEFT,LEFT_ONLY,TOP_BOTTOM,TOP_BOTTOM,TOP_ONLY,BOTTOM_ONLY,TOP_BOTTOM,EMPTY_GRID,TOP_BOTTOM,TOP_BOTTOM,TOP_BOTTOM,TOP_ONLY,BOTTOM_ONLY,RIGHT_BOTTOM,LEFT_RIGHT,LEFT_RIGHT,CLOSED_GRID
],

//ROW6
[BOTTOM_LEFT_TOP,RIGHT_ONLY,BOTTOM_LEFT_TOP,RIGHT_TOP,RIGHT_BOTTOM_LEFT,LEFT_TOP,TOP_RIGHT_BOTTOM,LEFT_RIGHT,LEFT_TOP,TOP_BOTTOM,RIGHT_TOP,
LEFT_RIGHT,BOTTOM_LEFT_TOP,TOP_ONLY,RIGHT_ONLY,LEFT_BOTTOM,TOP_RIGHT_BOTTOM
],



//ROW7
[LEFT_TOP_RIGHT,LEFT_RIGHT,CLOSED_GRID,LEFT_BOTTOM,TOP_BOTTOM,RIGHT_BOTTOM,CLOSED_GRID,LEFT_RIGHT,LEFT_RIGHT,LEFT_TOP_RIGHT,LEFT_RIGHT,LEFT_RIGHT,CLOSED_GRID,LEFT_BOTTOM,BOTTOM_ONLY,TOP_BOTTOM,TOP_RIGHT_BOTTOM
],
//ROW8
[LEFT_RIGHT,LEFT_BOTTOM,TOP_BOTTOM,TOP_BOTTOM,TOP_ONLY,TOP_BOTTOM,TOP_BOTTOM,RIGHT_ONLY,LEFT_RIGHT,LEFT_RIGHT,LEFT_RIGHT,LEFT_ONLY,TOP_BOTTOM,TOP_BOTTOM,TOP_BOTTOM,TOP_BOTTOM,RIGHT_TOP
],



//ROW9
[LEFT_BOTTOM,TOP_BOTTOM,TOP_BOTTOM,TOP_RIGHT_BOTTOM,LEFT_RIGHT,LEFT_TOP,RIGHT_TOP,LEFT_RIGHT,LEFT_RIGHT,LEFT_RIGHT,LEFT_RIGHT,LEFT_RIGHT,LEFT_TOP,TOP_BOTTOM,RIGHT_TOP,CLOSED_GRID,LEFT_RIGHT
],
//ROW10
[LEFT_TOP,TOP_ONLY,TOP_ONLY,RIGHT_TOP,LEFT_RIGHT,LEFT_BOTTOM,RIGHT_BOTTOM,LEFT_RIGHT,RIGHT_BOTTOM_LEFT,LEFT_RIGHT,RIGHT_BOTTOM_LEFT,LEFT_RIGHT,RIGHT_BOTTOM_LEFT,LEFT_TOP_RIGHT,LEFT_BOTTOM,RIGHT_TOP,LEFT_RIGHT
],




//ROW11
[LEFT_ONLY,EMPTY_GRID,EMPTY_GRID,RIGHT_ONLY,LEFT_ONLY,TOP_BOTTOM,TOP_ONLY,BOTTOM_ONLY,TOP_BOTTOM,BOTTOM_ONLY,TOP_BOTTOM,BOTTOM_ONLY,TOP_ONLY,BOTTOM_ONLY,RIGHT_TOP,LEFT_RIGHT,LEFT_RIGHT
],

//ROW12
[LEFT_ONLY,EMPTY_GRID,EMPTY_GRID,RIGHT_ONLY,LEFT_RIGHT,LEFT_TOP_RIGHT,LEFT_RIGHT,LEFT_TOP,TOP_ONLY,TOP_ONLY,TOP_ONLY,RIGHT_TOP,LEFT_RIGHT,CLOSED_GRID,LEFT_RIGHT,RIGHT_BOTTOM_LEFT,LEFT_RIGHT
],




//ROW13
[LEFT_ONLY,EMPTY_GRID,EMPTY_GRID,RIGHT_ONLY,LEFT_RIGHT,LEFT_RIGHT,LEFT_RIGHT,LEFT_BOTTOM,BOTTOM_ONLY,BOTTOM_ONLY,BOTTOM_ONLY,RIGHT_BOTTOM,LEFT_ONLY,TOP_BOTTOM,BOTTOM_ONLY,TOP_BOTTOM,RIGHT_ONLY
],
//ROW14
[LEFT_ONLY,EMPTY_GRID,EMPTY_GRID,RIGHT_ONLY,LEFT_RIGHT,LEFT_RIGHT,LEFT_ONLY,TOP_BOTTOM,TOP_ONLY,TOP_BOTTOM,TOP_ONLY,TOP_BOTTOM,RIGHT_ONLY,BOTTOM_LEFT_TOP,TOP_BOTTOM,RIGHT_TOP,LEFT_RIGHT
],
//ROW15
[LEFT_ONLY,EMPTY_GRID,EMPTY_GRID,RIGHT_ONLY,LEFT_RIGHT,LEFT_RIGHT,LEFT_RIGHT,LEFT_TOP_RIGHT,LEFT_RIGHT,CLOSED_GRID,LEFT_RIGHT,LEFT_TOP_RIGHT,LEFT_ONLY,TOP_BOTTOM,RIGHT_TOP,LEFT_RIGHT,LEFT_RIGHT
],



//ROW16
[LEFT_ONLY,EMPTY_GRID,EMPTY_GRID,RIGHT_ONLY,LEFT_RIGHT,RIGHT_BOTTOM_LEFT,LEFT_RIGHT,LEFT_RIGHT,LEFT_BOTTOM,TOP_ONLY,RIGHT_BOTTOM,LEFT_RIGHT,LEFT_RIGHT,CLOSED_GRID,LEFT_RIGHT,RIGHT_BOTTOM_LEFT,LEFT_RIGHT
],

//ROW17
[LEFT_BOTTOM,BOTTOM_ONLY,BOTTOM_ONLY,RIGHT_BOTTOM,LEFT_BOTTOM,TOP_BOTTOM,RIGHT_BOTTOM,LEFT_BOTTOM,TOP_RIGHT_BOTTOM,RIGHT_BOTTOM_LEFT,BOTTOM_LEFT_TOP,RIGHT_BOTTOM,LEFT_BOTTOM,TOP_BOTTOM,BOTTOM_ONLY,TOP_BOTTOM,RIGHT_BOTTOM
],
];