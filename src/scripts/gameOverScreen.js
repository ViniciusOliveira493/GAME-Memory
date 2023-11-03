// --------------------------------- GAME OVER ----------------------------------------
function gameover(){
    doWhenGameOver();
    state.view.screen.innerHTML = "";
    let gameOverScreen = document.createElement("div");
    gameOverScreen.setAttribute("id","scnGameOver");

    let lblGameOver = document.createElement("h1")
    lblGameOver.setAttribute("id","lblGameOver");
    lblGameOver.innerHTML = "Game Over";
    
    let lblScore = document.createElement("h2")
    lblScore.innerHTML = `Your Score: ${state.value.score}`;

    //-------------------
    let divSendScore = document.createElement("div")
    divSendScore.setAttribute("id","sendScore");

    let txtPlayerName = document.createElement("input")
    txtPlayerName.setAttribute("type","text");
    txtPlayerName.setAttribute("placeholder","Write your Name");
    txtPlayerName.setAttribute("id","txtPlayerName");

    let btnSendScore = document.createElement("button")
    btnSendScore.setAttribute("id","btnSendScore");
    btnSendScore.innerHTML = "Send Score";

    divSendScore.appendChild(txtPlayerName);
    divSendScore.appendChild(btnSendScore);

    //----------------------------

    let divRank = document.createElement("div");
    divRank.setAttribute("id","divRank");
    divRank.innerHTML = "<h2>Rank</h2>"

    let divRankList = document.createElement("div");
    divRankList.setAttribute("id","divRankList");

    let btnReplay = document.createElement("button");
    btnReplay.innerHTML = "Replay"
    btnReplay.setAttribute("id","btnReplay");
    btnReplay.setAttribute("class","btnGameOver");

    let btnGoMenu = document.createElement("button");
    btnGoMenu.innerHTML = "Return to Menu"
    btnGoMenu.setAttribute("id","btnGoMenu");
    btnGoMenu.setAttribute("class","btnGameOver");

    //---
    gameOverScreen.appendChild(lblGameOver);
    gameOverScreen.appendChild(lblScore);
    gameOverScreen.appendChild(divRank);
    gameOverScreen.appendChild(divSendScore);
    gameOverScreen.appendChild(divRankList);    
    gameOverScreen.appendChild(btnReplay);
    gameOverScreen.appendChild(btnGoMenu);

    btnReplay.addEventListener("click",function () {
        state.value.score = 0;
        startGame();
    });

    btnGoMenu.addEventListener("click",function () {
        state.value.score = 0;
        launchMenu();
    });

    state.view.screen.appendChild(gameOverScreen);
}