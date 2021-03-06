// X and O assigment
const X = "X"
const O = "O"

// Players names & sign are added once names are entered by users
playerAssignments = []

// form that assigns player inputted names to X & O signs
const form = document.getElementById("playerNames")
// retrieve submitted names entered by users
form.addEventListener("submit",  (e) => {
    e.preventDefault();

    const player1Name = Player_1(document.getElementById("player1").value, X);
    const player2Name = Player_2(document.getElementById('player2').value, O);
    playerAssignments.push(player1Name,player2Name)
    form.reset();
});

// Player Factory function
const Players = (name) => {
    const setName = () => name;
    return {setName};
}

// inherits from Players factory function
const Player_1 = (name, sign) => {
    const {setName} = Players(name);
    const _sign = sign;
    const setSign = () => _sign;
    return {setName, setSign};
}

// inherits from Players factory function
const Player_2 = (name, sign) => {
    const {setName} = Players(name);
    const _sign = sign;
    const setSign = () => _sign;
    return {setName, setSign};
}

// Prevents duplicate moves. Nothing happens if a position has already been moved. Used in gameboard -> boardClick & gameFlow -> removeButton
const preventDuplicateMoves = []

// tracks the player moves on the tic tac toe board
const gameboard = (() => {
    // Any 1 of the 7 patters wins the game
    const setWinConditions = () => {
        // 7 win conditions
        const conditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6] 
        ]
        return {conditions}
    }

    const boardID = document.querySelector(".grid-container");
    // move validations
    const boardClick = boardID.addEventListener('click', (e) => {        
        if (preventDuplicateMoves.includes("" + e.target.id + "") == true) {
        // do nothing
        } 
        // add move to board
        if (e.target.id != "" && (preventDuplicateMoves.includes("" + e.target.id + "") == false)){
            preventDuplicateMoves.push(""+ e.target.id + "");
            e.target.innerHTML = "" + playerAssignments[turnTracker].setSign() + "";
            // run gameFLow after each player move
            gameFlow.playerTurn();
            gameFlow.checkWin();
        } 
        else {
            // do nothing
        }
    }); 
    return {setWinConditions}
})();

// Player 1's turn if turnTracker = 0, else player 2's turn
var turnTracker = 0
var totalTurns = 0
// gameFLow controls the flow of the game
const gameFlow = (() => {
    // Track which player move last and tells the user who's turn it is
    const playerTurn = () => {
        if (turnTracker === 0) {
            // Tell player 1 it's their turn
            document.getElementById("playerMoveReadout").innerHTML = `${playerAssignments[1].setName()}'s turn`
            turnTracker++;
            gameFlow.checkTieGame();
        } else {
            // Tell player 2 it's their turn
            document.getElementById("playerMoveReadout").innerHTML = `${playerAssignments[0].setName()}'s turn`
            turnTracker--;
            gameFlow.checkTieGame();
        }
        totalTurns++;
    }
    // Checks whether the game tied
    const checkTieGame = () => {
        if ((totalTurns === 8) && ((document.getElementById("playerMoveReadout").innerHTML != `${playerAssignments[0].setName()}'s turn`) || (document.getElementById("playerMoveReadout").innerHTML != `${playerAssignments[1].setName()}'s turn`))) {
            document.getElementById("playerMoveReadout").innerHTML = "Tie Game. Restart to play again!"
            gameFlow.addButtons().restartButton();
            gameFlow.removeButtons();
        }
    }
    // creates restart and play again buttons
    const addButtons = () => {
        const restartButton = () => {
            const addDiv = document.createElement("div");
            const button = document.createElement("button");
            button.setAttribute("type", "submit");
            button.setAttribute("id", "endOfGameButton");
            button.textContent = "Restart Game";
            
            document.getElementById("playerMoveReadout").insertAdjacentElement("afterend", addDiv)
            addDiv.appendChild(button);
        }
        return {restartButton}
    }
    const removeButtons = () => {
        document.getElementById("endOfGameButton").onclick = (e) => {
            // remove button on click
            e.target.parentNode.removeChild(e.target);
            totalTurns = 0;
            // Clear board
            for (let id = 0; id < 9; id++) {
                document.getElementById(`${id}`).innerHTML = ""
            }
            gameFlow.playerTurnOnRestart();
            preventDuplicateMoves.length = 0;
        }
    }
    // Tells user who's turn it is when/if the game restarts
    const playerTurnOnRestart = () => {
        if (turnTracker === 0) {
            document.getElementById("playerMoveReadout").innerHTML = `${playerAssignments[0].setName()}'s turn`
            
        } else {
            document.getElementById("playerMoveReadout").innerHTML = `${playerAssignments[1].setName()}'s turn`
            
        }
    }
    // checks win conditions and whether there's a match. If yes, the player wins. Otherwise continue the game
    const checkWin = () => {
        const checkWinConditions = gameboard.setWinConditions().conditions
        // loops through each win condition
        for (let o = 0; o < checkWinConditions.length; o++) {
            // checks player 1 moves against win conditions
            if (document.getElementById("" + checkWinConditions[o][0] + "").innerHTML === X && 
                document.getElementById("" + checkWinConditions[o][1] + "").innerHTML === X &&
                document.getElementById("" + checkWinConditions[o][2] + "").innerHTML === X) {
                document.getElementById("playerMoveReadout").innerHTML = `${playerAssignments[0].setName()} wins!!`
                totalTurns = 0;
                // Check if restart button is already present before adding it
                if (document.getElementById("endOfGameButton") === null) {
                    // Add restart button when game is done
                    gameFlow.addButtons().restartButton();
                }
                gameFlow.removeButtons()
                }
            // checks player 2 moves against win conditions
            if (document.getElementById("" + checkWinConditions[o][0] + "").innerHTML === O && 
                document.getElementById("" + checkWinConditions[o][1] + "").innerHTML === O &&
                document.getElementById("" + checkWinConditions[o][2] + "").innerHTML === O) {
                document.getElementById("playerMoveReadout").innerHTML = `${playerAssignments[1].setName()} wins!!`
                totalTurns = 0;
                // Check if restart button is already present before adding it
                if (document.getElementById("endOfGameButton") === null) {
                    // Add restart button when game is done
                    gameFlow.addButtons().restartButton();
                }
                gameFlow.removeButtons()
                }
            }
        }
        return {playerTurn, addButtons, checkWin, removeButtons, checkTieGame, playerTurnOnRestart}
    })();