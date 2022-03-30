const startButton = document.querySelector('.start')
startButton.addEventListener('click',makeBoard)
const board = document.querySelector('.board')
makeBoard();

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
    const boxs = document.querySelectorAll('.box');
    boxs.forEach(box => box.addEventListener('click',(e) => {
        const clickedBox = e.currentTarget;
        if(whoseTurn[whoseTurn.length-1] === 0){
            clickedBox.classList.add('circle')
            whoseTurn.push(1)
            checkResult(clickedBox)
        } else {
            clickedBox.classList.add('cross') 
            whoseTurn.push(0)
            checkResult(clickedBox)
        }
        // check if win
        console.log('clicked');
    },{once: true}))
}

const dataToCheck = [];

function checkResult(e){
    let position = e.dataset.number; 
    let currentClass = e.classList.contains('cross');
    let singleBox = [position,currentClass]
    dataToCheck.push(singleBox);
}

