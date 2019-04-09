import { display } from "./dispaly.js";
import {customSize, dispatchAction} from "./gameLogic.js"
export let tileSize = 30;

export const DOMstrings = {
    easy: document.querySelector('.easy'),
    medium: document.querySelector('.medium'),
    hard: document.querySelector('.hard'), 
    // thisHard: document.querySelector('.thisHard'), 
    minefield: document.querySelector('#minefield'), 
    timer: document.querySelector('#time_counter'),
    mines: document.querySelector('#mines_counter'), 
    backdrop: document.querySelector('.backdrop'),
    popupWindow: document.querySelector('.popup_window'), 
    popupMassage: document.querySelector('.popup_message'),
    popupYes: document.querySelector('.popup_yes'),
    navBars: document.querySelector('.navigation-mobile'),
    title: document.querySelector('.title'),
    /// haburger menu
    navBars: document.querySelector('.navigation-mobile'),
    navBarT: document.querySelector('.nav-bar__top'),
    navBarM: document.querySelector('.nav-bar__middle'),
    navBarB: document.querySelector('.nav-bar__bottom')

}
export const navBarInOut = () => {
    DOMstrings.navBarM.classList.toggle('toRight');
    DOMstrings.navBarT.classList.toggle('leftUp');
    DOMstrings.navBarB.classList.toggle('rightDown');
}

//"https://www.flaticon.com/authors/freepik"  *Designed by Freepik from www.flaticon.com* 
const imgSrc = {
    mine: './grafic/mine.svg',
    flag: './grafic/flag.svg', 
    flag_fail: './grafic/flag_fail.svg'

}
const displays = {
    timer: display('time_counter', 150, 3),
    mines: display('mines_counter', 1500, 3)
}

export const changeDisplays = ( secounds, mines ) => {
    displays.timer.clearDisplay()
    displays.mines.clearDisplay()
    displays.timer.printNum(secounds)
    displays.mines.printNum(mines)
}

export const popupWindowOff = () => {
    DOMstrings.popupWindow.classList.remove('window_in')
    navBarInOut()
}
export const popupWindowOn = () => {
    DOMstrings.popupWindow.classList.add('window_in')
    navBarInOut()
}

export const backdropOff = () => {
    DOMstrings.backdrop.classList.add('display_none')
    // if (hamMenu.status === -1 ) hamMenu.navBarInOut()
}
export const backdropOn = () => {
    DOMstrings.backdrop.classList.remove('display_none')
}

export const popupWindow = ( message ) => {
    if ( message === 'winner') {
        DOMstrings.popupMassage.innerHTML = 'This is impressive! Keep Going'
        // continue or do something else
    } else if ( message === 'loser') {
        DOMstrings.popupMassage.innerHTML = '<p>That\'s OK</p> <p>Everybody can make mistakes</p>'
        // continue or do something else    
    } else if ( message === 'custom') {
        const setBoundaries = () =>  {
            if ( minesSlider.value > (sizeXSlider.value * sizeYSlider.value / 2) ) {
                minesSlider.value = Math.floor(sizeXSlider.value * sizeYSlider.value / 2)
                mineDispl.value = minesSlider.value
            }
        }

        DOMstrings.popupMassage.innerHTML = `
           <span> <p> Mines </p> <input type="range" name="mines" id="num_mines" value="10" min="1" max="199" oninput="num_mines_disp.value = num_mines.value" >
             <output  id="num_mines_disp"></output></span>
           <span> <p> Width </p><input type="range" name="sizeX" id="sizeX" value="6" min="5" max="20" oninput="sizeX_disp.value = sizeX.value">
           <output  id="sizeX_disp"></output></span>
            <span> <p> Hight </p><input type="range" name="sizeY" id="sizeY" value="6" min="5" max="20" oninput="sizeY_disp.value = sizeY.value">
            <output  id="sizeY_disp"></output></span>
        `
        const minesSlider = document.querySelector('#num_mines')
        const sizeXSlider = document.querySelector('#sizeX')
        const sizeYSlider = document.querySelector('#sizeY')
        const mineDispl = document.querySelector('#num_mines_disp')
        
        minesSlider.addEventListener('input', () => {
            setBoundaries();
        })
        sizeXSlider.addEventListener('input', () => {
            setBoundaries();
        })
        sizeYSlider.addEventListener('input', () => {
            setBoundaries();
        })
        const startCustomGame = () => {
            customSize.mines = parseInt(minesSlider.value);
            customSize.hight = parseInt(sizeYSlider.value);
            customSize.wide = parseInt(sizeXSlider.value);
            // setup game with custom data
            dispatchAction({type: 'changeDifficulty', payload: 'custom' });
            DOMstrings.popupYes.innerText = 'Continue';
            DOMstrings.popupYes.removeEventListener('click', startCustomGame)
        }
        DOMstrings.popupYes.innerText = 'Custom';
        DOMstrings.popupYes.type = 'submit';
        DOMstrings.popupYes.addEventListener('click', startCustomGame)
        DOMstrings.popupWindow.classList.add('window_in')
    } else if ( message === 'info') {
        DOMstrings.popupMassage.innerHTML = `
        <p>
            Minesweeper - try to clear a board containing hidden "mines"
            without detonating any of them, use clues about the number of neighboring mines
        </p>
        <p> Icones *Designed by Freepik from <a href="https://www.flaticon.com"> www.flaticon.com</a>* </p>
        <p>Enjoy <a href="https://github.com/hejuhenryk/minesweeper2"> Marcin Sawczuk-Szymkiewicz</a></p>
     `
    }
}



export const showState = state => {
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
    const clearBoard = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    const drowImg = (imgSrc, x, y) => {
        const img = new Image();
        img.onload = function() {
            context.drawImage(img, (x * tileSize) + 0.1*tileSize, (y * tileSize) + 0.1*tileSize, tileSize- 0.2*tileSize, tileSize- 0.2*tileSize)
        }
        img.src = imgSrc
    }

    const printBoard = () => {
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



export const showDifficulty = state => {
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