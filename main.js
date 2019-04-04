import { DOMstrings, showDifficulty, showState, tileSize } from './gameView.js'
import { resetGame, setDifficulty,  dispatchAction, subscribe, save } from './gameLogic.js' //leftClick, rightClick,
export {  }




// const changeDifficulty = difficulty => {

//     // update game state
//     resetGame();
//     setDifficulty(difficulty);
//     // update user interface #buttons ## new bord
//     showDifficulty(difficulty);
// }

// add listeners for difficulty buttons: #easy # medium #hard 
const setupListeners = () => {
    DOMstrings.easy.addEventListener('click', () => { dispatchAction({type: 'changeDifficulty', payload: 'easy' })})
    DOMstrings.medium.addEventListener('click', () => { dispatchAction({type: 'changeDifficulty', payload: 'medium' })})
    DOMstrings.hard.addEventListener('click', () => { dispatchAction({type: 'changeDifficulty', payload: 'hard' })})
    DOMstrings.minefield.addEventListener('click', e => {
        dispatchAction({
            type: 'leftClick',
            payload: {
                x: Math.floor(e.offsetX/tileSize),
                y: Math.floor(e.offsetY/tileSize)
            }
        })
    })
    DOMstrings.minefield.addEventListener('contextmenu', e => {
        e.preventDefault();

        dispatchAction({
            type: 'rightClick',
            payload: {
                x: Math.floor(e.offsetX/tileSize),
                y: Math.floor(e.offsetY/tileSize)
            }
            
        })
    })
}

let pokaz = ( copokazac ) => {console.log(copokazac.board[0][0].isFlagget())}
export const udawajLewy = (X,Y ) => {
    dispatchAction({
        type: 'leftClick',
        payload: {
            x: X,
            y: Y
        }
    })
}
export const udawajPrawy = (X,Y ) => {
    dispatchAction({
        type: 'rightClick',
        payload: {
            x: X,
            y: Y
        }
    })
}

let init = () => {
    subscribe(showDifficulty)
    subscribe(pokaz)
    subscribe(showState)
    // subscribe(displayTime)
    // subscribe(displayMines)
    save()
    setupListeners();
    dispatchAction({type: 'changeDifficulty', payload: 'medium' })
}

window.onload = () => {
    init()
}
