const gameBoard = (() => {
    board = [];
    
    for(let i=0; i<9; i++){
        const box = document.createElement('div');
        box.classList.add(`box`)
        box.classList.add(`number-${i}`)
        board.push(box)
    }
   
    const boardSpace = document.querySelector('.board')
    board.forEach(item => boardSpace.appendChild(item));

    console.log(boardSpace);

    const boxs = document.querySelectorAll('.box')
    console.log(boxs);
})();