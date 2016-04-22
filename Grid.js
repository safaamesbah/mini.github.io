var id = -1;

//wall cases
var CROSS_RD = -1;//no wall
var LEFT_ONLY = 0;
var TOP_ONLY = 1;
var RIGHT_ONLY = 2;
var BOTTOM_ONLY = 3;

var LEFT_RIGHT = 4;
var LEFT_TOP = 5;
var LEFT_BOTTOM = 6;

var RIGHT_TOP = 7;
var RIGHT_BOTTOM = 8;
var TOP_BOTTOM = 9;

var BOTTOM_LEFT_TOP = 10;
var LEFT_TOP_RIGHT = 11;
var TOP_RIGHT_BOTTOM = 12;
var RIGHT_BOTTOM_LEFT = 13;

var EMPTY_GRID = 14;
var CLOSED_GRID = 15;



function Grid (xCord, yCord, gridType, beanType) {
	this.x = xCord;
	this.y = yCord;
	this.gridType = gridType===undefined? EMPTY_GRID : gridType;
	this.beanType = beanType;
}

Grid.prototype.getRow = function() {
	return Index_row(this.y);
};

Grid.prototype.getCol = function() {
	return Index_column(this.x);
};

Grid.prototype.hasBean = true;


Grid.prototype.toString = function() {
	return "Grid ("+this.x+","+this.y+") - Grid Type: " + this.gridType;
};



Grid.prototype.draw = function() {
	ctx.fillStyle = background_color;
	ctx.fillRect(this.x, this.y, Gwidth, Gheight);
	var gridType = this.gridType	;
	if(gridType === undefined || gridType === EMPTY_GRID){
		this.drawBean();
		return;
	}

	switch(gridType){

		case LEFT_ONLY:
		this.addLeftEdge();
		break;

		case RIGHT_ONLY:
		this.addRightEdge();
		break;

		case TOP_ONLY:
		this.addTopEdge();
		break;

		case BOTTOM_ONLY:
		this.addBottomEdge();
		break;

		case LEFT_RIGHT:
		this.addLeftEdge();
		this.addRightEdge();
		break;

		case LEFT_TOP:
		this.addLeftEdge();
		this.addTopEdge();
		break;

		case LEFT_BOTTOM:
		this.addLeftEdge();
		this.addBottomEdge();
		break;

		case RIGHT_TOP:
		this.addRightEdge();
		this.addTopEdge();
		break;

		case RIGHT_BOTTOM:
		this.addRightEdge();
		this.addBottomEdge();
		break;

		case TOP_BOTTOM:
		this.addTopEdge();
		this.addBottomEdge();
		break;

		case CROSS_RD:
		this.makeCrossRoad();
		break;

		case LEFT_TOP_RIGHT:
		this.addLeftEdge();
		this.addTopEdge();
		this.addRightEdge();
		break;

		case TOP_RIGHT_BOTTOM:
		this.addTopEdge();
		this.addRightEdge();
		this.addBottomEdge();
		break;

		case RIGHT_BOTTOM_LEFT:
		this.addRightEdge();
		this.addBottomEdge();
		this.addLeftEdge();
		break;

		case BOTTOM_LEFT_TOP:
		this.addBottomEdge();
		this.addLeftEdge();
		this.addTopEdge();
		break;

		case CLOSED_GRID:
		this.addLeftEdge();
		this.addTopEdge();
		this.addBottomEdge();
		this.addRightEdge();
		break;

		default:
		break;
	}
	this.drawBean();	
};

Grid.prototype.addLeftEdge = function() {
	ctx.fillStyle = border_color;
	ctx.fillRect(this.x, this.y, wheight, Gheight);
};

Grid.prototype.addRightEdge = function() {
	ctx.fillStyle = border_color;
	ctx.fillRect(this.x+Gwidth - wheight , this.y, wheight , Gheight);
};

Grid.prototype.addTopEdge = function() {
	ctx.fillStyle = border_color;
	ctx.fillRect(this.x, this.y, Gwidth, wheight);
};

Grid.prototype.addBottomEdge = function() {
	ctx.fillStyle = border_color;
	ctx.fillRect(this.x, this.y + Gheight - wheight, Gwidth, wheight);
};

Grid.prototype.makeCrossRoad = function() {
	ctx.fillStyle = border_color;
	ctx.fillRect(this.x, this.y, wheight, wheight);
	ctx.fillRect(this.x + Gwidth - wheight, this.y, wheight, wheight);
	ctx.fillRect(this.x, this.y + Gheight - wheight, wheight, wheight);
	ctx.fillRect(this.x + Gwidth - wheight, this.y + Gheight - wheight, wheight, wheight);

};


//draw a bean at the center of this grid
Grid.prototype.drawBean = function() {
	var beanType = this.beanType;
	var centerX = this.x + Gwidth/2;
	var centerY = this.y + Gheight/2;

	ctx.fillStyle = beans;
	if(beanType === undefined){
		return;
	}

	if(beanType === NORMAL_BEAN){
		circle(ctx, centerX, centerY, NORMAL_BEAN_RADIUS);
	}
	else if(beanType === POWER_BEAN){
		circle(ctx, centerX, centerY, POWER_BEAN_RADIUS);
	}
	else{
		//unkwon bean type
		return;
	}

};