const gameboard = (() => {
    const board = () => ['X','O','O','X','X','X','X','X'];
    return {board};
})();

const gameFlow = (() => {

})();

const Players = (name) => {
    const sayName = () => console.log(name);
    return {sayName};
}

const Player_1 = (name) => {
    const {sayName} = Players(name);
    return {sayName};
}

const Player_2 = (name) => {
    const {sayName} = Players(name);
    return {sayName};
}

// const jeff = Player_1('jeff')

const renderMove = (() => {
    gameboard.board().forEach((move,i,a) => {
        document.getElementById("" + i + "").innerHTML = move;
    });
});
