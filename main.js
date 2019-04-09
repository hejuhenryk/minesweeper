import { DOMstrings, showDifficulty, showState, tileSize, changeDisplays,
     popupWindow, popupWindowOff, popupWindowOn, backdropOn, backdropOff } from './gameView.js'
import { dispatchAction, subscribe, save, getSize} from './gameLogic.js' //leftClick, rightClick,


const setupListeners = () => {
    DOMstrings.title.addEventListener('click', () => {
        popupWindow('info');
        backdropOn();
        popupWindowOn();
    })
    // nasluchuj hamburgera
    DOMstrings.navBars.addEventListener('click', () => {
        popupWindow('custom');
        backdropOn();
        popupWindowOn();
         })
    DOMstrings.backdrop.addEventListener('click', () => {
        backdropOff();
        popupWindowOff();
    })
    DOMstrings.popupYes.addEventListener('click', () => {
        backdropOff();
        popupWindowOff();
    })
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

const sendToDispaly = ( state ) => {
    let minesToShow = getSize(state.difficulty).mines - state.mines.flagedAs;
    changeDisplays(state.time, minesToShow )
}

const gameResult = ( state ) => {
    if ( state.status === 'gameOver' ) {
        popupWindow('loser');
        popupWindowOn();
        backdropOn();
    } else if ( state.status === 'winner') {
        popupWindow('winner')
        popupWindowOn();
        backdropOn();
    }
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

let init = () => {
    subscribe(showDifficulty);
    // subscribe(pokaz);
    subscribe(showState);
    subscribe(sendToDispaly);
    subscribe(gameResult);
    // subscribe(displayTime)
    // subscribe(displayMines);
    save();
    setupListeners();
    dispatchAction({type: 'changeDifficulty', payload: 'medium' });

}

window.onload = () => {
    init()
}
