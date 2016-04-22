function Ghost(xCord, yCord, gColor, direction){
	this.x = xCord;
	this.y = yCord;
	this.color = gColor;
	this.direction = direction;
	this.isWeak = false;
	this.radius = GHOST_RADIUS;
	this.isMoving = false;
	this.isBlinking = false;
	this.isDead = false;
	this.speed = speed;
	this.stepCounter = 0;

}

//send this ghost back to ghost house.
//location in ghost house is determined by its color
Ghost.prototype.toGhostHouse = function() {
	var initX, initY;
	switch(this.color){
			case BROWN:
			initX = ghostHouse[0][1]*Gwidth + Gwidth/2;
			initY = ghostHouse[0][0]*Gwidth + Gwidth/2;
			break;

			case BLUE:
			initX =  ghostHouse[1][1]*Gwidth + Gwidth/2;
			initY =  ghostHouse[1][0]*Gwidth + Gwidth/2;
			break;

			case GREEN:
			initX = ghostHouse[2][1]*Gwidth + Gwidth/2;
			initY = ghostHouse[2][0]*Gwidth + Gwidth/2;
  			break;

			case PURPLE:
			initX = ghostHouse[3][1]*Gwidth + Gwidth/2;
			initY = ghostHouse[3][0]*Gwidth + Gwidth/2;
			break;


		}
	this.x = initX;
	this.y = initY;
	this.direction = DOWN;
	this.stepCounter = 0;
};

