//#region var
var context; 
var shape = new Object(); //shape use to save the pacman's location
var board;
var score;
var pac_color;
var _gameTime;
var interval;
var _timeInterval;
var _upKey;
var _downKey;
var _rightKey;
var _leftKey;
var _selectColor5Points;
var _selctColor15Points;
var _selectColor25Points;
var _ballNum;
var _monstersNum; 
var _numOf5Points;
var _numOf15Points;
var _numOf25Points;
var _firstSettings;
var _ballsArray=[];
var _numOfEaten; 
var _monstersArr=[];
var clock = new Image();
var _life;
var _chery;
var _monsterInterval;
var _cheryInterval;
var _pacmanDirection;
var _sound = document.getElementById("myAudio");
var isPlaySound = false;
var isStopGame;
//#endregion

$(document).ready(function() {
	context = canvas.getContext("2d"); 
	start(gameSettings);
});

function start(gameSettings){	
//initialize settings
_firstSettings = gameSettings;	
_sound.play();
isPlaySound = true;
_sound.volume =0.2;
isStopGame = false;
_upKey = _firstSettings.up;
_downKey = _firstSettings.down;
_rightKey = _firstSettings.right;
_leftKey = _firstSettings.left;
_ballsArray[0] = _firstSettings.Color5Points; 
_ballsArray[1] =_firstSettings.Color15points;
_ballsArray[2] = _firstSettings.Color25points;
_ballNum = _firstSettings.ballNum;
_gameTime = _firstSettings.gameTime ;
_monstersNum = _firstSettings.monstersNum;
_numOf5Points = 0.6 * _ballNum;
_numOf15Points = 0.3 * _ballNum; 
_numOf25Points = 0.1 * _ballNum;
_monstersArr = [{i:1,j:1,pic:"images/pinkMonster.jpg"}, 
				{i:1,j:18,pic:"images/blueMonster.jpg"},
				{i:18,j:1,pic:"images/orangeMonster.jpg"},
		{ i: 18, j: 18, pic: "images/redMonster.jpg" }];
	
	
	
_numOfEaten = 0;
_life =5;
score = 0;
pac_color = "yellow"; 
var food_remain = _ballNum ; 
document.getElementById("lifeId").src = 'images/' + _life.toString() + 'life.jpg';

//init board
board = [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0 ,4, 0, 0, 0, 0, 4],
		[4, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 4],
		[4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4],
		[4, 0, 4, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4],
		[4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4],
		[4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 0, 4, 4, 4, 4],
		[4, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 4],
		[4, 0, 4, 4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 4, 0, 4],
		[4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4],
		[4, 4, 0, 4, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4],
		[4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
];	
	initClock();
	setChery();		

//locate food in the board
while (food_remain > 0) {
	let emptyCell = findRandomEmptyCell(board); 
	while((emptyCell[0]==1 && emptyCell[1]==1) || (emptyCell[0]==1 && emptyCell[1]==18) || (emptyCell[0]==18 && emptyCell[1]==18) || (emptyCell[0]==18 && emptyCell[1]==1)){
			emptyCell = findRandomEmptyCell(board); 
	}
	if(_numOf5Points > 0){
		board[emptyCell[0]][emptyCell[1]] = 5; 
		_numOf5Points--;
	}
	else if(_numOf15Points > 0){
		board[emptyCell[0]][emptyCell[1]] = 15; 
		_numOf15Points--;
	}
	else if(_numOf25Points >0){
		board[emptyCell[0]][emptyCell[1]] = 25; 
		_numOf25Points--;
	}
	food_remain--;
}

//locate pacman in the board
let emptyCell = findRandomEmptyCell(board); 
shape.i = emptyCell[0];
shape.j = emptyCell[1];
board[emptyCell[0]][emptyCell[1]] = 2; //2-pacman

keysDown = {}; // keysDown is a Dictionary contains Keys
addEventListener("keydown",function(e) { // e is the key that pressed   
	keysDown[e.code] = true; 
	},
	false
);
addEventListener(
	"keyup",function(e) {
		keysDown[e.code] = false;
	},
	false
);

interval = setInterval(UpdatePosition, 200); 
_timeInterval = setInterval(updateTime, 800);
_monsterInterval = setInterval(moveMonsters,500);
_cheryInterval = setInterval(randomMoveChery,500);

} //close start()


