const boxes=document.querySelectorAll(".box");
const gameStatus=document.querySelector("#game-status");

const buttons=document.querySelectorAll(".reset-buttons button");
const restart=buttons[0];
const resetscores=buttons[1];

const overlay=document.querySelectorAll('.overlay');
const resetOverlay=overlay[0];
const resetScoreOverlay=overlay[1];

const cancle=document.querySelectorAll('.cancle');
const resetCancle=cancle[0];
const resetScoreCancle=cancle[1];

const confirm=document.querySelectorAll('.confirmbtn');
const resetConfirm=confirm[0];
const resetScoreConfirm=confirm[1];

const popupBox = document.querySelectorAll('.resetBtn-container');
const resetpopup=popupBox[0];
const resetScorepopup=popupBox[1];

let countx=localStorage.getItem("playerXCount")||0;//it will set initial value to 0 if it get null from local strage
let counto=localStorage.getItem("playerOCount")||0;
const solutionSet=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let filled=["","","","","","","","",""];//will store with which player filled the box
let currentPlayer='X';
let running=false;
initalizeGame();

function initalizeGame(){
    boxes.forEach(box=>{
        box.addEventListener('click',putXorO);
    });
    restart.addEventListener('click', () =>{
        // resetGame();//called in popup
        resetOverlay.classList.add('show');
    });
    resetscores.addEventListener('click',() =>{
        // resetAll();//called in popup
        resetScoreOverlay.classList.add('show');
    });
    running=true;
    gameStatus.textContent=` Its ${currentPlayer}'s turn !!`;

    document.getElementById("o-wins").textContent=counto;//update in html
    document.getElementById("x-wins").textContent=countx;//update in html

    colorLeader();
}
resetConfirm.addEventListener("click",() =>{
    restartGame();
    resetOverlay.classList.remove('show');
});
resetCancle.addEventListener( 'click', () =>{
    resetOverlay.classList.remove('show');
});

resetScoreConfirm.addEventListener('click', ()=>{
    resetAll();
    resetScoreOverlay.classList.remove('show');
});
resetScoreCancle.addEventListener('click', ()=>{
    resetScoreOverlay.classList.remove('show');
});

function putXorO(){//this function is invoked when box clicked
    // let index=this.querySelector('#id'); this is not working
    let index=this.getAttribute('box-index');
    if(running==false||filled[index] != ""){
        return;
    }
    if(currentPlayer=='X'){
        filled[index]='X';
        this.textContent='X';
        this.classList.add('x-class');
    }
    else{
        filled[index]='O';
        this.textContent='O';
        this.classList.add('o-class');
    }
    checkWinner();
    if(running){
        changePlayer();
        gameStatus.textContent=` Its ${currentPlayer}'s turn !!`;
    }
}
function changePlayer(){
    if(currentPlayer=='X'){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
}
function restartGame(){
    filled=["","","","","","","","",""];
    running=true;
    boxes.forEach(box => {
        box.setAttribute('class','box');
        box.textContent='';
    });
    // currentPlayer='X';//modify this to who wins their turn,removing this line it will make it  automaticlly because when someone win we dont call change player function() any more so 
    gameStatus.textContent=`Its ${currentPlayer}'s turn !!`;
}
function resetAll(){
    restartGame();
    countx=0;
    localStorage.setItem("playerXCount", 0);
    document.getElementById("x-wins").textContent=0;
    counto=0;
    localStorage.setItem("playerOCount", 0);
    document.getElementById("o-wins").textContent=counto;//update in html
    colorLeader(); 
}
function checkWinner(){
    let won=false;
    for(let i=0;i<solutionSet.length;i++){
        const temp=solutionSet[i];
        const box1=filled[temp[0]];
        const box2=filled[temp[1]];
        const box3=filled[temp[2]];

        if(box1==''||box2==''||box3==''){
            continue;
        }
        if(box1==box2 && box2==box3){
            won=true;
            break;
        }
    }
    if(won){
        gameStatus.textContent=`${currentPlayer} Won the match!!`;
        updateLeader();
        running=false;
        //again initilize afer 5sec. and display time
        // setTimeout(restartGame,5000);//or u can give like below
        setTimeout(() => {
            // gameStatus.textContent.add('next game starts in 5sec..');//dont work, also add this statment after settimeout
            restartGame();
        },5000);
        gameStatus.textContent+=' Next game starts in 5sec..';
        
    }
    else if(filled.includes("")==false){
        gameStatus.textContent=`It's TIE!!`;
        running=false;
        //again initilize afer 5sec. and display time
        setTimeout(restartGame,5000);
        gameStatus.textContent+=' Next game starts in 5sec..';
    }
}
function updateLeader(){
    if(currentPlayer=='X'){
        countx++;
        localStorage.setItem("playerXCount", countx);//save it to local storage 
        document.getElementById("x-wins").textContent=countx;//update in html 
    }
    else{
        counto++;
        localStorage.setItem("playerOCount", counto);//save it to local storage 
        document.getElementById("o-wins").textContent=counto;//update in html 
    }
    colorLeader();
}
function colorLeader(){
    const players=document.querySelectorAll('.scores div');
    const playerX=players[0];
    const playerO=players[1];
    if(countx>counto){
        playerX.setAttribute('class','green');
        playerO.removeAttribute('class');
    }
    else if(counto>countx){
        playerO.setAttribute('class','green');
        playerX.removeAttribute('class');
    }
    else{
        playerO.removeAttribute('class');
        playerX.removeAttribute('class');
    }
}