/*const canvas = document.getElementById("demo");
const ctx = canvas.getContext("2d");

let x = 20;                      // position de la balle (axe des abscisses X)
const y = canvas.height / 2;     // centrage vertical dans le canvas
const speed = 2;                 // vitesse de la balle
let rafId;                       // identifiant de la boucle d'animation

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface l'écran
    ctx.fillStyle = "orange";
    //dessin de la balle
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    x += speed;
    if (x > canvas.width - 15) x = -15; // reset quand la balle sort du cadre du canvas
}

function loop() {
    update();
    drawBall();
    rafId = requestAnimationFrame(loop); // planifie la prochaine frame
}

// démarrer l'animation
loop();

// possibilité d'arrêter l'animation avec le bouton 'stop'
let stopAnimation = document.getElementById('stop');
stopAnimation.addEventListener('click', () => {
    cancelAnimationFrame(rafId)
})
*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const radiusBall = 30;

const widthPaddle = 180;
const heightPaddle = 25;
let xPaddle = (canvas.clientWidth-widthPaddle)/2;
let yPaddle = (canvas.clientHeight - heightPaddle) - 20;


let xBall = canvas.clientWidth/2;
let yBall = yPaddle - radiusBall-5;
let ballSpeed = 4;
let raf;

let score = 0;
let interval;

const newGameButton = document.getElementById("newGame");
const leftMobile = document.querySelector(".leftMobile");
const rightMobile = document.querySelector(".rightMobile");

function drawBall(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = "black";
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
    return Math.random() * (-Math.PI / 2) + (-Math.PI / 4);
}

function ballVectors(){
    
    const vectorX = Math.cos(angle()) * ballSpeed;
    const vectorY = Math.sin(angle()) * ballSpeed;
    console.log(vectorX, vectorY);
    
    return [vectorX, vectorY];
}

let vectors = ballVectors();
function updateBallMovement(){
    let rightSideBall = xBall+radiusBall;
    let bottomSideBall = yBall+radiusBall;
    if(rightSideBall >=canvas.clientWidth  || xBall <= radiusBall){
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
            if(bottomSideBall>=canvas.clientHeight){
                cancelAnimationFrame(raf)
                clearInterval(interval);
                
            }
        }
    }
    xBall+=vectors[0];
    
    yBall+=vectors[1];
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
        if(xPaddle >= canvas.clientWidth - widthPaddle - 10){
            xPaddle=canvas.clientWidth-widthPaddle - 10;
        }
    }
    
}

function updateScore(){
    score++;
}

function resetVariable(){
    xBall = canvas.clientWidth/2;
    yBall = yPaddle - radiusBall-5;
    score = 0;
    vectors = ballVectors();
    xPaddle = (canvas.clientWidth-widthPaddle)/2;
    yPaddle = (canvas.clientHeight - heightPaddle) - 20;    
    cancelAnimationFrame(raf);
    clearInterval(interval);
    document.querySelector(".score").textContent = 0;
}

function start(){
    resetVariable();
    loop();
    interval = setInterval(()=>{
        updateScore();
        document.querySelector(".score").textContent = score;
        console.log(score);
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
}


//movePaddle();
