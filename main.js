// Sélection des cellules du jeu
const cells = document.querySelectorAll('[data-cell]');

// Sélection des éléments d'affichage du statut du jeu et de la fin de partie
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');

// Création d'un input dans le HTML avec createElement pour choisir le nom des joueurs
const setNames1 = document.querySelector("#setName1");
const setNames2 = document.querySelector("#setName2");

const inputName1 = document.createElement("input");
const inputName2 = document.createElement("input");

inputName1.value = "Joueur 1";
inputName2.value = "Joueur 2";

inputName1.classList.add("setPlayerName");
inputName2.classList.add("setPlayerName");

setNames1.appendChild(inputName1);
setNames2.appendChild(inputName2);

inputName1.addEventListener("click", function () {
    inputName1.value = "";
});

inputName2.addEventListener("click", function () {
    inputName2.value = "";
});

// Scores des joueurs
let scorePlayerOne = 0;
let scorePlayerTwo = 0;

// Symboles des joueurs
const playerOne = 'X';
const playerTwo = 'O';

// Noms des joueurs
let namePlayer1 = "";
let namePlayer2 = "";

// Joueur en cours
let playerTurn = playerOne;

// Fonction pour définir les noms des joueurs
function setPlayerName() {
    namePlayer1 = inputName1.value;
    namePlayer2 = inputName2.value;

    updateGameStatus("init");

    let x = document.getElementById("setNames");
    if (x.style.display == "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }

    updateScoreDisplay();
}

// Écouteur pour définir les noms des joueurs
document.getElementById("inputPlayerName").addEventListener("click", function () {
    setPlayerName();
});

// Combinaisons gagnantes possibles
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Ajout d'un écouteur de clic à chaque cellule
cells.forEach(cell => {
    cell.addEventListener('click', playGame, { once: true });
});

// Fonction appelée lorsqu'une cellule est cliquée
function playGame(e) {
    // Mise à jour du contenu de la cellule avec le symbole du joueur en cours
    e.target.innerHTML = playerTurn;

    // Vérification de la victoire du joueur en cours
    if (checkWin(playerTurn)) {
        // Mise à jour du statut du jeu et fin de partie
        updateGameStatus("wins" + playerTurn);
        endGame();
        return;
    } else if (checkDraw()) {
        // Vérification du match nul et fin de partie
        updateGameStatus("draw");
        endGame();
        return;
    }

    // Mise à jour du statut du jeu
    updateGameStatus(playerTurn);

    // Passage au joueur suivant
    playerTurn = (playerTurn === playerOne) ? playerTwo : playerOne;
}

// Vérification de la victoire d'un joueur
function checkWin(playerTurn) {
    return winningPatterns.some(combinaison => {
        return combinaison.every(index => {
            return cells[index].innerHTML == playerTurn;
        });
    });
}

// Vérification du match nul
function checkDraw() {
    return [...cells].every(cell => {
        return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
    });
}

// Mise à jour du statut du jeu
function updateGameStatus(status) {
    let statusText;

    switch (status) {
        case 'X':
            statusText = `Au tour de ${namePlayer2} (O)`;
            break;
        case 'O':
            statusText = `Au tour de ${namePlayer1} (X)`;
            break;
        case 'winsX':
            statusText = `${namePlayer1} a gagné`;
            scorePlayerOne++;
            break;
        case 'winsO':
            statusText = `${namePlayer2} a gagné`;
            scorePlayerTwo++;
            break;
        case 'draw':
            statusText = "Egalité ! Personne ne gagne !";
            break;
        case 'init':
            statusText = `${namePlayer1} commence !`;
            break;
    }

    // Mise à jour de l'affichage du statut du jeu
    gameStatus.innerHTML = statusText;
    endGameStatus.innerHTML = statusText;
}

// Mise à jour de l'affichage des scores
function updateScoreDisplay() {
    const scorePlayerOneElement = document.getElementById("nb-point-player-one");
    const scorePlayerTwoElement = document.getElementById("nb-point-player-two");

    scorePlayerOneElement.textContent = scorePlayerOne;
    scorePlayerTwoElement.textContent = scorePlayerTwo;
}

// Fonction de fin de partie
function endGame() {
    let gameEndElement = document.getElementById('gameEnd');
    gameEndElement.classList.add('smooth-appear');
    gameEndElement.style.display = 'flex';

    updateScoreDisplay();
}

// Fonction pour démarrer une nouvelle partie
function newGame() {
    updateGameStatus("init");

    let y = document.getElementById("gameEnd");
    if (y.style.display == "none") {
        y.style.display = "flex";
    } else {
        y.style.display = "none";
    }

    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.addEventListener('click', playGame, { once: true });
    });
}

// Écouteur pour démarrer une nouvelle partie
document.getElementById("newGame").addEventListener("click", function () {
    newGame();
});

// Fonction pour recharger la page
function reloadGame() {
    window.location.reload();
}

// Écouteur pour recharger la page
document.getElementById("reloadGame").addEventListener("click", function () {
    reloadGame();
});
