function initTrack(ctx, level){
	ctx.clearRect(0,0,ctx.width, ctx.height);
	window.hit = {};
	window.time = 0;
	var track = new Image(), trackHit = new Image();
	if(level === 1){
		track.src ="img/tracks/track1.png";
		trackHit.src ="img/tracks/track1-hit.png";
		time = 60;
	}
	else if(level === 2){
		track.src ="img/tracks/track2.png";
		trackHit.src ="img/tracks/track2-hit.png";
		time = 120;
	}
	hit = new hitMap(trackHit);
}
function initGameVariables(){
	var garage = new Array(), 
		currTime = new Array(),
		nrOfLaps = 0,
		frontOver = 0,
		rearOver = 0,
		goalOk = 0,
		time = 0,
		started = 0,
		tempCarspeed = 0;
		garage[0] = new Car();
}
function createPlayer(level){
	var player = garage[0];
	if(level === 1){
		player.x = 470,
		player.y = 100,
		player.rotation = 270;
	}
	else if(level === 2){
		player.x = 710,
		player.y = 265,
		player.rotation = 0;
	}
	return player;
}