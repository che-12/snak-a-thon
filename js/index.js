//Game constants and variables
let inpdir = { x: 0, y: 0 };
const foodSound = new Audio('../static/food.mp3');
const gameSound = new Audio('../static/game.mp3');
const gameoverSound = new Audio('../static/gameover.mp3');
const turnSound = new Audio('../static/turn.mp3');
let speed = 6;
let lastPainttime = 0;
let snakearr = [
    {x: 13,y: 15}
]
let foodpos={x:5,y:7};
let score=0;

//Game Functions
function main(ctime) {
    gameSound.play();
    if(gameSound.ended)
    gameSound.play();
    window.requestAnimationFrame(main);
    if ((ctime - lastPainttime) / 1000 < 1 / speed)
        return;
    lastPainttime = ctime;
    gameengine();
}

function gameengine() {
    //Updating the snake array and food
    if(isCollide(snakearr)){
        gameSound.pause();
        gameoverSound.play();
        inpdir={x:0,y:0};
        alert("Game Over! Press any Key to play again");
        // over.style.display='block';
        snakearr= [{x:13,y:15}];
        gameSound.play();
        speed=6;
        score=0;
    }
    //When food is eaten, food is re generated and and score is incremented
    if(snakearr[0].y===foodpos.y && snakearr[0].x===foodpos.x)
    {
        foodSound.play();
        score++;
        if(score%3==0)
        speed++;
        if(score>highscoreval)
        {
            highscoreval=score;
            localStorage.setItem('highscore',highscoreval);
            hiscoreboard.innerHTML=highscoreval;
        }
        // document.getElementsByClassName('points').innerHTML="Score: "+score;
        snakearr.unshift({x: snakearr[0].x + inpdir.x, y: snakearr[0].y + inpdir.y});
        let a=1;
        let b=22;
        foodpos={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }
    
    scoreboard.innerHTML=score;
    //Moving the snake
    for (let i = snakearr.length-2; i >=0; i--) {
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x += inpdir.x;
    snakearr[0].y += inpdir.y;


    //Diplaying snake array and food
    board.innerHTML ='';
    snakearr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0)
        snakeElement.classList.add('head');
        else
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodpos.y;
    foodElement.style.gridColumnStart = foodpos.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

function isCollide(sarr)
{
    for (let i = 1; i < sarr.length; i++) {
        if(sarr[0].x===sarr[i].x && sarr[0].y===sarr[i].y)
        return true;
    }
    if(sarr[0].x < 0 || sarr[0].x>24)
    return true;
    if(sarr[0].y < 0 || sarr[0].y>24)
    return true;
    return false;
}




//main logic starts here
highscore=localStorage.getItem('highscore');
if(highscore==null)
{
    highscoreval=0;
    localStorage.setItem('highscore',highscoreval);
}
else{
    highscoreval=JSON.parse(highscore);
    hiscoreboard.innerHTML=highscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e =>{
    // inpdir={x:0,y:1};
    turnSound.play();
    switch (e.key) {
        case "ArrowUp":
            inpdir.x=0;
            inpdir.y=-1;
            console.log("ArrowUp");
            break;
        case "ArrowLeft":
                inpdir.x=-1;
                inpdir.y=0;
                console.log("ArrowLeft");
            break;
        case "ArrowRight":
            inpdir.x=1;
            inpdir.y=0;
            console.log("ArrowRight");
            break;
        case "ArrowDown":
            inpdir.x=0;
            inpdir.y=1;
            console.log("ArrowDown");
            break;
    
        default:
            break;
    }
});

//Theme Changing functions
function bluesnake()
{
    document.querySelector(':root').style.setProperty('--head-color','rgb(41, 45, 90)');
    document.querySelector(':root').style.setProperty('--snake-color','rgb(83, 89, 150)');
}
function redsnake()
{
    document.querySelector(':root').style.setProperty('--head-color','brown');
    document.querySelector(':root').style.setProperty('--snake-color','rgba(180, 77, 77)');
}
function yellowsnake()
{
    document.querySelector(':root').style.setProperty('--head-color','rgb(65, 50, 10)');
    document.querySelector(':root').style.setProperty('--snake-color','rgb(209, 170, 63)');
}

function bluetheme(){
    document.querySelector(':root').style.setProperty('--back','rgba(108, 115, 196, 0.849)');
}
function redtheme(){
    document.querySelector(':root').style.setProperty('--back','rgba(196, 119, 95, 0.849)');
}
function yellowtheme(){
    document.querySelector(':root').style.setProperty('--back','rgba(235, 204, 121, 0.849)');
}