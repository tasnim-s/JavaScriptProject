import BackBoard from "./scripts/backboard";
import Ball from "./scripts/ball";
import "./styles/index.scss";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 800;
const ballHome = [canvas.width/2, canvas.height];
let cursorX;
let cursorY;
let hold = false;
let count = 0;
let shiftSpeed = 5;
let level = 3;
const gravity = 9;

// Mouse events
document.addEventListener("mousemove", mouseHandler, false);
canvas.addEventListener("mousedown", holdHandler, false)
canvas.addEventListener("mouseup", releaseHandler, false)

function holdHandler(e) {
    hold = true;
}

function releaseHandler(e) {
    hold = false;
    count = 0;
}

function mouseHandler(e) {
    cursorX = e.clientX - canvas.offsetLeft;
    cursorY = e.clientY;
}
// Objects
const basketball = new Ball(...ballHome);
const backboard = new BackBoard(canvas.width/2, canvas.height/2)

function animate() {
    if (count === 40) {
        hold = false;
        count = 0;
    } 
    console.log(count);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    backboard.draw(ctx);
    if(backboard.x + backboard.width > canvas.width || backboard.x < 0)  {
        shiftSpeed = -shiftSpeed;
    }
    if(level > 2) backboard.move(ctx, shiftSpeed);
    basketball.draw(ctx);
    if (basketball.y + basketball.diameter < canvas.height) basketball.move(ctx, -gravity);
    
    if (hold) {
        count += 1;
        
        basketball.move(ctx, count);
    }
    // if(cursorX > 0 && cursorX < canvas.width && cursorY > 0 && cursorY < canvas.height) {
        
    //     // basketball.move(cursorX, cursorY, ctx);
    // } else {
    //     basketball.draw(ctx, ballHome);
    // }
    
    requestAnimationFrame(animate);
}

// Below is whats running
animate();