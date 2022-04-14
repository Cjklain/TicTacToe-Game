const playerFactory = (name, mark) => {
    return{name, mark}
}

const makeBoard = (() => {
    const board = document.querySelector('.board')
    if(board.children.length>1)return

    for(let i=0; i <9; i++){
        const box = document.createElement('div');
        box.classList.add('box')
        box.dataset.number = `${i+1}`
        board.appendChild(box)
    }

    const boxs = document.querySelectorAll('.box')
    return {boxs}

})();


const markMove = (() =>{

    makeBoard.boxs.forEach(box => box.addEventListener('click', function(){
        if(game.checkClass(this))return
        this.classList.add(game.currentActivePlayer.mark);
        game.addToCheck(this) 
        game.checkResult();
        game.changePlayer();

    }))
})();

const game = (() => {
    const player1 = playerFactory('player1', 'cross')
    const player2 = playerFactory('player2', 'circle')

    const dataToCheck = []
    let filtredData = []
    const resultDiv = document.querySelector('.result')
    const classNames = ['cross','circle'];

    let currentActivePlayer = player1

    function changePlayer() {
        if(this.currentActivePlayer === player1){
            return this.currentActivePlayer = player2;
        } else{
            return this.currentActivePlayer = player1
        }
    }

    const checkClass = (div) => {
        const clickOnce = (classNames.some(name => div.classList.contains(name)))
        return clickOnce
    }

    function addToCheck(data) {
        dataToCheck.push(data)
        filtredData = 
        dataToCheck.filter(div=> div.classList.contains(this.currentActivePlayer.mark))
        .map(div=> parseInt(div.dataset.number))
    }

    function checkResult(){
        const winnigCombination = [
            [1, 2, 3],
            [1, 4, 7],
            [3, 6, 9],
            [7, 8, 9],
            [1, 5, 9],
            [3, 5, 7],
            [4, 5, 6],
            [2, 5, 8],
        ]
        const checking = winnigCombination.some(combination=> {
            return combination.every(comb => {
                return filtredData.includes(comb)
            })
        })
        displayEndScreen(checking)
    }

    function displayEndScreen(checked){
        const messageSpan = document.querySelector('.winner');
        if(checked || dataToCheck.length === 9) {
            const playerWhoWon = game.currentActivePlayer.name
            const playerMark = game.currentActivePlayer.mark
            let messageToDisplay = ''
            checked ? messageToDisplay= `winner is ${playerWhoWon} with ${playerMark} mark` : messageToDisplay = 'it is a draw';
            messageSpan.innerText = messageToDisplay
            resultDiv.classList.add('open')
            tryAgain();
        }
    }

    function tryAgain(){
        const resetButton = document.querySelector('.reset')
        const board = document.querySelector('.board')
        resetButton.addEventListener('click', function(){
            resultDiv.classList.remove('open')
            makeBoard.boxs.forEach(box=> {
                return classNames.some(name => box.classList.remove(name))
            });
            dataToCheck.length = 0;
        })
    }
    return {changePlayer,currentActivePlayer,addToCheck, checkResult, checkClass}
})()
