state.view.spentTime = document.querySelector('#time');

state.value.langFile = 0
state.value.screenMaxSize = 0
state.value.animals = ["🦓","🐯","🐻","🐶","🐹","🐱","🐭","🐷","🐮","🐴","🐰","🦊","🐺","🦝","🐵","🐨","🦒","🦁","🐗","🐼"];
state.value.level = 1; 
state.value.maxLevel = 5; 
state.value.spentTime = 0;
state.value.wrongCombinations = 0;
state.value.openCards = [];
state.value.gameScreen = 0;

state.actions.increaseTime = 0;

init();

async function init(){      
    await resizeScreen();
    setTimeout(launchMenu,1000);
}

async function resizeScreen() {
    await loadData();    
    state.view.screen.setAttribute("style",`width:${state.value.screenMaxSize}px;height:${state.value.screenMaxSize}px`)
}

// ------------------------------------ GAME ------------------------------------------
async function startGame(){  
    await loadData();
    state.value.level = 1
    drawScreen();
}

function drawScreen() {
    state.value.spentTime = 0;  
    state.actions.increaseTime = setInterval(countTime,1000);

    state.view.screen.innerHTML = "";

    let game = document.createElement("div");
    game.setAttribute("id","game");

    // TODO
    game.setAttribute("style",`width:${state.value.screenMaxSize-20}px;height:${state.value.screenMaxSize-20}px`);

    let level = state.value.level*2;

    let cardSize = ((state.value.screenMaxSize) / level);
    if(level < 4){
        cardSize -= (cardSize / level)/3;
    }else if(level < 6){
        cardSize -= (cardSize / level)/2;
    }else if(level < 9){
        cardSize -= (cardSize / level)/1;
    }else if(level < 11){
        cardSize -= (cardSize / level)/0.5;
    }
    
    let gameScreen = document.createElement("div");
    gameScreen.setAttribute("id","gameScn");

    game.appendChild(gameScreen);
    state.value.gameScreen = gameScreen;

    let pairs = makePairs();
    drawCards(gameScreen,Math.floor(cardSize),pairs);

    game.addEventListener("click", function (e) {
        if((state.value.openCards.length < 2) && (Number.isInteger(parseInt(e.target.id)))){
            e.target.classList.add("cardOpen");
            state.value.openCards.push(e.target);
            playSound("waveplaysfx__perc-short-clicksnap-perc_CC0.wav");
        }

        if(state.value.openCards.length === 2){
            setTimeout(compareItens,400);
        }
    });
    // ---
    state.view.screen.appendChild(game);
}

function compareItens(){
    if((state.value.openCards[0].innerHTML === state.value.openCards[1].innerHTML) && 
        (state.value.openCards[0].id !== state.value.openCards[1].id)){
        state.value.openCards[0].classList.add("pairFound");
        state.value.openCards[1].classList.add("pairFound");
        playSound("unadamlar__correct-choice.wav");
    }else{
        state.value.openCards[0].classList.remove("cardOpen");
        state.value.openCards[1].classList.remove("cardOpen");

        state.value.wrongCombinations++;
        playSound("raclure__wrong_CC0.mp3");
    }

    state.value.openCards = [];
    // -- vitoria
    if(document.querySelectorAll(".pairFound").length === ((state.value.level*2)*(state.value.level*2))){
        setTimeout(telaVitoria,300);
    }
}

function telaVitoria() {
    playSound("licorne_en_fer__victory-bells-chords-success-sound-effect_CC0.wav");
    clearInterval(state.actions.increaseTime);
    let pontosNaFase = calcularPontuacao();    
    
    let divVitoria = document.createElement("div");
    divVitoria.setAttribute("id","divAlertVitoria");
    
    let h1Vitoria = document.createElement("h1");
    h1Vitoria.innerHTML = state.value.langFile.victory_title;

    let dados = document.createElement("p");
    dados.innerHTML = `${state.value.langFile.score}: ${pontosNaFase}
                <br>${state.value.langFile.time}: ${state.value.spentTime}
                <br>${state.value.langFile.victory_wrong}: ${state.value.wrongCombinations}`;


    let btnNextLevel = document.createElement("button");
    btnNextLevel.setAttribute("id","btnNextLevel");
    btnNextLevel.innerHTML = state.value.langFile.nextlevel;

    divVitoria.appendChild(h1Vitoria);
    divVitoria.appendChild(dados);
    divVitoria.appendChild(btnNextLevel);

    btnNextLevel.addEventListener("click",function () {
        proximaFase();    
    });

    divVitoria.addEventListener("mouseover",function () {
        divVitoria.setAttribute("class","op1");
    })

    state.value.gameScreen.appendChild(divVitoria);
    
}

function calcularPontuacao(){
    let penalidade = state.value.wrongCombinations*0.5;
    let pontos = state.value.spentTime + penalidade;
    state.value.score += pontos;

    updateScore();
    return pontos;
}

function proximaFase() {
    state.value.wrongCombinations = 0;
    state.value.spentTime = 0;
    state.value.openCards = [];

    state.value.level++;
    if(state.value.level < (state.value.maxLevel+1)){
        drawScreen();
    }else{
        gameover();
    }
}

function makePairs(){
    let pairs = [];
    for(let i = 0, k = 0; i < ((state.value.level*2)*(state.value.level*2))/2; i++){

        if(k >= state.value.animals.length){
            k = 0;
        }      

        for(let j = 0; j<2;j++){
            pairs.push(state.value.animals[k]);
        }
        k++;
    }

    return randomize(pairs);
}

function randomize(pairs) {
    return (pairs.sort(() => (Math.random()-0.5 ) ))
}

function  drawCards(game,size,pairs) {
    for(let i = 0; i < pairs.length; i++){
        
        let divCard = document.createElement("div");
        divCard.className = "card";    
        divCard.setAttribute("id",i);
        let span = document.createElement("span");
        
        span.innerHTML = pairs[i];
        divCard.appendChild(span);

        let font = 12 - state.value.level*2;
        divCard.setAttribute("style",`width:${size}px;height:${size}px;font-size:${font}em;`);
        game.appendChild(divCard);
    }
}


function countTime() {
    state.value.spentTime++;
    updateTime();
}

function updateTime() {
    state.view.spentTime.innerHTML = state.value.spentTime;
}

function updateScore(){
    state.view.score.innerHTML = state.value.score;
}

function doWhenGameOver(){
    if(state.actions.increaseTime !== 0){
        clearInterval(state.actions.increaseTime);
    }
    state.value.gameoverLevel = state.value.level;
}

function playSound(soundName){
    let audio = new Audio("./src/sounds/"+soundName);
    audio.play();
    audio.volume = 0.5;    
}