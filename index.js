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
    const dataToCheck = [];
    // let oToCheck = [];
    // let xToCheck = []

    const boxs = document.querySelectorAll('.box');
    boxs.forEach(box => box.addEventListener('click',(e) => {
        const clickedBox = e.currentTarget;
        let position = parseInt(clickedBox.dataset.number); 
        // let currentClass = false

        if(whoseTurn[whoseTurn.length-1] === 0){
            clickedBox.classList.add('circle')
            whoseTurn.push(1)
            // dataToCheck.push([position,currentClass]);
            // oToCheck.push(position)
            // checkResult(dataToCheck)
            // checkResult(xToCheck=null,oToCheck)
            dataToCheck.push(clickedBox)
        } else {
            clickedBox.classList.add('cross') 
            whoseTurn.push(0)
            // currentClass = true
            // dataToCheck.push([position,currentClass]);
            // xToCheck.push(position)
            // checkResult(xToCheck, oToCheck=null)
            // checkResult(dataToCheck)
            dataToCheck.push(clickedBox);
        }
        checkResult(dataToCheck)
        // checkResult(dataToCheck)
        // check if win
    },{once: true}))
}



function checkResult(data){

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

    let xToCheck = data.filter(box=> box.classList.contains('cross'))
    .map(x=>(x.dataset.number)).sort()
    console.log(xToCheck);
}

// const wincom = [1, 2, 3]

// const qwer = winnigCombination.map(element => {
//     debugger
//     return wincom.every(el => {
//         return el.includes(element);
//     });
// })