function setUserSettings(){
	lblPlayerName.value=player;
	lblScore.value = score; 
	lblTime.value = _gameTime; 
	lblUpKey.value = _firstSettings.up;
	lblDownKey.value = _firstSettings.down;
	lblRightKey.value = _firstSettings.right;
	lblLeftKey.value = _firstSettings.left;
	lblMonsters.value = _firstSettings.monstersNum;
	lbl5ballColor.style["background-color"] = _ballsArray[0];
	lbl15ballColor.style["background-color"] = _ballsArray[1];
	lbl25ballColor.style["background-color"] = _ballsArray[2];
	player= document.getElementById("loginUserName").value;
}


function findRandomEmptyCell(board) {
	var i = Math.floor((Math.random() * 19) + 1);
	var j = Math.floor((Math.random() * 19) + 1);
	while (board[i][j] != 0) {
		i = Math.floor((Math.random() * 19) + 1);
		j = Math.floor((Math.random() * 19) + 1);
	}
	return [i, j];
}

window.addEventListener("keydown", function (e) {
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
}, false);


function GetKeyPressed() {
	if (keysDown[_upKey]) { 
		_pacmanDirection = 1; // up
		return 1;
	}
	if (keysDown[_downKey]) {
		_pacmanDirection = 2; //down
		return 2;
	}
	if (keysDown[_leftKey]) {
		_pacmanDirection = 3; //left
		return 3;
	}
	if (keysDown[_rightKey]) {
		_pacmanDirection = 4; //right
		return 4;
	}
}


function updateTime(){
	if(_gameTime == 0){
		if(score < 100){
			gameOver("You are better than "+ score +" points!");
		}
		else{
			gameOver("Winner!!!");
		}
	}
	else{
		if(_gameTime>0)
			_gameTime--;
	}
}

//update pacman position
function UpdatePosition() {
	board[shape.i][shape.j] = 0; // first we remove the pacman (put 0 in the cell)
	var x = GetKeyPressed();
	if (x == 1) { // up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) { 
			shape.j--;
		}
	}
	if (x == 2) { //down
		if (shape.j < 19 && board[shape.i][shape.j + 1] != 4) { 
			shape.j++;
		}
	}
	if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) { 
			shape.i--;
		}
	}
	if (x == 4) { //right
		if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) { //right
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5) { //food
		score+=5;
		_numOfEaten++;
		_ballNum--;
	}

	if (board[shape.i][shape.j] == 15) { //food
		score+=15;
		_numOfEaten++;
		_ballNum--;
	}
	if (board[shape.i][shape.j] == 25) {//food
		score+=25;
		_numOfEaten++;
		_ballNum--;
	}
	 if(board[shape.i][shape.j] == 6){ //clock
		_gameTime += 60;
	}

	board[shape.i][shape.j] = 2;
	if(checkCollision(shape.i,shape.j)==true){
		collision();
	}
	if(shape.i==_chery.i && shape.j==_chery.j){
		cheryCollision();
	}

	if (score >= 20 && _gameTime <= 10) { 
		pac_color = "green";
	}
	if(_ballNum==0){
		gameOver("Game completed");
	}
    else {
	   Draw();
	}
} 

function gameOver(message){
	_sound.pause();
	isPlaySound = false;
	if(!isStopGame){
		alert(message +"\n"+"Your score: " + score);
		clearIntervals();
	}
}

function clearIntervals(){
	window.clearInterval(interval);
	window.clearInterval(_timeInterval); 
	window.clearInterval(_monsterInterval);
	window.clearInterval(_cheryInterval);
	isStopGame = true;
}


function newGame(){
	clearIntervals();
	clearFields();	
	start(_firstSettings);
}


function clearFields(){
	_upKey = undefined;
	_downKey = undefined;
	_rightKey = undefined;
	_leftKey = undefined;
	_selectColor5Points=undefined;
	_selctColor15Points = undefined;
	_selectColor25Points = undefined;
	_ballNum = undefined;
	_monstersNum = undefined;
	_gameTime = undefined;
}


function initClock(){
	var randomCell = findRandomEmptyCell(board);
	board[randomCell[0]][randomCell[1]] = 6; 
	clock.src ="./images/clock1.png";	
}

 function resetPacman(){
	board[shape.i][shape.j] = 0;
	var empty = findRandomEmptyCell(board);
	shape.i= empty[0];
	shape.j = empty[1];
	board[shape.i][shape.j] = 2;
}


function playAudio() {
	$('img.playMusicClass').click(function () {
		_sound.play();
	});
}

function stopAudio() {
	$('img.stopMusicClass').click(function () {
		_sound.pause();
	});
}

