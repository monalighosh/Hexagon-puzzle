///////////////////////////////////////////////////////////////////
// Variables

var start = document.getElementById("start");
start.addEventListener("click", startEasy);

var difficult = document.getElementById("difficult");
difficult.addEventListener("click", startDifficult);

var hint = document.getElementById("hint");
hint.addEventListener("mousedown", showImg);
hint.addEventListener("mouseup", hideImg);
hint.addEventListener("click", countClicks);

var reset = document.getElementById("reset");
reset.addEventListener("click", resetPuzzle);

var solved = document.getElementById("solved");
var dropContainer = document.getElementById("dropzones");
var imgContainer = document.getElementById("imgContainer");
var timerDiv = document.getElementById("timer");
var counter;
var timer;

///////////////////////////////////////////////////////////////////
// Hint button functionality

function showImg(e){
	solved.style.opacity = "1";
}

function hideImg(e){
	solved.style.opacity = "0";
}

var clickCounter = 0;
function countClicks(e){
	clickCounter++;
	if(clickCounter >= 4){
		hint.style.display = "none";
		hint.removeEventListener("click", countClicks);
		hint.removeEventListener("mousedown", showImg);
		hint.removeEventListener("mouseup", hideImg);
	}
}

///////////////////////////////////////////////////////////////////
// Puzzle modes button functionality

function startEasy(){
	start.style.display = "none";
	difficult.style.display = "none";
	hint.style.display = "block";
	startPuzzle();
	counter = 300;
	setTimeout(countDownTimer, 100);
}

function startDifficult(){
	start.style.display = "none";
	difficult.style.display = "none";
	hint.style.display = "none";
	startPuzzle();
	counter = 5;
	setTimeout(countDownTimer, 100);
}

function startPuzzle(){
	reset.style.display = "block";
	solved.style.opacity = "0";
	dropContainer.style.display = "block";
	imgContainer.style.opacity = "1";
}

///////////////////////////////////////////////////////////////////
// Reset button functionality

function resetPuzzle(){
	window.location.reload();
}

///////////////////////////////////////////////////////////////////
// Timer functionality

function countDownTimer(){
	timerDiv.style.display = "block";

	var buzzer = new Audio();
	buzzer.src = "sound/buzzer.mp3";

	var minutes = parseInt( counter / 60 ) % 60;
	var seconds = counter % 60;
	timer = setTimeout(function(){ countDownTimer() }, 1000);
	counter--;
	if(counter < 0 ){
		clearTimeout(timer);
		buzzer.play();
		document.getElementById("lost").style.visibility = "visible";
		document.getElementById("lost").style.opacity = "1";
		imgContainer.style.opacity = "0";
	}

	timerDiv.innerHTML = "Time left " + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
}

///////////////////////////////////////////////////////////////////
// Drag and Drop Functionality

// Adding drag event listeners to the thumbnails
var imgs = document.getElementById("imgContainer").children;
for(var i = 0; i < imgs.length; i++){
	imgs[i].addEventListener("dragstart", dragStart, false);
	imgs[i].addEventListener("dragend", dragEnd, false);
}

// Adding drag event listeners to the dropzones
var imgDropZones = document.getElementById("dropzones").children;
for(var j = 0; j < imgDropZones.length; j++){
	imgDropZones[j].addEventListener("dragenter", dragEnter, false);
	imgDropZones[j].addEventListener("dragleave", dragLeave, false);
	imgDropZones[j].addEventListener("dragover", dragOver, false);
	imgDropZones[j].addEventListener("drop", dropped, false);
}

// Function to define actions to start dragging
function dragStart(e){
	e.dataTransfer.setData('text', e.target.id);
	console.log("dragged id:" + e.target.id);
}

// Function to define actions when draggable item is dropped into drop zone
function dragEnd(e){
	draggedImg = e.target;
}

// Function to define actions when draggable item enters drop zone
function dragEnter(e){
	e.preventDefault();
}

// Function to define actions if user leaves the drop zone
function dragLeave(e){
	e.preventDefault();
}

// Function to define actions when draggable item is over the drop zone
function dragOver(e){
	e.preventDefault();
}

// Function to define actions when draggable item is dropped into the drop zone
var dropCounter = [];
var buzzerWin = new Audio();
buzzerWin.src = "sound/winning.mp3";

function dropped(e){
	e.preventDefault();
	var eleId = e.dataTransfer.getData('text');
	var ele = document.getElementById(eleId);
	var dropzoneId = e.target.id.split("-")[1];

	if(dropzoneId === eleId) {
		e.target.appendChild(ele);
		ele.style.animation = "imgAnimation 0.7s linear 1";
		ele.style.webkitAnimation = "imgAnimation 0.7s linear 1"
		dropCounter.push(ele);
	}

	if(dropCounter.length === 41){
		for(var k = 0; k < dropCounter.length; k++){
			buzzerWin.play();
			dropCounter[k].style.animation = "success 2s 3s linear 2";
			dropCounter[k].style.webkitAnimation = "success 2s 3s linear 1";
			clearTimeout(timer);
			document.getElementById("won").style.visibility = "visible";
			document.getElementById("won").style.opacity = "1";
		}
	}
}

