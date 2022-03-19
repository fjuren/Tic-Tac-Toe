const gameboard = (() => {
    const playerMoves = () => ['X','O','O','X','X','X','X','X'];
    const boardClick = document.addEventListener('click', (e) => {
        if (e.target.id === "") {
            // do nothing
        } else
        console.log(e.target.id);
    });

    return {playerMoves};
})();

const gameFlow = (() => {

})();

const Players = (name) => {
    const sayName = () => console.log(name);
    return {sayName};
}

const Player_1 = (name, sign) => {
    const {sayName} = Players(name);
    const _sign = sign
    return {sayName};
}

const Player_2 = (name, sign) => {
    const {sayName} = Players(name);
    const _sign = sign
    return {sayName};
}

// const jeff = Player_1('jeff')

const renderMove = (() => {
    gameboard.playerMoves().forEach((move,i,a) => {
        document.getElementById("" + i + "").innerHTML = move;
    });
});
