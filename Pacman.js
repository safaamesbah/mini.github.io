function Pacman(xCord, yCord, direction){
	this.x = xCord;
	this.y = yCord;
	this.direction = direction;
	this.nextDir = undefined; //the direction to turn at next available turning point
	this.radius = PACMAN_RADIUS;
	this.mouthOpen = true;
}


Pacman.prototype.draw = function(color) {
	if (color == undefined){
		ctx.fillStyle = PACMAN_COLOR;
	}
	else{
		ctx.fillStyle = color;
	}
	ctx.beginPath();

		
	if (!this.mouthOpen){
		switch(this.direction){
			case UP:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*11/18, 2*Math.PI-Math.PI*7/18, true);
			
			break;

			case DOWN:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*29/18, 2*Math.PI-Math.PI*25/18, true);
			break;

			case LEFT:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*10/9, 2*Math.PI-Math.PI*8/9, true);
			break;

			case RIGHT:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI/9, 2*Math.PI-Math.PI*17/9, true);
			
			
			break;

			default:
			break;
		}
		
	}
	else {
		switch(this.direction){
			case UP:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*7/9, 2*Math.PI-Math.PI*2/9, true);
			break;

			case DOWN:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*16/9, 2*Math.PI-Math.PI*11/9, true);
			break;

			case LEFT:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*23/18, 2*Math.PI-Math.PI*13/18, true);
			break;

			case RIGHT:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*5/18, 2*Math.PI-Math.PI*31/18, true);
			
			break;

			default:
			break;

		}
	}


	
	
	ctx.lineTo(this.x, this.y);
	ctx.fill();
};

//get the row index of current location
Pacman.prototype.getRow = function() {
	return Index_row(this.y);
};

//get the col index of current location
Pacman.prototype.getCol = function() {
	return Index_column(this.x);
};

//return if pacman can move with current direction & tile
Pacman.prototype.checkMove = function(direction) {
	return checkMove(this.x, this.y, direction);
};

//try to turn(if necessary) and move the pacman.
Pacman.prototype.move = function() {
	if(onGridCenter(this.x, this.y) === false){
		//not on a grid center
		if(this.nextDir != undefined &&  (
			(this.direction === UP && this.nextDir === DOWN )||
			(this.direction === DOWN && this.nextDir === UP) ||
			(this.direction === LEFT && this.nextDir === RIGHT) ||
 			(this.direction === RIGHT && this.nextDir ===LEFT)
			))
		{
			this.direction = this.nextDir;
			this.nextDir = undefined;
		}

		this.moveOneStep();

		return;
	}
	else{
		//on grid center. change direction if needed

		if(this.nextDir != undefined && this.checkMove(this.nextDir)){
			this.direction = this.nextDir;
			this.nextDir = undefined;
			this.moveOneStep();
		}
		else{
			//check if pacman can keep moving
			if(this.checkMove(this.direction)){
				this.moveOneStep();
			}
		}	
	}
};

//move one step in the current direction if allowed
Pacman.prototype.moveOneStep = function() {
	var newX =0;
	var newY =0;
	if(!checkMove(this.x, this.y, this.direction)){
		return;
	}
	switch(this.direction){

		case UP:
		newY = this.y  - speed;
		if(newY - this.radius - wheight > 0){
			this.y = newY;
			this.mouthOpen = ! this.mouthOpen;
		}
		break;

		case DOWN:
		newY = this.y + speed;
		if(newY + this.radius + wheight < Cheight) {
			this.y = newY;
			this.mouthOpen = ! this.mouthOpen;

		}
		break;


		case LEFT:
		newX = this.x - speed;
		if(newX - this.radius - wheight > 0 ){
			this.x = newX;
			this.mouthOpen = ! this.mouthOpen;
		}
		break;

		case RIGHT:
		newX = this.x + speed;

		if(newX + this.radius + wheight < Cwidth){
			this.x = newX;
			this.mouthOpen = ! this.mouthOpen;
		}
		break;
		
		default:
		break;
	}
};