//************************************************  Monsters functions  ************************************************** */
function checkCollision(pacX,pacY)
{
	for(var i=0;i<_monstersNum;i++){
			if(_monstersArr[i].i==pacX && _monstersArr[i].j==pacY){
				return true;
			}
	}
	return false;
}

function collision(){
	_life--;
	downScoreByDiffrentMonster();
	document.getElementById("lifeId").src = 'images/' + _life.toString() + 'life.jpg';
	if(_life==0){
		gameOver("Loser!");
	}else{
		resetPacman();
		resetMonsters();
		setChery();
		Draw();
	}
}
//bonus
function downScoreByDiffrentMonster(){
	for(var i=0;i<_monstersNum;i++){
			if(_monstersArr[i].i==shape.i && _monstersArr[i].j==shape.j){
				// score=score-10;
				if(i==0){//pink monster
					score =score- 15;
					break;
				}else if(i==1){//blue monster
					score =score- 10;
					break;
				}else if(i==2){//orange monster
					score =score- 5;
					break;
				}
				else if(i==3){//red monster
					score =score- 20;
					break;
				}
			}		
	}
}

function moveMonsters() {
	var monster;
	for (var k = 0; k < _monstersNum; k++) {
		monster = _monstersArr[k];
		let random = Math.random();
		// random move monster
		if (random <= 0.1){
		let	bestMove = randomMoveMonster(monster);
		console.log(bestMove);
			monster.i = bestMove.i;
			monster.j = bestMove.j;
		}
		// clever move monster
		else {
		 	let bestMove = CleverMoveMonster(monster);
			monster.i = bestMove.i;
			monster.j = bestMove.j;
		}
	}	
}

function randomMoveMonster(monster){
	let randMove;
	let rand = Math.floor(Math.random() * 4) + 1;
	if(rand = 1){ //up
		if (board[monster.i][monster.j-1] != 4){
			return randMove = {i: monster.i, j:monster.j-1};
		}
	}
	else if(rand = 2){ //down
		if((board[monster.i][monster.j+1] != 4)){
			return	randMove = { i: monster.i, j:monster.j+1 };
		}
	}	
	else if(rand =3){ //left
		if (board[monster.i-1][monster.j]!=4){
			return randMove = {i:monster.i-1, j: monster.j};
		}	
	}
	else if(rand =4){//right
		if (board[monster.i+1][monster.j] != 4){ 
			return	randMove = { i: monster.i+1, j:monster.j };
		}
	}
	
}

function CleverMoveMonster(monster){
	let minDis = Number.MAX_SAFE_INTEGER;
	let bestMove;
	let distance;
	// up
	if (board[monster.i][monster.j-1] != 4) {
		distance= Math.abs(monster.i- shape.i) + Math.abs(monster.j-1 - shape.j);
		if(distance < minDis){
			minDis = distance;
			bestMove = { i: monster.i, j:monster.j-1 }
		}
	}
	//down
	if (board[monster.i][monster.j+1] != 4) {
		distance= Math.abs(monster.i- shape.i) + Math.abs(monster.j+1 - shape.j);				
		if(distance < minDis){
			minDis = distance;
			bestMove = { i: monster.i, j:monster.j+1 }
		}
	}
	//left
	if(board[monster.i-1][monster.j]!=4){
		distance= Math.abs(monster.i-1 - shape.i) + Math.abs(monster.j - shape.j);
		if(distance < minDis){
			minDis = distance;
			bestMove = { i: monster.i - 1, j: monster.j }  
		}
	}
	// right
	 if (board[monster.i+1][monster.j] != 4) {
		distance= Math.abs(monster.i+1- shape.i) + Math.abs(monster.j - shape.j);
		if(distance < minDis){
			minDis = distance;
			bestMove = { i: monster.i+1, j:monster.j }
		}
	}
return bestMove;
}

function resetMonsters(){
	_monstersArr=[{i:1,j:1,pic:"images/pinkMonster.jpg"},
				 {i:1,j:18, pic:"images/blueMonster.jpg"},
				 {i:18,j:1,pic:"images/orangeMonster.jpg"},
				 {i:18,j:18,pic: "images/redMonster.jpg"} ];
}
//************************************************************************************************************************** */




//*********************************************  Chery functions  ********************************************************** */
function setChery(){
	if(_monstersNum!=4){
		_chery= { i: 18, j: 18, eaten:false, pic: "./images/chery.jpg" };
	}else{
		emptyCell = findRandomEmptyCell(board); 
		_chery= { i: emptyCell[0], j: emptyCell[1], eaten:false, pic: "./images/chery.jpg" };
	}
}

