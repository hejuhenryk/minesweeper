import { DOMstrings, showDifficulty, showState, tileSize, changeDisplays } from './gameView.js'
import { dispatchAction, subscribe, save } from './gameLogic.js' //leftClick, rightClick,
export { popupWindow }




// const changeDifficulty = difficulty => {

//     // update game state
//     resetGame();
//     setDifficulty(difficulty);
//     // update user interface #buttons ## new bord
//     showDifficulty(difficulty);
// }

// add listeners for difficulty buttons: #easy # medium #hard 
const setupListeners = () => {
    document.querySelector('.title').addEventListener('click', popupWindow)
    document.querySelector('.popup_yes').addEventListener('click', popupWindowOut)
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

let popupWindowOut = () => {
    DOMstrings.backdrop.classList.add('display_none')
    DOMstrings.popupWindow.classList.remove('window_in')
}

let popupWindow = ( message ) => {
    if ( message === 'winner') {
        DOMstrings.popupMassage.innerHTML = 'woop woop - You just found all hiden bombs'
        // continue or do something else
    } else if ( message === 'loser') {
        DOMstrings.popupMassage.innerHTML = 'woop woop - You just divede your self in milions of pices'
        // continue or do something else    
    }
    DOMstrings.popupWindow.classList.add('window_in')
    DOMstrings.backdrop.classList.remove('display_none')

    DOMstrings.backdrop.addEventListener('click', () => { 
        popupWindowOut()
    })
}

let sendTime = ( state ) => {
    changeDisplays(state.time, state.mines )
}


let pokaz = ( copokazac ) => {console.log(copokazac.status)}
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
    subscribe(sendTime)
    // subscribe(displayTime)
    // subscribe(displayMines)
    save()
    setupListeners();
    dispatchAction({type: 'changeDifficulty', payload: 'medium' })
}

window.onload = () => {
    init()
}
