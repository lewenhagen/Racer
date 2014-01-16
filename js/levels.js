var levelData = function(){
	this.levels = [{
		level: 0,
		track: 'img/tracks/startImg.png', // level image
		trackHit: 'img/tracks/startImgHit.png', // level hitmap
		goalTime: 0, // time to beat
		bestLapTime: [99,99,99],
		lvlTimeToInt: 999999,
		car: 0, // car
		carPosX: 83, // Start X position
		carPosY: 46, // Start Y position
		carRot: 0, // Start rotation point
		lapOkXMax: 0, // limit for the lap to be OK
		lapOkXMin: 0, // limit for the lap to be OK
		lapOkYMax: 0, // limit for the lap to be OK
		lapOkYMin: 0, // limit for the lap to be OK
		musicSrc: document.getElementById('soundStartGame') // background music source
	},{
		level: 1,
		track: 'img/tracks/track1.png', // level image
		trackHit: 'img/tracks/track1-hit.png', // level hitmap
		goalTime: [0, 45, 0], // time to beat 
		bestLapTime: [99,99,99],
		lvlTimeToInt: 999999,
		car: 0, // car
		carPosX: 470, // Start X position
		carPosY: 100, // Start Y position
		carRot: 270, // Start rotation point
		lapOkXMax: 470, // limit for the lap to be OK
		lapOkXMin: 460, // limit for the lap to be OK
		lapOkYMax: 170, // limit for the lap to be OK
		lapOkYMin: 75, // limit for the lap to be OK
		musicSrc: document.getElementById('levelOne') // background music source
	},{
		level: 2, //level
		track: 'img/tracks/track2.png', // level image
		trackHit: 'img/tracks/track2-hit.png', // level hitmap
		goalTime: [0,40, 0], // time to beat
		bestLapTime: [99,99,99],
		
		lvlTimeToInt: 999999,
		car: 0,	// car
		carPosX: 710, // Start X position
		carPosY: 265, // Start Y position
		carRot: 0, // Start rotation point
		lapOkXMax: 740, // limit for the lap to be OK
		lapOkXMin: 670, // limit for the lap to be OK
		lapOkYMax: 270, // limit for the lap to be OK
		lapOkYMin: 260, // limit for the lap to be OK
		musicSrc: document.getElementById('levelTwo') // background music source
	},{
		level: 3,
		track: 'img/tracks/track3.png', // level image
		trackHit: 'img/tracks/track3-hit.png', // level hitmap
		goalTime: [1,35,0], // time to beat Min/Sec/hundreds
		bestLapTime: [99,99,99],
		bestTotalTime: [99,99,99],
		lvlTimeToInt: 999999,
		car: 0, // car
		carPosX: 120, // Start X position
		carPosY: 165, // Start Y position
		carRot: 90, // Start rotation point
		lapOkXMax: 130, // limit for the lap to be OK
		lapOkXMin: 120, // limit for the lap to be OK
		lapOkYMax: 195, // limit for the lap to be OK
		lapOkYMin: 120, // limit for the lap to be OK
		musicSrc: document.getElementById('levelThree') // background music source
	}];

	return this;
}