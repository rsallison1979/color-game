var numSquares = 6;
var colors = generateRandomColors(numSquares);
var pickedColor = pickColor();
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var head = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

reset();

for(var i = 0; i < squares.length; i++){
    // add initial colors to squares
    squares[i].style.backgroundColor = colors[i];
    
    // add click listeners to squares
    squares[i].addEventListener("click", function(){
        // grab color of clicked square
        var clickedColor = (this.style.backgroundColor);
        // compare to color of pickedColor
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct";
            changeColors(clickedColor);    
            play();    
            resetButton.textContent = "Play Again?";
        }    else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}

function changeColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
        head.style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    // make an array
    var arr = [];
    // add num random colors to array
    for (var i = 0; i < num; i++ ){    
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    // pick a red gree and blue value from 0-255
    var r = Math.floor(Math.random() * 256); 
    var g = Math.floor(Math.random() * 256); 
    var b = Math.floor(Math.random() * 256); 
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function play() {
    var audio = document.querySelector("audio");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0;
    }
}

function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        squares[i].style.backgroundColor = colors[i];
        head.style.backgroundColor  = "steelblue";
        messageDisplay.textContent = "";
        resetButton.textContent = "New Colors";
    }
}

resetButton.addEventListener("click", function(){
    reset();
});

for (var x = 0; x < modeButtons.length; x++){
    modeButtons[x].addEventListener("click", function(){
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
        reset();
    });
}
