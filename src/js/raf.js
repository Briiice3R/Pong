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
const ballSpeed = 2;

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
function radToDeg(rad){
    return rad * 180/Math.PI
}

function ballVector(){
    const angle = (-3*Math.PI/4) * Math.random() + (-Math.PI/4);
    console.log(radToDeg(angle));
    // [0 ; -135[
    const direction = Math.random() < 0.5 ? 1 : -1;
    
    const vectorX = Math.cos(angle) * ballSpeed*direction;
    const vectorY = Math.sin(angle) * ballSpeed;
    return [vectorX, vectorY];
}

let vectors = ballVector();
function updateBallMovement(){
    //console.log(yBall);
    
    console.log(xBall <= radiusBall);
    if(xBall >=canvas.clientWidth - radiusBall || xBall <= radiusBall){
        
        vectors = ballVector()
    }
    if(yBall<=radiusBall){
        vectors = ballVector();
        yBall-=1*vectors[1];
    }
    
    xBall+=vectors[0];
    yBall+=vectors[1];
    
}

function loop(){
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
    
    drawBall();
    drawPaddle();
    updateBallMovement();
    const raf = requestAnimationFrame(loop);
}

loop();
//movePaddle();
