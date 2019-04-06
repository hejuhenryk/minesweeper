import { dispatchAction, subscribe } from "./gameLogic.js" //clickedAction,  changeStatusAction, 
import { display } from "./dispaly.js";
export { DOMstrings, showDifficulty, showState}

export let tileSize = 30;

const DOMstrings = {
    easy: document.querySelector('.easy'),
    medium: document.querySelector('.medium'),
    hard: document.querySelector('.hard'), 
    thisHard: document.querySelector('.thisHard'), 
    minefield: document.querySelector('#minefield'), 
    timer: document.querySelector('#time_counter'),
    mines: document.querySelector('#mines_counter'), 
    backdrop: document.querySelector('.backdrop'),
    popupWindow: document.querySelector('.popup_window'), 
    popupMassage: document.querySelector('.popup_message'),
    popupYes: document.querySelector('.popup_yes')

}
//"https://www.flaticon.com/authors/freepik"  *Designed by Freepik from www.flaticon.com* 
const imgSrc = {
    mine: './grafic/mine.svg',
    flag: './grafic/flag.svg', 
    flag_fail: './grafic/flag_fail.svg'

}
let displays = {
    timer: display('time_counter', 150, 3),
    mines: display('mines_counter', 1500, 3)
}

export const changeDisplays = ( secounds, mines ) => {
    console.log()
    displays.timer.clearDisplay()
    displays.mines.clearDisplay()
    displays.timer.printNum(secounds)
    displays.mines.printNum(mines)
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

// display time

// display mines to find

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
        for( let i = 0 ; i < status.length ; i++ , fieldY += (tileSize) ){
                for( let j = 0 ; j < status[0].length + 1  ; j++, fieldX += (tileSize) ){
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
                } else if ( status[j][i] === 'm') {
                    drowImg(imgSrc.mine, i, j)
                } else if ( status[j][i] === undefined ) {
                    context.fillStyle = '#9f9f9f';
                    context.fillRect((i * tileSize) + 0.1*tileSize, (j * tileSize) + 0.1*tileSize, tileSize- 0.2*tileSize, tileSize- 0.2*tileSize);
                } else {
                    context.clearRect((i * tileSize) + 0.1*tileSize, (j * tileSize) + 0.1*tileSize, tileSize- 0.2*tileSize, tileSize- 0.2*tileSize)
                    context.beginPath();
                    context.font=`${0.7*tileSize}px sans-serif`;
                    context.fillStyle = '#6F6D80';
                    context.fillText(`${status[j][i] === undefined ? '' :
                    status[j][i] === 0 ? '':
                    status[j][i]}`, (i * tileSize) + 0.3*tileSize, (j * tileSize) + 0.75*tileSize);
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