import { dispatchAction, subscribe } from "./gameLogic.js" //clickedAction,  changeStatusAction, 
export { DOMstrings, showDifficulty, showState}

export let tileSize = 30;


const DOMstrings = {
    easy: document.querySelector('.easy'),
    medium: document.querySelector('.medium'),
    hard: document.querySelector('.hard'), 
    thisHard: document.querySelector('.thisHard'), 
    minefield: document.querySelector('#minefield')
}

const imgSrc = {
    mine: './grafic/mine.png',
    flag: './grafic/flag.jpg'
}

// const init = () => {
//     subscribe((state) => {
//         render(state)
//     })

//     window.addEventListener('click', () => {
//         dispatchAction(clickedAction(1))
//     })

//     dispatchAction(changeStatusAction("zaczynamy"))
// }

// init()


// const render = (state) => {
//     console.log(JSON.stingify(state))
//     // przechodzisz po tablicy i wyswietlasz odpowiednie rzeczy 
// }
const showState = state => {
    let status = state.board.map( arr => [...arr])
    console.log(status)
    for( let i = 0 ; i < status[0].length ; i++  ){
        for( let j = 0 ; j < status.length ; j++ ){  
            if( status[j][i].isFlagget() ){
                status[j][i] = -1
            } else {
                status[j][i] = status[j][i].getState()
            }
        }
    }  
    draw( status, DOMstrings.minefield )
} 


const draw = ( status, canvasSelector) => {
    const canvas = canvasSelector
    const context = canvas.getContext('2d')
    canvas.width = tileSize * status[0].length
    canvas.height = tileSize * status.length
    let clearBoard = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    let drowImg = (imgSrc, x, y) => {
        const img = new Image();
        img.onload = function() {
            context.drawImage(img, (x * tileSize) + 0.1*tileSize, (y * tileSize) + 0.1*tileSize, tileSize- 0.2*tileSize, tileSize- 0.2*tileSize)
        }
        img.src = imgSrc
    }

    let printBoard = () => {
        clearBoard();
        let fieldX = 0
        let fieldY = 0
        context.beginPath()
        for( let i = 0 ; i < status[0].length ; i++ , fieldY += (tileSize) ){
                for( let j = 0 ; j < status.length + 1  ; j++, fieldX += (tileSize) ){
                if (j ===  status[0].length ) fieldX = -tileSize
                context.strokeStyle='#9f9f9f';
                context.rect(fieldX, fieldY, tileSize, tileSize);
            }
            context.stroke();
        
        }
    }
    const printCels = () => {
        for( let i = 0 ; i < status[0].length ; i++  ){
            for( let j = 0 ; j < status.length ; j++ ){ 
                if ( status[j][i] === -1) {
                    drowImg(imgSrc.flag, i, j)
                } else {
                    context.beginPath();
                    context.font=`${0.7*tileSize}px sans-serif`;
                    // clearFild(true, x, y)
                    context.fillStyle = '#2f2f2f';
                    // context.fillText(`a`, (i * tileSize) + 0.3*tileSize, (j * tileSize) + 0.75*tileSize);
                    context.fillText(`${status[j][i] === undefined ? '' : status[j][i]}`, (i * tileSize) + 0.3*tileSize, (j * tileSize) + 0.75*tileSize);
                }
            }
        }
    }

    printBoard()
    printCels()
}



let showDifficulty = state => {
    let difficulty = state.difficulty
    if (document.querySelector('.thisHard')) {
        document.querySelector('.thisHard').classList.remove('thisHard')
    }
    if (difficulty === 'easy') {
        DOMstrings.easy.classList.toggle('thisHard')
    } else if (difficulty === 'hard') {
        DOMstrings.hard.classList.toggle('thisHard')
    } else if (difficulty === 'medium') {
        DOMstrings.medium.classList.toggle('thisHard')
    } else {
        console.log(difficulty)
    }
}