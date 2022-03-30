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
        // Prevents duplicate moves. Nothing happens if a position has already been moved.
        // Otherwise plays the players move
    const preventDuplicateMoves = []
    const boardID = document.querySelector(".grid-container");
    const boardClick = boardID.addEventListener('click', (e) => {        
        if (preventDuplicateMoves.includes("" + e.target.id + "") == true) {
            // do nothing
        } if (e.target.id === "") {
            // do nothing
        } if (e.target.id === "" || preventDuplicateMoves.includes("" + e.target.id + "") == true) {
            // do nothing
        } if (e.target.id != "" && (preventDuplicateMoves.includes("" + e.target.id + "") == false)){
            preventDuplicateMoves.push(""+ e.target.id + "");
        };
        // next step is to push the "X" to player moves, after checking whether the position was moved already
        e.target.innerHTML = "" + playerAssignments[turnTracker].setSign() + "";
        // run gameFLow after each player move
        gameFlow.playerTurn();
        gameFlow.checkWin();
    }); 
    return {setWinConditions}
})();

// Player 1's turn if turnTracker = 0, else player 2's turn
var turnTracker = 0
// gameFLow controls the flow of the game
const gameFlow = (() => {
    const playerTurn = () => {
        if (turnTracker === 0) {
            // Tell player 1 it's their turn
            document.getElementById("playerMoveReadout").innerHTML = `${playerAssignments[1].setName()}'s turn`
            turnTracker++;
        } else {
            // Tell player 2 it's their turn
            document.getElementById("playerMoveReadout").innerHTML = `${playerAssignments[0].setName()}'s turn`
            turnTracker--;
        }
    }
    // creates restart and play again buttons
    const addButtons =() => {
        const restartButton = () => {
            const addDiv = document.createElement("div");
            const button = document.createElement("button");
            button.setAttribute("type", "submit");
            button.classList.add("endOfGameButtons");
            button.textContent = "Restart Game";
            
            document.getElementById("playerMoveReadout").insertAdjacentElement("afterend", addDiv)
            addDiv.appendChild(button);
        }
        return {restartButton}
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
                // Add restart button when game is done
                gameFlow.addButtons().restartButton();
            }
            // checks player 2 moves against win conditions
            if (document.getElementById("" + checkWinConditions[o][0] + "").innerHTML === O && 
            document.getElementById("" + checkWinConditions[o][1] + "").innerHTML === O &&
                document.getElementById("" + checkWinConditions[o][2] + "").innerHTML === O) {
                    document.getElementById("playerMoveReadout").innerHTML = `${playerAssignments[1].setName()} wins!!`
                } 
            }
        }
        return {playerTurn, addButtons, checkWin}
    })();
    
    // currently doesn't do anything useful
    const renderMove = (() => {
        gameboard.playerMoves().forEach((move,i,a) => {
            document.getElementById("" + i + "").innerHTML = move;
        });
    });
    