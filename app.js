// X and O assigment
const X = "X"
const O = "O"

// Players added once entered by users
playerAssignments = []

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

// Factory function
const Players = (name) => {
    const sayName = () => name;
    return {sayName};
}

// inherits from Players
const Player_1 = (name, sign) => {
    const {sayName} = Players(name);
    const _sign = sign;
    const symbol = () => _sign;
    return {sayName, symbol};
}

// inherits from Players
const Player_2 = (name, sign) => {
    const {sayName} = Players(name);
    const _sign = sign;
    const symbol = () => _sign;
    return {sayName, symbol};
}

const gameboard = (() => {
    // const playerMoves = () => ['X','O','O','X','X','X','X','X'];
    const playerMoves = () => [];
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
        e.target.innerHTML = "" + playerAssignments[0].symbol() + "";
        // console.log(playerAssignments[1].symbol())
    }); 
    return {playerMoves};  
})();

const gameFlow = (() => {

    // const player2Move
})();

const renderMove = (() => {
    gameboard.playerMoves().forEach((move,i,a) => {
        document.getElementById("" + i + "").innerHTML = move;
    });
});
