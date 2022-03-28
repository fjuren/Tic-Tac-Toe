// X and O assigment
const X = "X"
const O = "O"

// Players names & symbols are added once names are entered by users
playerAssignments = []

// form that assigns player inputted names to X & O symbols
const form = document.getElementById("playerNames")
// retrieve submitted names entered by users
form.addEventListener("submit",  (e) => {
    e.preventDefault();

    const player1Name = Player_1(document.getElementById("player1").value, X);
    const player2Name = Player_2(document.getElementById('player2').value, O);
    // player1Name.sayName();
    // player1Name.symbol();
    // player2Name.sayName();
    // player2Name.symbol();

    playerAssignments.push(player1Name,player2Name)
    form.reset();
});

// Player Factory function
const Players = (name) => {
    const sayName = () => name;
    return {sayName};
}

// inherits from Players factory function
const Player_1 = (name, sign) => {
    const {sayName} = Players(name);
    const _sign = sign;
    const symbol = () => _sign;
    return {sayName, symbol};
}

// inherits from Players factory function
const Player_2 = (name, sign) => {
    const {sayName} = Players(name);
    const _sign = sign;
    const symbol = () => _sign;
    return {sayName, symbol};
}

// tracks the player moves on the tic tac toe board
const gameboard = (() => {
    // const playerMoves = () => ['X','O','O','X','X','X','X','X'];
    const playerMoves = () => [];
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
        e.target.innerHTML = "" + playerAssignments[turnTracker].symbol() + "";
        gameFlow.move();
    }); 
    return {playerMoves};  
})();


// Player 1's turn if turnTracker = 0, else player 2's turn
var turnTracker = 0
// gameFLow controls the flow of the game
const gameFlow = (() => {
    const move = () => {
        if (turnTracker === 0) {
            turnTracker++;
        } else {
            turnTracker--;
        }
    }
})();

const renderMove = (() => {
    gameboard.playerMoves().forEach((move,i,a) => {
        document.getElementById("" + i + "").innerHTML = move;
    });
});