function cheryCollision(){
	_chery.eaten = true;
	score+=50;
}


function randomMoveChery(){
	let randMove;
	let flag=false;
	while(!flag){
		let rand = Math.random();
		if(rand<=0.25){
		 	if (board[_chery.i][_chery.j-1] != 4){
				  randMove = {i: _chery.i, j:_chery.j-1};
				  flag=true;
				  break; 
				}
		}
		if(rand>0.25 && rand<=0.5){
			if((board[_chery.i][_chery.j+1] != 4)){
				randMove = { i: _chery.i, j:_chery.j+1 };
				flag=true;
				break;
			}
		}
		if(rand>0.5 && rand<=0.75){
			if (board[_chery.i-1][_chery.j]!=4){
				randMove = {i:_chery.i-1, j: _chery.j};
				flag =true;
				 break;
			}	
		}
		else{
			if (board[_chery.i+1][_chery.j] != 4){ 
					randMove = { i: _chery.i+1, j:_chery.j };
					flag=true;
			}
		}
	}
	_chery.i=randMove.i;
	_chery.j=randMove.j;

}
//************************************************************************************************************************** */



//***************************************************  Drawing functions  ************************************************** */
function Draw() {
	canvas.width = canvas.width; //clean board
	setUserSettings();
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;
			//pacman
			 if (board[i][j] == 2) { 		
				 //up		
				 if (_pacmanDirection == 1) {
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; 
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 2.5, 2, 0, 2 * Math.PI); //eye circle
					context.fillStyle = "black"; 
					context.fill();
				}
				//dowm
				else if (_pacmanDirection == 2 ){ 
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; 
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y + 2.5, 2, 0, 2 * Math.PI); //eye circle
					context.fillStyle = "black";
					context.fill();
				}
				//left
				else if (_pacmanDirection == 3) { 
					context.beginPath();
					context.arc(center.x, center.y, 15, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color 
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y - 10, 2, 0, 2 * Math.PI); //eye circle
					context.fillStyle = "black"; //color 
					context.fill();
				}
				//right
				 else if (_pacmanDirection == 4) {
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; 
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 10, 2, 0, 2 * Math.PI); //eye circle
					context.fillStyle = "black"; 
					context.fill();
				}	
				//default
				else {
					context.beginPath();
					context.arc(center.x, center.y, 15, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; 
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 10, 2, 0, 2 * Math.PI); //eye circle
					context.fillStyle = "black"; 
					context.fill();
				}
			
			//food
			} else if (board[i][j] == 5) { 
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); 
				context.fillStyle =_ballsArray[0]; //5 food's color
				context.fill();
			
			}else if(board[i][j] == 15){
				context.beginPath();
				context.arc(center.x, center.y,10, 0, 2 * Math.PI);
				context.fillStyle = _ballsArray[1]; //15 food's color
				context.fill();
			} else if(board[i][j] == 25){
				console.log(_selectColor25Points);
				context.beginPath();
				context.arc(center.x, center.y, 13, 0, 2 * Math.PI); 
				context.fillStyle = _ballsArray[2]; //25 food's color
				context.fill();

			//walls	
			} else if (board[i][j] == 4) { // 4 represents the wall
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 30, 30);
				context.fillStyle ="#ffe4e1"; 
				context.fill();

			}else if(board[i][j] == 6){//clock
				//  clock.src ="./images/clock1.png";
				context.drawImage(clock, center.x - 15, center.y - 15, 30, 30);
			}
		}
	}
	drawMonsters();
	if(_chery.eaten == false){
		drawChery();
	}
}

function drawMonsters(){
	let center = new Object();
	for(let k=0; k< _monstersNum; k++){
		center.x = _monstersArr[k].i * 30 + 15;
		center.y = _monstersArr[k].j * 30 + 15;
		let Img = new Image();
		Img.src =_monstersArr[k].pic;
		context.drawImage(Img, center.x - 15, center.y - 15, 30, 30); //(image, dx, dy, dWidth, dHeight);
	}
 }

 function drawChery(){
	let center = new Object();
	center.x =_chery.i * 30 + 15;
	center.y = _chery.j * 30 + 15;
	let Img = new Image();
	Img.src =_chery.pic;
	context.drawImage(Img, center.x - 15, center.y - 15, 30, 30); //(image, dx, dy, dWidth, dHeight);
}
//
//************************************************************************************************************************** */