Ghost.prototype.draw = function() {

	if(!this.isDead){
		// body color
		if(this.isWeak){
			if(this.isBlinking){
				ctx.fillStyle = RECOVERING;
			}
			else{
				ctx.fillStyle = EAT_GHOST;
			}
		}
		else{
			ctx.fillStyle = this.color;
		}
		
		ctx.beginPath();

		ctx.arc(this.x, this.y, this.radius, Math.PI, 0, false);
		ctx.moveTo(this.x-this.radius, this.y);
		

		// LEGS
		if (!this.isMoving){
			ctx.lineTo(this.x-this.radius, this.y+this.radius);
			ctx.lineTo(this.x-this.radius+this.radius/3, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x-this.radius+this.radius/3*2, this.y+this.radius);
			ctx.lineTo(this.x, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x+this.radius/3, this.y+this.radius);
			ctx.lineTo(this.x+this.radius/3*2, this.y+this.radius-this.radius/4);

			ctx.lineTo(this.x+this.radius, this.y+this.radius);
			ctx.lineTo(this.x+this.radius, this.y);
		}
		else {
			ctx.lineTo(this.x-this.radius, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x-this.radius+this.radius/3, this.y+this.radius);
			ctx.lineTo(this.x-this.radius+this.radius/3*2, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x, this.y+this.radius);
			ctx.lineTo(this.x+this.radius/3, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x+this.radius/3*2, this.y+this.radius);
			ctx.lineTo(this.x+this.radius, this.y+this.radius-this.radius/4);
			ctx.lineTo(this.x+this.radius, this.y);
		}
		

		ctx.fill();
	}


	if(this.isWeak){

		if(this.isBlinking){
			ctx.fillStyle = "#9c2020";
			ctx.strokeStyle = "#ececec";
		}
		else{
			ctx.fillStyle = "#ececec";
			ctx.strokeStyle = "#ececec";
		}

		//eyes
		ctx.beginPath();//left eye
		ctx.arc(this.x-this.radius/2.5, this.y-this.radius/5, this.radius/5, 0, Math.PI*2, true); // white
		ctx.fill();

		ctx.beginPath(); // right eye
		ctx.arc(this.x+this.radius/2.5, this.y-this.radius/5, this.radius/5, 0, Math.PI*2, true); // white
		ctx.fill();

		//mouth
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.moveTo(this.x-this.radius+this.radius/5, this.y+this.radius/2);
		ctx.lineTo(this.x-this.radius+this.radius/3, this.y+this.radius/4);
		ctx.lineTo(this.x-this.radius+this.radius/3*2, this.y+this.radius/2);
		ctx.lineTo(this.x, this.y+this.radius/4);
		ctx.lineTo(this.x+this.radius/3, this.y+this.radius/2);
		ctx.lineTo(this.x+this.radius/3*2, this.y+this.radius/4);
		ctx.lineTo(this.x+this.radius-this.radius/5, this.y+this.radius/2);
		ctx.stroke();
	}
	else{
		// EYES
		ctx.fillStyle = "#ececec"; //left eye
		ctx.beginPath();
		ctx.arc(this.x-this.radius/2.5, this.y-this.radius/5, this.radius/3, 0, Math.PI*2, true); // white
		ctx.fill();

		ctx.fillStyle = "#ececec"; //right eye
		ctx.beginPath();
		ctx.arc(this.x+this.radius/2.5, this.y-this.radius/5, this.radius/3, 0, Math.PI*2, true); // white
		ctx.fill();


		switch(this.direction){

			case UP:
				ctx.fillStyle="#000000"; //left eyeball
				ctx.beginPath();
				ctx.arc(this.x-this.radius/3, this.y-this.radius/5-this.radius/6, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();

				ctx.fillStyle="#000000"; //right eyeball
				ctx.beginPath();
				ctx.arc(this.x+this.radius/3, this.y-this.radius/5-this.radius/6, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();
			break;

			case DOWN:
				ctx.fillStyle="#000000"; //left eyeball
				ctx.beginPath();
				ctx.arc(this.x-this.radius/3, this.y-this.radius/5+this.radius/6, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();

				ctx.fillStyle="#000000"; //right eyeball
				ctx.beginPath();
				ctx.arc(this.x+this.radius/3, this.y-this.radius/5+this.radius/6, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();
			break;

			case LEFT:
				ctx.fillStyle="#000000"; //left eyeball
				ctx.beginPath();
				ctx.arc(this.x-this.radius/3-this.radius/5, this.y-this.radius/5, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();

				ctx.fillStyle="#000000"; //right eyeball
				ctx.beginPath();
				ctx.arc(this.x+this.radius/3-this.radius/15, this.y-this.radius/5, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();
			break;

			case RIGHT:
				ctx.fillStyle="#000000"; //left eyeball
				ctx.beginPath();
				ctx.arc(this.x-this.radius/3+this.radius/15, this.y-this.radius/5, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();

				ctx.fillStyle="#000000"; //right eyeball
				ctx.beginPath();
				ctx.arc(this.x+this.radius/3+this.radius/5, this.y-this.radius/5, this.radius/6, 0, Math.PI*2, true); //black
				ctx.fill();
			break;

		}

	}


	
};

Ghost.prototype.getRow = function() {
	return Index_row(this.y);
};

Ghost.prototype.getCol = function() {
	return Index_column(this.x);
};

//move one step in the current direction if allowed
Ghost.prototype.moveOneStep = function() {
	// body...
	var newX =0;
	var newY =0;
	if(!checkMove(this.x, this.y, this.direction)){
		return;
	}
	switch(this.direction){

		case UP:
		newY = this.y  - this.speed;
		if(newY - this.radius - wheight > 0){
			this.y = newY;
		}
		break;

		case DOWN:
		newY = this.y + this.speed;
		if(newY + this.radius + wheight < Cheight) {
			this.y = newY;

		}
		break;


		case LEFT:
		newX = this.x - this.speed;
		if(newX - this.radius - wheight > 0 ){
			this.x = newX;
		}
		break;

		case RIGHT:
		newX = this.x + this.speed;

		if(newX + this.radius + wheight < Cwidth){
			this.x = newX;
		}
		break;
		
		default:
		break;
	}
};

//make an 180-degree turn
Ghost.prototype.turnBack = function() {
	this.direction = oppositeDir(this.direction);
};

//try to turn(if necessary) and move the ghost
Ghost.prototype.move = function() {

	this.isMoving = !this.isMoving;//so the ghost looks like it's moving
	if(this.isWeak){
		//if weak, reduce speed and make an immediate turn.
		//Ghost starts making random moves until turning back to normal
		this.speed = speed/2;
		if(weakCounter === TIMER_WEAK){
			this.direction = oppositeDir(this.direction);
		}
		if(onGridCenter(this.x, this.y) === false){
			this.moveOneStep();
		}
		else{
			var currGrid = blocks[Index_row(this.y)][Index_column(this.x)];
			if(currGrid.gridType === LEFT_TOP_RIGHT){
				this.direction = DOWN;
				this.moveOneStep();
			}
			else if(currGrid.gridType === TOP_RIGHT_BOTTOM){
				this.direction = LEFT;
				this.moveOneStep();
			}
			else if(currGrid.gridType === RIGHT_BOTTOM_LEFT){
				this.direction = UP;
				this.moveOneStep();
			}
			else if(currGrid.gridType === BOTTOM_LEFT_TOP){
				this.direction = RIGHT;
				this.moveOneStep();
			}
			else{
				this.randomMove();
			}

		}

		this.stepCounter++;
	}
	else{
		//normal ghost
		if(this.stepCounter != 0 && this.stepCounter % 2 !=0){
			this.speed = speed/2;
			this.stepCounter = 0;
		}
		else{
			this.speed = speed;
		}
		if(onGridCenter(this.x, this.y) === false){
			this.moveOneStep();
		}
		else{
			// on grid center
			//first check if dead end
			var currGrid = blocks[Index_row(this.y)][Index_column(this.x)];
			if(currGrid.gridType === LEFT_TOP_RIGHT){
				this.direction = DOWN;
				this.moveOneStep();
			}
			else if(currGrid.gridType === TOP_RIGHT_BOTTOM){
				this.direction = LEFT;
				this.moveOneStep();
			}
			else if(currGrid.gridType === RIGHT_BOTTOM_LEFT){
				this.direction = UP;
				this.moveOneStep();
			}
			else if(currGrid.gridType === BOTTOM_LEFT_TOP){
				this.direction = RIGHT;
				this.moveOneStep();
			}
			else{
				switch(this.color){
					case PURPLE:
					case GREEN:

					//ghost1
					this.ghost1Move();
					break;

					case BLUE:
					case BROWN:
					//ghost2
					this.ghost3Move();
					break;

				
				}
			}
		}
	}

};

//ghost1 always chooses the tile that will make it closest to pacman
Ghost.prototype.ghost1Move = function() {
	this.moveToPacman(true);
};


//ghost2 is unpredictable, makes random move
Ghost.prototype.ghost3Move = function() {
	this.randomMove();
};

Ghost.prototype.moveToPacman = function(targetPacman) {
	var veryLargeDistance = Cwidth*Cheight;
	var leftDist, rightDist, upDist, downDist;
	var currDir = this.direction;
	var minDist = veryLargeDistance;
	//get distance if moved to left
	if(currDir === RIGHT || !checkMove(this.x, this.y, LEFT)){
		leftDist = veryLargeDistance;
	}
	else{
		leftDist = this.getTestDistance(LEFT,targetPacman);
	}

	//get distance to right
	if(currDir === LEFT || !checkMove(this.x, this.y, RIGHT)){
		rightDist = veryLargeDistance;
	}
	else{
		rightDist = this.getTestDistance(RIGHT,targetPacman);
	}

	//get distance - up
	if(currDir === DOWN || !checkMove(this.x, this.y, UP)){
		upDist = veryLargeDistance;
	}
	else{
		upDist = this.getTestDistance(UP,targetPacman);
	}

	//get distance - down
	if(currDir === UP || !checkMove(this.x, this.y, DOWN)){
		downDist = veryLargeDistance;
	}
	else{
		downDist = this.getTestDistance(DOWN, targetPacman);
	}
	this.direction = currDir;
	minDist = Math.min(Math.min(leftDist, rightDist), Math.min(upDist, downDist));
	switch(minDist){
		case leftDist:
		this.direction = LEFT;
		break;

		case rightDist:
		this.direction = RIGHT;
		break;

		case upDist:
		this.direction = UP;
		break;

		case downDist:
		this.direction = DOWN;
		break;
	}
	this.moveOneStep();
};

//get the distance from this ghost to pacman as if it moved one step in the given direction
Ghost.prototype.getTestDistance = function(direction, targetPacman) {
	var toReturn = 0;
	this.direction = direction;
	this.moveOneStep();
	if(targetPacman){
		toReturn = Math.sqrt(Math.pow( (this.x - PAC_man.x)  ,2)+Math.pow( this.y -PAC_man.y,2));
	}
	else{
		switch(PAC_man.direction){
			case LEFT:
			toReturn = Math.sqrt(Math.pow( (this.x - (PAC_man.x - 4*Gwidth))  ,2)+Math.pow( this.y -PAC_man.y,2));
			break;

			case RIGHT:
			toReturn = Math.sqrt(Math.pow( (this.x - (PAC_man.x + 4*Gwidth))  ,2)+Math.pow( this.y -PAC_man.y,2));
			break;

			case UP:
			toReturn = Math.sqrt(Math.pow( (this.x - PAC_man.x)  ,2)+Math.pow( this.y - (PAC_man.y - 4*Gheight),2));
			break;

			case DOWN:
			toReturn = Math.sqrt(Math.pow( (this.x - PAC_man.x)  ,2)+Math.pow( this.y - (PAC_man.y  + 4*Gheight),2));
			break;

			default:
			toReturn = Math.sqrt(Math.pow( (this.x - PAC_man.x)  ,2)+Math.pow( this.y -PAC_man.y,2));
			break;

		}
	}
	this.turnBack();
	this.moveOneStep();
	return toReturn;
};

//make random move at intersection
Ghost.prototype.randomMove = function() {
	var nextDir =  parseInt(Math.random()*4)+1;
	while(true){
		if( nextDir != oppositeDir(this.direction) 
			&& checkMove(this.x, this.y, nextDir)){
			break;
		}
		nextDir =  parseInt(Math.random()*4)+1;
	}

	this.direction = nextDir;
	this.moveOneStep();
};