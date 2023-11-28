state.value.audio = null;

const DEFAULT_BG_MUSIC = "seth_makes_sounds__happy-commercial-music.wav";
// ------------------------------------ MENU ------------------------------------------
async function launchMenu(){
    if(state.value.audioOn){
        stopBgMusic();
        playBgMusic();
    }

    await loadData();
    await translate();

    document.title = state.value.gameName;

    document.getElementById("lblTime").innerHTML = state.value.langFile.time+": ";
    document.getElementById("lblScore").innerHTML = state.value.langFile.score+": ";

    await translate();
    updateScore();

    state.view.screen.innerHTML = "";
    
    let divMenu = document.createElement('div');
    divMenu.setAttribute("id","menu");

    let divCharacter = document.createElement('div');
    divCharacter.setAttribute("id","gameCharacter");

    let gameTitle = document.createElement("h1");
    gameTitle.innerHTML = state.value.gameName;

    let btnPlay = document.createElement("button");
    btnPlay.innerHTML = "Play"
    btnPlay.setAttribute("id","btnPlay");
    btnPlay.setAttribute("class","btnMenu");

    let btnSwitchAudio = document.createElement("button");
    btnSwitchAudio.innerHTML = "music_note"
    btnSwitchAudio.setAttribute("id","btnAudio");
    btnSwitchAudio.setAttribute("class","btnAudio material-symbols-outlined");

    btnSwitchAudio.addEventListener("click",function () {
        switchAudio();
    });
    // ----

    btnPlay.addEventListener("click",function () {
        startGame();
    });
    // --

    let gameInstr = document.createElement("p");
    gameInstr.innerHTML = `<h2>${state.value.langFile.menu_inst}</h2>`;

    let inst = document.createElement("p");
    inst.setAttribute("id","instructionList");
    inst.innerHTML = `1 - ${state.value.langFile.menu_inst_1}
                    <br> 2 - ${state.value.langFile.menu_inst_2}`;
    
                          
    gameInstr.appendChild(inst);
    // --
        divMenu.appendChild(btnSwitchAudio);
        divMenu.appendChild(gameTitle);
        divMenu.appendChild(divCharacter);    
        divMenu.appendChild(btnPlay);
        divMenu.appendChild(gameInstr);

    // --
    state.view.screen.appendChild(divMenu);
}

async function translate() {
    const language = window.navigator.language;
    await findLanguageFile(language);
}

async function findLanguageFile(lang) {
    /*
    await 
        fetch("./src/lang/"+lang+".json")
            .then(response => response.json())
            .then(json => {
                state.value.langFile = json;
            })
        .catch(err => {
            fetch("./src/lang/en-US.json")
                .then(response => response.json())
                .then(json => {
                    state.value.langFile = json;     
                });
        }); 
    */
    state.value.langFile = {
        "menu_inst":"Instruções"
        ,"menu_inst_1":"Clique nas cartas para ver o que está atrás"
        ,"menu_inst_2":"Combine os pares"
        ,"score":"Pontos"
        ,"time":"Tempo"
        ,"victory_title":"Vitória"    
        ,"victory_wrong":"Erros"
        ,"nextlevel":"próxima fase"
    }

    
}

async function loadData() {
    let data = await 
        fetch("./src/config/config.json")
            .then((response) => response.json())
            .then((data) => {
                state.value.screenMaxSize = data.screenMaxSize;
                state.value.gameId = data.gameId;
                state.value.gameName = data.gameName;
            });
}

function switchAudio(){
    state.value.audioOn = !state.value.audioOn;
    if(state.value.audioOn){
        playBgMusic();
    }else{
        stopBgMusic();
    }
}

function playBgMusic(music){
    if(state.value.audio != null && state.value.audioOn === false){
        state.value.audio.pause();
        state.value.audio.currentTime = 0;
    }

    if (music === undefined) {
        state.value.audio = new Audio("./src/sounds/"+DEFAULT_BG_MUSIC);
    }else{
        state.value.audio = new Audio("./src/sounds/"+music);
    }
    
    state.value.audio.play();
    state.value.audio.loop = true;
    state.value.audio.volume = 0.2;    
    state.value.audioOn = true;
}

function stopBgMusic() {
    if(state.value.audio != null){
        state.value.audio.pause();
        state.value.audio.currentTime = 0;
        state.value.audioOn = false;
    }
}