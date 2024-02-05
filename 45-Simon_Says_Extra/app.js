let gameSeq=[];
let userSeq=[];
let level=0;
let heighestLevel=[];
let totalColors=[
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "violet",
    "pink",
    "brown",
    "aquamarine",
    "cadetblue",
    "coral",
    "dodgerblue",
    "cornflowerblue",
    "darkmagenta",
    "crimson",
    "cyan",
    "chocolate",
    "goldenrod"
];
let start=false;
let h2=document.querySelector("h2");

document.addEventListener("keydown",function(){
    if(start==false){
        start=true;
        levelUp();
    }
})


function buttonFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function screenFlash(){
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },250);
}
function levelUp(){
    userSeq=[];
    level++
    h2.innerText=`level ${level}`;
    let randomIndex=Math.floor(Math.random()*18);
    console.log(randomIndex);
    let randomColor=totalColors[randomIndex];
    let randomButton=document.querySelector(`.${randomColor}`);
    console.dir(randomButton);
    let gameColor=randomButton.getAttribute('id')
    gameSeq.push(gameColor);
    console.log("gameSeq:",gameSeq);
    buttonFlash(randomButton);
}

function checkAns(index){
    if(userSeq[index]===gameSeq[index]){
        if(userSeq.length==gameSeq.length){
            heighestLevel.push(level);

            setTimeout(levelUp,1000);
        }
    }
    else{
        screenFlash();
        let highScore=heighestLevel.reduce((max,el)=>{
            if(max<el){
                return el;
            }
            else{
                return max;
            }
        })
        h2.innerHTML=`GameOver<br>Your Score is ${level-1}<br>The Height Score is ${highScore}<br>Press any key to restart again`;

        reset();
    }
}

function btnpress(){
    let btn=this;
    userColor=this.getAttribute('id');
    userSeq.push(userColor);
    console.log("userSeq:",userSeq);
    buttonFlash(btn);
    checkAns(userSeq.length-1);

}
let allBtns=document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    userSeq=[];
    gameSeq=[];
    level=0;
    start=false;
}