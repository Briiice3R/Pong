
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const radiusBall = canvas.width * 0.05;

const widthPaddle = canvas.width/4;
const heightPaddle = 10;
let xPaddle = (canvas.width-widthPaddle)/2;
let yPaddle = (canvas.height - heightPaddle) - 20;


let xBall = canvas.width/2;
let yBall = yPaddle - radiusBall-5;
let ballSpeed = 3;
let raf;

let score = 0;
let interval;
let hasLoose = false;
//window.localStorage.setItem("score", "0");
//let highestScore = document.querySelector(".")

const newGameButton = document.getElementById("newGame");
const leftMobile = document.querySelector(".leftMobile");
const rightMobile = document.querySelector(".rightMobile");

function drawBall(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#EF2B93";
    ctx.beginPath();
    ctx.arc(xBall, yBall, radiusBall, 0, Math.PI*2);
    ctx.fill();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.roundRect(xPaddle, yPaddle, widthPaddle, heightPaddle, 10);
    ctx.fill()
}
let leftPressed = false;
let rightPressed = false;
document.addEventListener("keydown", (e)=>{
    if(e.code == "ArrowLeft") leftPressed = true;
    if(e.code == "ArrowRight") rightPressed = true;
});
document.addEventListener("keyup", (e)=>{
    if(e.code == "ArrowLeft") leftPressed = false;
    if(e.code == "ArrowRight") rightPressed = false;
});
leftMobile.addEventListener("touchstart", (e)=>{
    leftPressed = true;
});
leftMobile.addEventListener("touchend", (e)=>{
    leftPressed = false;
});
rightMobile.addEventListener("touchstart", (e)=>{
    rightPressed = true;
});
rightMobile.addEventListener("touchend", (e)=>{
    rightPressed = false;
});

function radToDeg(rad){
    return rad * 180/Math.PI
}

function angle() {
    let angle;
    do{
        angle = (-3 * Math.PI / 4) + Math.random() * (Math.PI / 2);
    } while(Math.abs(angle + Math.PI/2) <0.2);
    return angle;
}

function ballVectors(){
    let a = angle();
    
    
    const vectorX = Math.cos(a) * ballSpeed;
    const vectorY = Math.sin(a) * ballSpeed;
    console.log(vectorX, vectorY);
    
    
    
    return [vectorX, vectorY];
}

let vectors = ballVectors();
function updateBallMovement(){
    let rightSideBall = xBall+radiusBall;
    let bottomSideBall = yBall+radiusBall;
    if(rightSideBall >=canvas.width  || xBall <= radiusBall){
        vectors[0] = -vectors[0];
        
    }
   
    if(yBall<=radiusBall){
        vectors[1] = -vectors[1];
    }
    
    
    
    if(vectors[1] > 0 && bottomSideBall>=yPaddle){
        if(rightSideBall>=xPaddle && xBall-radiusBall<=xPaddle+widthPaddle){
            vectors[1] = -vectors[1];
            yBall = yPaddle - radiusBall;
        }
        
        
        if(bottomSideBall>=yPaddle+heightPaddle){
            if(bottomSideBall>=canvas.height){
                cancelAnimationFrame(raf)
                clearInterval(interval);
                hasLoose = true;
                
            }
        }
    }
    xBall+=vectors[0];
    
    yBall+=vectors[1];
}

function loose(){
    if(hasLoose){
        ctx.font = "20px sans-serif"
        ctx.textBaseline = 'middle'; 
        ctx.textAlign = 'center';
        ctx.fillText("Vous avez perdu !", canvas.width/2, canvas.height/2);
        ctx.fillText(`Score : ${score}s`, canvas.width/2, canvas.height/2 +25);
    }
}

function updatePaddlePosition(){
    if(leftPressed){
        xPaddle-=ballSpeed;
        if(xPaddle <= 10){
            xPaddle=10;
        }
    }
    if(rightPressed){
        xPaddle+=ballSpeed;
        if(xPaddle >= canvas.width - widthPaddle - 10){
            xPaddle=canvas.width-widthPaddle - 10;
        }
    }
    
}

function updateScore(){
    score++;
}

function resetVariable(){
    xBall = canvas.width/2;
    yBall = yPaddle - radiusBall-5;
    score = 0;
    document.querySelector(".score").textContent = score;
    vectors = ballVectors();
    xPaddle = (canvas.width-widthPaddle)/2;
    yPaddle = (canvas.height - heightPaddle) - 20;    
    cancelAnimationFrame(raf);
    clearInterval(interval);
    hasLoose = false;
    
}

function start(){
    resetVariable();
    loop();
    interval = setInterval(()=>{
        updateScore();
        document.querySelector(".score").textContent = score;
    }, 1000)
    
    
}

newGameButton.addEventListener("click", (e)=>{
    start();
    
});


function loop(){
    raf = requestAnimationFrame(loop);
    drawBall();
    drawPaddle();
    updatePaddlePosition()
    updateBallMovement();
    loose();
}


//movePaddle();
