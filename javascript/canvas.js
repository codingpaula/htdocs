// task circle constructor 
function Shape(x,y,w,h,fill) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 1;
	this.h = h || 1;
	this.fill = fill || '#AAAAAA';
}

// draw circle on field canvas
Circle.prototype.draw = function(ctx) {
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x,this.y,this.w,this.h);
}

function CanvasState(canvas) {
	// Setup
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.ctx = canvas.getContext('2d');
	// fixes mouse co-ordinate problems
	var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
	if (document.defaultView && document.defaultView.getComputedStyle) {
		this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
		this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
		this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
		this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;		
	}
	var html = document.body.parentNode;
	this.htmlTop = html.offsetTop;
	this.htmlLeft = html.offsetLeft;

	// Keep track of state!

	this.valid = false; // when set to false, the canvas will redraw everything
	this.shapes = []; // the collection of things to be drawn
	this.dragging = false; // keep track of when we are draggin
	// the current selected object
	this.selection = null;
	this.dragoffx = 0;
	this.dragoffy = 0;

	// Events

	var myState = this;

	// fixed double clicking caused text to be selected
	canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
	// up, down and move for dragging
	canvas.addEventListener('mousedown', function(e) {
		var mouse = myState.getMouse(e);
		var mx = mouse.x;
		var my = mouse.y;
		var shapes = myState.shapes;
		var l = shapes.length;
		for (var i = l-1; i >= 0; i--) {
			if (shapes[i].contains(mx, my)) {
				// keep track of place in object where clicked
				myState.dragoffx = mx - mySel.x;
				myState.dragoffy = my - mySel.y;
				myState.dragging = true;
				myState.selection = mySel;
				myState.valid = false;
				return;
			}
		}
		// not returned? -> failed to select something
		// object selected -> deselect
		if (myState.selection) {
			myState.selection = null;
			myState.valid = false;
		}
	}, true);
	canvas.addEventListener('mousemove', function(e) {
		if (myState.dragging) {
			var mouse = myState.getMouse(e);
			// drag from place on the object where clicked
			myState.selection.x = mouse.x - myState.dragoffx;
			myState.selection.y = mouse.y - myState.dragoffy;
			myState.valid = false;
		}
	}, true);
	canvas.addEventListener('mouseup', function(e) {
		myState.dragging = false;
	}, true);
	// double click for making new shapes
	canvas.addEventListener('dbclick', function(e) {
		var mouse = myState.getMouse(e);
		myState.addShape(new Shape(mouse.x - 10, mouse.y - 10, 20, 20, 'rgba(0,2555,0,.6'));
	}, true);

	// Options

	this.selectionColor = '#CC0000';
	this.selectionWidth = 2;
	this.interval = 30;
	setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.addShape = function(shape) {
	this.shapes.push(shape);
	this.valid = false;
}

CanvasState.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
}

CanvasState.prototype.draw = function() {
	if (!this.valid) {
		var ctx = this.ctx;
		var shapes = this.shapes;
		this.clear();

		// background
		drawAxes(ctx, 900, 700);

		// draw all shapes
		var l = shapes.length;
		for (var i = 0; i < l; i++) {
			var shape = shapes[i];
			if (shape.x > this.width || shape.y > this.height || shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
			shapes[i].draw(ctx);
		}

		// draw selection
		if (this.selection != null) {
			ctx.strokeStyle = this.selectionColor;
			ctx.lineWidth = this.selectionWidth;
			var mySel = this.selection;
			ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
		}

		// Add stuff you want drawn o top all the time here
		// axes?

		this.valid = true;
	}
}

CanvasState.prototype.getMouse = function(e) {
	var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

	if (element.offsetParent !== undefined) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		} while ((element = element.offsetParent));
	}

	offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
	offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

	mx = e.pageX - offsetX;
	my = e.pageY - offsetY;

	return {x: mx, y: my};
}

function init() {
	var s = new CanvasState(document.getElementById('canvas1'));
	s.addShape(new Shape(40,40,50,50));
	s.addShape(new Shape(60,140,40,60, 'lightskyblue'));
	s.addShape(new Shape(80,150,60,30, 'rgba(127, 255, 212 .5)'));
	s.addShape(new Shape(125,80,30,80, 'rgba(245, 222, 179, .7)'));
}

init();