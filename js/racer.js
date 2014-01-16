$(document).ready(function () {
    'use strict';

	var hit = {},
	started = 0,
	currLevel = 0,
	nrOfLaps = 0,
	time = [0, 0, 0],
	backMusic = true,
	goalOk = 0,
	bestFullLap = [0, 0, 0],
	soundOn = true,
	timeToInt = 999999,
	goalToInt = 999999,
	garage = [0, 0],
	levelPack = new levelData(),
	currTime = [0, 0, 0],
	currentPos = [0, 0, 0],
	sounds = [0],
	thisLap = [0, 0, 0],
	oldLaps = [0, 0, 0],
	track    = new Image(),
	trackHit = new Image(),
	canvas   = document.getElementById('canvas'),
	context  = canvas.getContext('2d'),
	ctxW     = canvas.width,
	ctxH     = canvas.height;
	garage[0] = new Car();
	var player = garage[0];
	player.x = 83;
	player.y = 46;
	track.src = levelPack.levels[currLevel].track,
	trackHit.src = levelPack.levels[currLevel].trackHit;
	hit = new HitMap(trackHit);
	initSounds(sounds);
	$('#lvlone').hide();
	$('#lvltwo').hide();
	$('#lvlthree').hide();

$('button').on('click', function(){
	var temp = 0;
	started = 0,
	player.speed = 0;
	temp = parseInt($(this).val());
	console.log('button value: ' + temp);
	changeLevel(temp);
});
function changeLevel(temp){
	currLevel = levelPack.levels[temp].level;
	nrOfLaps = 0;
	$('#startGame').hide();
	bestFullLap = levelPack.levels[temp].bestLapTime;
	time = levelPack.levels[temp].goalTime,
	disableAndReset(); 
	player.x = levelPack.levels[temp].carPosX,
	player.y = levelPack.levels[temp].carPosY,
	player.rotation = levelPack.levels[temp].carRot,
	correctMusic(temp);
	track.src = levelPack.levels[currLevel].track,
	trackHit.src = levelPack.levels[currLevel].trackHit;
	hit = new HitMap(trackHit);
}
// Keyboard Variables
var key = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	START: 83
};

var keys = {
	38: false,
	40: false,
	37: false,
	39: false,
	83: false
};
function correctMusic(){
	levelPack.levels.forEach(function(entry) {
    	entry.musicSrc.pause();
    	entry.musicSrc.currentTime = 0;
	});
}
function initSounds(sounds){
	sounds[0] = document.getElementById('engineStart');
	sounds[1] = document.getElementById('engineGas');
	sounds[2] = document.getElementById('engineStop');
	sounds[3] = document.getElementById('beep');
	sounds[4] = document.getElementById('wallHit');

	return sounds;
}
function step (car) {
	// keys movements
	if (keys[key.UP] && started === 2) {car.accelerate(); started = 1; activate(); }
	if (keys[key.UP] && started === 1) {car.accelerate();}
	if (keys[key.DOWN] && started === 1){ car.decelerate(); }
	if (keys[key.LEFT] && started === 1){ car.steerLeft(); }
	if (keys[key.RIGHT] && started === 1){car.steerRight(); }
	if(currLevel !== 0){
		if (keys[key.START]){sounds[0].play(); started = 2;}
	}
	// SOUNDS
	if(backMusic){ 
		levelPack.levels[currLevel].musicSrc.play(); 
		document.getElementById("backgroundMusic").innerHTML='ON';
		$("#backgroundMusic").css('color', 'green');
	}	
	else{ 
		levelPack.levels[currLevel].musicSrc.pause();
		document.getElementById("backgroundMusic").innerHTML='OFF';
		$("#backgroundMusic").css('color', 'red'); 
	}
	if(!soundOn){
		sounds.forEach(function(entry){
			entry.muted = true;
		})
		document.getElementById("generalSound").innerHTML='OFF';
		$("#generalSound").css('color', 'red');
	}
	else{
		sounds.forEach(function(entry){
			entry.muted = false;
		})
		document.getElementById("generalSound").innerHTML='ON';
		$("#generalSound").css('color', 'green');
	}
	// KEY DOWN
	document.onkeydown = function(event){
	event.preventDefault();
	var key;
	key = event.key || event.which;
	if(started === 0){
		switch(key){
			case 66: // B (Background music)
			if(backMusic){ backMusic = false } else { backMusic = true; }
			break;

			case 77: // M (General sounds)
			toggleSound();
			break;

			case 88: // X (Get all levels)
			$('#lvlone').show();
			$('#lvltwo').show();
			$('#lvlthree').show();
			break;
		}	console.log(key);
	}
	else if(started === 1){
		switch(key)
		{
			case 38: // UP arrow
			sounds[0].pause(); 
			sounds[0].currentTime = 0;
			sounds[1].play();
			break;

			case 40: // DOWN arrow
			sounds[1].pause();
			sounds[1].currentTime = 0;
			sounds[2].play();
			break;

			case 72: // H (Car horn)
			sounds[3].play();
			break;

			case 77: // M (General sounds)
			toggleSound();
			break;

			case 66: // B (Background music)
			if(backMusic){ backMusic = false}else{ backMusic = true;}
			break;

			case 88: // X (Get all levels)
			$('#lvlone').show();
			$('#lvltwo').show();
			$('#lvlthree').show();
			break;
		}
	};}
	// KEY UP
	document.onkeyup = function(eventUp){
	eventUp.preventDefault();
	var key;
	key = eventUp.key || eventUp.which;
	if(started === 1){
		switch(key)
		{	
			case 38: // UP
			sounds[1].pause();
			sounds[1].currentTime = 0;
			break;

			case 40: // DOWN
			sounds[2].pause();
			sounds[2].currentTime = 0;
			break;
		}
	};}
	
	// constantly decrease speed
	if (!car.isMoving()){
	car.speed = 0;
	} else {
	car.speed *= car.speedDecay;
	}

	var speedAxis = speedXY(car.rotation, car.speed);
	car.x += speedAxis.x;
	car.y += speedAxis.y;
	
	getCurrentPos(currentPos);
	//document.getElementById('xandy').innerHTML = 'X = ' + currentPos[0];
	//document.getElementById('xandy').innerHTML += '\nY = ' + currentPos[1];
	
	// 1 = lap (white)
	// 2 = wall (black)
	// 3 = red (marker)
	var topTemp = car.collisions.top.isHit(hit);
	var bottomTemp = car.collisions.bottom.isHit(hit);

	// TOP CRASH
	if(topTemp === 2){
		car.speed = -2;
		sounds[4].play();
		console.log('Front crash');
	}

	
	if(started === 1 && lapOk(currLevel)){
		
		nrOfLaps++;
			
			if(nrOfLaps < 4){
			goalOk = 0;
			lapTime(currTime);
			bestFullLap = bestLapTimes(currTime);
			$('#lap'+nrOfLaps.toString()).html(thisLap[0] + ':' + thisLap[1] + ':' + thisLap[2]);
			console.log('lapTime: ' + thisLap[0] + ':' + thisLap[1] + ':' + thisLap[2]);
		}
		if(nrOfLaps === 3){
			deactivate(currTime);
			for(var i = 0; i < currTime.length; i++){
				if(currTime[i] < 10){
					currTime[i] = '0' + currTime[i];		
				}
			};
			$('#finalResult').html(currTime[0] + ':' + currTime[1] + ':' + currTime[2]);
			nrOfLaps = 0;
			levelPack.levels[currLevel].bestLapTime = bestFullLap;
			setTimeout(function(){
				changeLevel(timeOk(currTime, time, currLevel))
			}, 5000);
			trackHit.src ="";
			track.src="img/tracks/default.png";
		}	
	}
	if(currLevel !== 0){ $('#bestLap').html(bestFullLap[0] + ':' + bestFullLap[1] + ':' + bestFullLap[2]); }
	
	// MARKER HIT
	if(topTemp === 3 && bottomTemp === 1){
		goalOk = 1;
		console.log('Marker hit');
	}
	
	// BOTTOM CRASH
	if(bottomTemp === 2){
		car.speed = 2;
		sounds[4].play();
		console.log('Rear crash!');
	}
	

}

function bestLapTimes(currTime){
	var temp = '', currTimeToInt = 0,currBestLap=0, currBestLapTemp='';
		
		currBestLapTemp = levelPack.levels[currLevel].bestLapTime.toString(),
		currBestLap = parseInt(currBestLapTemp.replace(/,/g, ''));
		
		for(var i = 0; i < currTime.length; i++){
			thisLap[i] = (parseInt(currTime[i]) - oldLaps[i]);
			if(thisLap[i] < 0){
				thisLap[i-1] -= 1;
				thisLap[i] += 60;	
			}
		}		


		for(var i = 0; i < currTime.length; i++){
			oldLaps[i] += thisLap[i];
			if(oldLaps[i] > 59){
				oldLaps[i-1] += 1;
				oldLaps[i] -= 60; 
			}
		}
		
		

		for(var i = 0; i < thisLap.length; i++){
			if(thisLap[i] < 10){
					thisLap[i] = '0' + thisLap[i];		
			}
		};
		
		temp = thisLap.toString(),
		currTimeToInt = parseInt(temp.replace(/,/g, ''));

		if(currTimeToInt < timeToInt){
			levelPack.levels[currLevel].lvlTimeToInt = currTimeToInt;
			timeToInt = currTimeToInt;
			bestFullLap[0] = parseInt(thisLap[0]);
			bestFullLap[1] = parseInt(thisLap[1]);
			bestFullLap[2] = parseInt(thisLap[2]);		
			for(var i = 0; i < bestFullLap.length; i++){
				if(bestFullLap[i] < 10){
						bestFullLap[i] = '0' + bestFullLap[i];		
				}
			};	
		}
		return bestFullLap;
}
function toggleSound(){
	if(soundOn){ soundOn = false; }
		else{ soundOn = true; }
	console.log('sound = ' + soundOn);
}
function timeOk(totalTime, goalTime, currLvl){
    var nextLevel, btn, btnToChange, tempGoal = '', tempTime = '', goalToInt = 0, totalToInt = 0;
    tempTime = totalTime.toString();
	totalToInt = parseInt(tempTime.replace(/,/g, ''));
	tempGoal = goalTime.toString();
	goalToInt = parseInt(tempGoal.replace(/,/g, ''));


    if(totalToInt <= goalToInt){
    	if(currLvl === 1){ btnToChange = "lvlone"; }
    	if(currLvl === 2){ btnToChange = "lvltwo"; }
    	if(currLvl === 3){ btnToChange = "lvlthree"; }	

    	$('#'+btnToChange).show();
    	
        nextLevel = currLvl+1;
    }
    else{
        nextLevel = currLvl;
    }
    return nextLevel;
}
function lapOk(thisLevel){
	var ok = false;
	if(goalOk === 1 && currentPos[0] <= levelPack.levels[thisLevel].lapOkXMax && currentPos[0] >= levelPack.levels[thisLevel].lapOkXMin && currentPos[1] <= levelPack.levels[thisLevel].lapOkYMax && currentPos[1] >= levelPack.levels[thisLevel].lapOkYMin){
		ok = true;
	}
	return ok;
}
function getCurrentPos(currentPos){
	currentPos[0] = Math.floor(player.x);
	currentPos[1] = Math.floor(player.y);
	return currentPos;
}
function disableAndReset(){
	hit = {};
	nrOfLaps = 0;
	timeToInt = levelPack.levels[currLevel].lvlTimeToInt,
	goalToInt = 999999,
	goalOk = 0,
	started = 0;
	player.speed = 0;
	deactivate(currTime);
	currTime.forEach(function(entry){ entry = 0; }),
	thisLap.forEach(function(entry){ entry = 0;	})
	oldLaps = [0,0,0];
	$('#finalResult').html('---');
	$("#lap1").html('---');
	$("#lap2").html('---');
	$("#lap3").html('---');
	$("#bestLap").html('---');
	for(var i = 0; i < time.length; i++){
		if(time[i] === 0){
			time[i] = '00';
		}
	}
	$('#timeToBeat').html(time[0] + ':' + time[1] + ':' + time[2]);
	thisLap = [0,0,0];
}

function draw (car) {
	context.clearRect(0,0,ctxW,ctxH);
	context.drawImage(track, 0, 0);
	drawRotatedImage(context, player.img, player.x, player.y, player.rotation);
}

// Keyboard event listeners
$(window).keydown(function(e){
	if (keys[e.keyCode] !== 'undefined'){
		keys[e.keyCode] = true;
		e.preventDefault();
	}
});
$(window).keyup(function(e){
	if (keys[e.keyCode] !== 'undefined'){
		keys[e.keyCode] = false;
		e.preventDefault();
	}
});

function frame () {
	step(player);
	draw(player);
	window.requestAnimationFrame(frame);
}
frame();
console.log('Game ready!');
});