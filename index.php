<?php $title='Projektet'; include('header.php'); ?>
<?php require("audio.php"); ?>
<div id="gameArea">

		<canvas id="canvas" width="800" height="600">
			
		</canvas>
			<div id="info">
				<div id="buttons">
				Unlocked levels: <br />
					<button id="startGame" name="0" value="1">START</button>
					<button id="lvlone" name="1" value="1">Level 1</button>
					<button id="lvltwo" name="2" value="2">Level 2</button>
					<button id="lvlthree" name="3" value="3">Level 3</button>
				</div>
				<div id="timeDiv">
				Time to beat: <span id="timeToBeat"></span> <br />
				Time: <span id="minutes" >00</span>:<span id="secs" >00</span>:<span id="digits">00</span> <br />
				</div>
				<div id='lap'> 
				Lap 1: <span id="lap1" >---</span><br />
				Lap 2: <span id="lap2" >---</span><br />
				Lap 3: <span id="lap3" >---</span><br />
				</div>
				<div id="resultDiv">
				Best Lap: <span id="bestLap">---</span><br />
				Final time: <span id="finalResult">---</span> <br />
				</div>
				<div id="maininfo">
				(S) = Start engine <br />
				(H) = Sound horn <br />
				(B) = Toggle background music <br />
				(M) = Toggle general sounds <br />
				(ARROWS) = Drive car
				<div id="soundInfo">
				Background music is: <span id="backgroundMusic" ></span><br />
				Car Sound is: <span id="generalSound" ></span>
				</div>
				</div>
			</div>
</div>
<script src="js/jquery.js"></script>
<script src="js/helpers.js"></script>
<script src="js/collision.js"></script>
<script src="js/car.js"></script>
<script src="js/racer.js"></script>
<script src="js/stopwatch.js"></script>
<script src="js/levels.js"></script>

<?php include('footer.php'); ?>