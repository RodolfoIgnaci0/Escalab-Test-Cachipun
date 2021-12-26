'use strict'
// login    
    const userParams = document.getElementById('user');
    const passParams = document.getElementById('pass');
    const errorParams = document.getElementById('error-message');
    const btnLogin = document.getElementById('btn-login');
    const loginMode = document.getElementById('login');
    const gameMode = document.getElementById('game');

    function loginValidation(uParam, pParam){
        const user = 'usuario';
        const pass = 'abc123';

        try {
            // valida si tiene parametros campo usuario y contraseña
            if (!uParam || !pParam) {
                const error = 'Debe ingresar usuario y contraseña'
                throw new Error(error);
            }
            // valida si parametros son los correctos
            if (uParam !== user || pParam !== pass) {
                throw new Error('Usuario o contraseña incorrecta');
            }
            displayGame();
        } catch (error) {
            errorParams.innerText = error;
        } finally{
            cleanLogin();
        }
    }

    function displayGame(){
        loginMode.classList.add('hide');
        gameMode.classList.remove('hide');
    }

    function cleanLogin(){
        userParams.value = '';
        passParams.value = '';
        userParams.focus();
        setTimeout( () => errorParams.innerText = '' , 2000)

    }

    btnLogin.addEventListener( 'click', () => {
        loginValidation(userParams.value, passParams.value);
    });
// fin login
// kachipun
    const winnerCall = document.getElementById('winner-call');
    const aiShow = document.getElementById('ai-option');
    const playerShow = document.getElementById('player-option');
    const btnRock = document.getElementById('btn-rock');
    const btnPaper = document.getElementById('btn-paper');
    const btnScisor = document.getElementById('btn-scisor');
    const scorePanel = document.getElementById('final-score');
    let winner, recentGames, finalScore;
    let points = [];
  
    // cargo resultado juegos anteriores del localstorage / asigno resultados anteriores a variable de scorefinal
    window.addEventListener("DOMContentLoaded", function () {
        recentGames = localStorage.getItem("kachipun-historial");
        //scorePanel.innerHTML = recentGames;
        
        // recepcion de localstorage como string EJ: "80,60,80,10"
        recentGames ? finalScore = recentGames.split(',') : finalScore = []; 
        // seteo componentes del array a int
        finalScore = finalScore.map(function(game){
            return parseInt(game);
        });
        // despliega score final en formato lista
        setFormatScore(finalScore);
        return finalScore
    });

    function aiSelection(){
        const options = ['piedra','papel','tijera'];
        // numero random del 0 - 3
        const aiSelected = Math.floor(Math.random() * 3 );
        aiShow.innerHTML = ` <img src="./img/${options[aiSelected]}.png" alt="${options[aiSelected]}">`;
        return options[aiSelected];
    }

    function winnerValidation(playerOption, aiOption){
        if (playerOption === 'piedra' && aiOption === 'tijera')  { return "Jugador Gana" } 
        else if (playerOption === 'piedra' && aiOption === 'papel') { return "Jugador Pierde" } 
        else if (playerOption === 'papel' && aiOption === 'tijera')  { return "Jugador Pierde" } 
        else if (playerOption === 'papel' && aiOption === 'piedra') { return "Jugador Gana" } 
        else if (playerOption === 'tijera' && aiOption === 'piedra')  { return "Jugador Pierde" } 
        else if (playerOption === 'tijera' && aiOption === 'papel') { return "Jugador Gana" } 
        else { return "Empate"}
    }

    function score(winner){
        switch (winner) {
            case 'Jugador Gana':
                points.push(100);
                break;
            case 'Jugador Pierde':
                points.push(-30);
                break;
            default:
                points.push(0);
                break;
        }
        return points
    }

    // setea el formato de visualización en lista de la puntuacion final
    function setFormatScore(finalScore){
        // limpio para evitar duplicidad al mostrar resultados
        scorePanel.innerText = "";
        finalScore.forEach(el => {
            let li= document.createElement("li");
            let content = document.createTextNode(el);
            scorePanel.appendChild(li);
            li.appendChild(content);
        });
    }

    function showFinalScore(){
        // genera puntuacion de final de juego
        if (points.length >= 10 ){
            finalScore.push(points.reduce((acc, curr) => {return acc + curr }, 0));
            points = [];
            setFormatScore(finalScore);
            localStorage.setItem("kachipun-historial", finalScore);
        }
        // elimino el primer registro del array si es mayor a 5
        if (finalScore.length >= 5) {
            finalScore.shift();            
        }
    }

    // DRY de los addEventListener
    function toDoList(option){
        playerShow.innerHTML = ` <img src="./img/${option}.png" alt="${option}">`;
        aiSelection();
        winner = winnerValidation(option, aiSelection());
        winnerCall.innerText = winner;
        score(winner);
        showFinalScore();
    }
    
    btnRock.addEventListener( 'click', () => {
        toDoList('piedra');
    });

    btnPaper.addEventListener( 'click', () => {
        toDoList('papel');
    });

    btnScisor.addEventListener( 'click', () => {
        toDoList('tijera');
    });
// fin kachipun