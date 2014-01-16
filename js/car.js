function Car () {
	// this.x = newX;
	// this.y = newY;
	// this.rotation = newRotation;
	this.img = new Image();   // Create new img element
	this.img.onload = function(){
	  // execute drawImage statements here
	};
	this.img.src = 'img/car.png'; // Set source path

	// collision
	this.collisions = {
		top: new CollisionPoint(this, 0),
		bottom: new CollisionPoint(this, 180),
	};

	return this;
}
Car.prototype = {
	code: 'player',
	x: 470,
	y: 100,
	rotation: 240,
	acceleration: 1.1,
	rotationStep: 4,
	speed: 0,
	speedDecay: 0.98,
	maxSpeed: 4,
	backSpeed: 1.1,

	isMoving: function (speed) {
		return !(this.speed > -0.4 && this.speed < 0.4);
	},
	getCenter: function(){
		return {
			x: this.x,
			y: this.y
		};
	},
	accelerate: function(){
		if (this.speed < this.maxSpeed){
			if (this.speed < 0){
				this.speed *= this.speedDecay;
			} else if (this.speed === 0){
				this.speed = 0.4;
			} else {
				this.speed *= this.acceleration;
			}
		}
	},
	decelerate: function(min){
		min = min || 0;
		if (Math.abs(this.speed) < this.maxSpeed){
			if (this.speed > 0){
				this.speed *= this.speedDecay;
				this.speed = this.speed < min ? min : this.speed;
			} else if (this.speed === 0){
				this.speed = -0.4;
			} else {
				this.speed *= this.backSpeed;
				this.speed = this.speed > min ? min : this.speed;
			}
		}
	},
	steerLeft: function(){
		if (this.isMoving()){
			this.rotation -= this.rotationStep * (this.speed/this.maxSpeed);
		}
	},
	steerRight: function(){
		if (this.isMoving()){
			this.rotation += this.rotationStep * (this.speed/this.maxSpeed);
		}
	}
};

