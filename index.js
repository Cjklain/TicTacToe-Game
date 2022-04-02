const waitForUser = (() => {
    const startButton = document.querySelector('.start')
    startButton.addEventListener('click',makeBoard)
})();

function makeBoard(){
    const board = document.querySelector('.board')

    if(board.children.length>1)return

    for(let i=0; i <9; i++){
        const box = document.createElement('div');
        box.classList.add('box')
        box.dataset.number = `${i+1}`
        board.appendChild(box)
    }
    markMove()
}

function markMove(){
    let whoseTurn = [];
    const dataToCheck = [];
    let classNow = 'circle'

    const boxs = document.querySelectorAll('.box');
    boxs.forEach(box => box.addEventListener('click',(e) => {
        const clickedBox = e.currentTarget;

        if(classNow === 'cross'){
            clickedBox.classList.add('circle')
            classNow = 'circle';
            dataToCheck.push(clickedBox)
        } else {
            clickedBox.classList.add('cross')
            classNow = 'cross'; 
            dataToCheck.push(clickedBox);
        }

        checkResult(dataToCheck, classNow)
    },{once: true}))
}

function checkResult(data, classNow){

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

    console.log(data, classNow);

    const preperToCheck = data.filter(box=> box.classList.contains(classNow))
    .map(x=>parseInt((x.dataset.number))).sort()
    console.log(preperToCheck);

    const checking = winnigCombination.some(combination=>{
    return combination.every(comb => {
        return preperToCheck.includes(comb)
        })
    })
    console.log(checking);
    if(checking){
        console.log('winner');
        displayMessage(classNow)
    } else if (data.length === 9){
        displayMessage('draw')
    }
}

function displayMessage(classNow){
    const ressultDiv = document.querySelector('.result');
    const messageSpan = document.querySelector('.winner');
    const resetButton = document.querySelector('.reset')
    console.log(classNow);
    const playerWhoWon = classNow==='draw' ? "it's a draw" : `winner is player with ${classNow==='cross' ? 'X' : 'Y'}`;
    
    messageSpan.innerText = playerWhoWon;
    ressultDiv.classList.add('open');

    resetButton.addEventListener('click', reset)
}

function reset(){
    const ressultDiv = document.querySelector('.result');
    const boxes = document.querySelectorAll('.box')
    const board = document.querySelector('.board')

    boxes.forEach(box => board.removeChild(box))
    ressultDiv.classList.remove('open')
    makeBoard();


    const box4 = document.querySelector('[data-number="4"]')
    console.log(box4);
}