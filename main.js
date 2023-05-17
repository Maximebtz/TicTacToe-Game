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

inputName1.addEventListener("click", function(){
    inputName1.value = ""})
      
    inputName2.addEventListener("click", function(){
    inputName2.value = ""})



// Symboles des joueurs
const playerOne = 'X';
const playerTwo = 'O';

// Initialisation du joueur en cours
let playerTurn = playerOne;

function setPlayerName() {
    var playerNameDiv = document.getElementById('playerName');
    
    playerNameDiv.innerHTML = document.getElementById('inputPlayerName').value;
    
    document.getElementById('setNames').style.display = 'none';
  }

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

// winningPatterns.style.color = "red";

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
        return endGame();
    } else if (checkDraw()) {
        // Vérification du match nul et fin de partie
        updateGameStatus("draw");
        return endGame();
    }
    
    // Mise à jour du statut du jeu
    updateGameStatus(playerTurn);
    
    // Passage au joueur suivant
    playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
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
            statusText = "Au tour du joueur 2 (O)";
            break;
            case 'O':
                statusText = "Au tour du joueur 1 (X)";
                break;
                case 'winsX':
                    statusText = "Le joueur 1 a gagné";
                    break;
                    case 'winsO':
                        statusText = "Le joueur 2 a gagné";
                        break;
                        case 'draw':
                            statusText = "Egalité ! Personne ne gagne !";
                            break;
                        }
                        
    // Mise à jour de l'affichage du statut du jeu
    gameStatus.innerHTML = statusText;
    endGameStatus.innerHTML = statusText;
}
             

                    
// function setPlayerName() {document.getElementById('setNames').style.display = "none"};
function endGame() {document.getElementById('gameEnd').style.display = "flex"};
function reloadGame() {window.location.reload()};
