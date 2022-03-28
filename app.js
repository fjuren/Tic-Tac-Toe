// X and O assigment
const X = "X"
const O = "O"

// const setWinConditions =
//     [
//         [0,1,2],
//         [3,4,5]
//         // (6,7,8),
//         // (0,3,6),
//         // (1,4,7),
//         // (2,5,8),
//         // (0,4,8),
//         // (2,4,6) 
//     ]

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
    // Any 1 of the patters wins the game
    const setWinConditions = () => {
        const conditions = [
            [0,1,2],
            [3,4,5]
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
        gameFlow.playerTurn();
    }); 
    return {setWinConditions}
})();


// Player 1's turn if turnTracker = 0, else player 2's turn
var turnTracker = 0
// gameFLow controls the flow of the game
const gameFlow = (() => {
    const playerTurn = () => {
        if (turnTracker === 0) {
            turnTracker++;
        } else {
            turnTracker--;
        }
    }
    const checkWin = null
    return {playerTurn, checkWin}
})();

// currently doesn't do anything useful
const renderMove = (() => {
    gameboard.playerMoves().forEach((move,i,a) => {
        document.getElementById("" + i + "").innerHTML = move;
    });
});
