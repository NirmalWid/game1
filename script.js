var boy = document.getElementById("boy");

idleImgNo = 1;
idleStart = 0;

function idleAnim(){

    idleImgNo = idleImgNo + 1;

    if(idleImgNo == 17){
        idleImgNo = 1;
    }

    boy.src = "resources/idle ("+ idleImgNo +").png";
}

function idleAnimStart(){

    idleStart = setInterval(idleAnim,80);

}

runImgNo = 1;
runStart = 0;

function runAnime(){

    runImgNo = runImgNo + 1;

    if(runImgNo == 21){
        runImgNo = 1;
    }

    document.getElementById("bg1").play();
    document.getElementById("bg2").play();
    boy.src = "resources/run ("+ runImgNo +").png";
}

function runAnimStart(){

    runStart = setInterval(runAnime,80);
    clearInterval(idleStart);

}


jmpImgNo = 1;
jmpStart = 0;
boyMarginTop = 600;

function jmpAnime(){

    jmpImgNo = jmpImgNo + 1;

    if(jmpImgNo <= 16){
        boyMarginTop = boyMarginTop - 10;
        boy.style.marginTop = boyMarginTop + "px";
        document.getElementById("jumpSound").play();
    }

    if(jmpImgNo >= 17){
        boyMarginTop = boyMarginTop + 10;
        boy.style.marginTop = boyMarginTop + "px";
    }

    if(jmpImgNo == 31){
        jmpImgNo = 1;
        clearInterval(jmpStart);
        jmpStart = 0;
        runImgNo = 0;
        runAnimStart();
    }

    boy.src = "resources/jump ("+ jmpImgNo +").png";
}

function jmpAnimStart(){
    clearInterval(idleStart);
    runImgNo = 0;
    clearInterval(runStart);
    jmpStart = setInterval(jmpAnime,50);

}

function keyCheck(event){
    //alert(event.which);
    // D=100
    //space=32

    var keyCode = event.which;
    
    if(keyCode == 32){
        if(jmpStart == 0){
            jmpAnimStart();
        }
        if(moveBGId == 0){
        moveBGId = setInterval(moveBG,110);
        }
        if(boxAnimId == 0){
            boxAnimId = setInterval(boxAnim,110);
        }
    }
    
}

var backgroundPositionX = 0;
var moveBGId = 0;

var score = 0;

function moveBG(){

    backgroundPositionX = backgroundPositionX - 20;

    document.getElementById("bg").style.backgroundPositionX = backgroundPositionX + "px";

    score = score + 1;

    document.getElementById("score").innerHTML = score;

}

boxMarginLeft = 2000;

function createBoxes(){

    for(var i = 0; i < 15; i++){

    var box = document.createElement("div");
    box.className = "box";
    document.getElementById("bg").appendChild(box);
    box.id = "box" + i;

    box.style.marginLeft = boxMarginLeft + "px";
    
        if(i<5){
            boxMarginLeft = boxMarginLeft + 750;
        }

        if(i>=5 && i<10){
            boxMarginLeft = boxMarginLeft + 550;
        }

        if(i>=10 && i<=15){
            boxMarginLeft = boxMarginLeft + 450;
        }

    }

}

var boxAnimId = 0;
function boxAnim() {
    for (var i = 0; i < 15; i++) {
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 25;
        box.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft >= -110 && newMarginLeft <= 100 ) {
            if (boyMarginTop >= 600) {
                clearInterval(boxAnimId);

                clearInterval(runStart);
                runStart = -1;

                clearInterval(jmpStart);
                jmpStart = -1;

                clearInterval(moveBGId);
                moveBGId = -1;


                document.getElementById("dead2").play();
                document.getElementById("dead1").play();

                deadStart = setInterval(deadAnim,100);
            }
        }

        if(score == 380){
            clearInterval(boxAnimId);

                clearInterval(runStart);
                runStart = -1;

                clearInterval(jmpStart);
                jmpStart = -1;

                clearInterval(moveBGId);
                moveBGId = -1;                

                win();
                
        }


    }
}

deadImgNo = 1;
deadStart = 0;

function deadAnim(){

    deadImgNo = deadImgNo + 1;

    if(deadImgNo == 31){
        deadImgNo = 15;

        document.getElementById("end").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
        document.getElementById("gameOver1").play();
        document.getElementById("gameOver2").play();
    }

    boy.src = "resources/Dead ("+ deadImgNo +").png";
}

function reLoad(){
    location.reload();
}

function win(){
    document.getElementById("win").style.visibility = "visible";
    document.getElementById("winScore").innerHTML = score;
    document.getElementById("winM").play();
    document.getElementById("gameOver2").play();
}

function redirectOnSpace(event) {
    if (event.keyCode === 32) {
        window.location.href = "game.html";
    }
}
