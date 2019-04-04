export { display }

let display = (canvasID, blockWidth, numBlocks) => {
    let thick = blockWidth/7
    let hi = thick * 12
    
    
    const can = document.querySelector(`#${canvasID}`)


    if( !can ) console.log('no vaild canvas ')
   

    can.width = blockWidth * numBlocks;
    can.height = hi;
    const context = can.getContext('2d');

    
    let lightBar = (xStart, yStart, xEnd, yEnd) => {
        
        let on = false;
    
        // horizontal or vertical segment ?
        let startArc = xStart === xEnd ? 0 : (-0.5 * Math.PI) ;
        let endArc = xStart === xEnd ? Math.PI : (0.5 * Math.PI) ;
    
        let printSegment = () => {
            context.strokeStyle = `rgb(152, 201 , 233, ${on ? 1 : 0.1} )`;
            context.fillStyle = `rgb(152, 201 , 233, ${on ? 1 : 0.1} )`;
            // context.strokeStyle = `rgb(255, 0 , 0, ${on ? 1 : 0.2} )`;
            // context.fillStyle = `rgb(255, 0 , 0, ${on ? 1 : 0.2} )`;
            context.beginPath();
            context.arc(xStart , yStart , thick/2, startArc, endArc, true);
            context.fill();
            
            context.beginPath();
            context.lineWidth = thick;
            context.moveTo(xStart , yStart);
            context.lineTo(xEnd, yEnd);
            context.stroke();
    
            context.beginPath();
            context.arc(xEnd , yEnd , thick/2, startArc, endArc, false);
            context.fill();
            
        }
        
        let delSegment = () => {
            context.clearRect((xStart - thick/2), (yStart - thick/2),xEnd -xStart , yEnd - yStart );
        }
    
        return {
            printSegment,
            on ()  { 
                delSegment();
                on = true;
                printSegment();
            },
            off ()  { 
                delSegment()
                on = false
                printSegment()
            }    
        }
    }
  
    let segments = (i) => [
        lightBar((2*thick + blockWidth * i), 1*thick, 5*thick + blockWidth * i ,1*thick),
        lightBar(6*thick + blockWidth * i, 2*thick, 6*thick + blockWidth * i,  5*thick),
        lightBar(6*thick + blockWidth * i, 7*thick, 6*thick + blockWidth * i, 10*thick),
        lightBar(2*thick + blockWidth * i, 11*thick, 5*thick + blockWidth * i , 11*thick),
        lightBar(1*thick + blockWidth * i, 7*thick, 1*thick + blockWidth * i, 10*thick),
        lightBar(1*thick + blockWidth * i, 2*thick, 1*thick + blockWidth * i, 5*thick), 
        lightBar(2*thick + blockWidth * i, 6*thick, 5*thick + blockWidth * i ,6*thick)
    ];

    let displays = [];

    for (let i = numBlocks - 1 ; i >= 0 ; i--) {
        displays.push(segments(i))
    }

    let numbers = {
        0: [1, 1, 1, 1, 1, 1, 0],
        1: [0, 1, 1, 0, 0, 0, 0],
        2: [1, 1, 0, 1, 1, 0, 1],
        3: [1, 1, 1, 1, 0, 0, 1],
        4: [0, 1, 1, 0, 0, 1, 1],
        5: [1, 0, 1, 1, 0, 1, 1],
        6: [1, 0, 1, 1, 1, 1, 1],
        7: [1, 1, 1, 0, 0, 0, 0],
        8: [1, 1, 1, 1, 1, 1, 1],
        9: [1, 1, 1, 1, 0, 1, 1], 
        E: [1, 0, 0, 1, 1, 1, 1]
    }
     
    let printNum = (num) => {
        let numArr = num.toString().split('').reverse();
        displays.forEach( (display, displayNo) => {
            display.forEach( (el, index) => {
                if (numbers[`${(displayNo > numArr.length - 1) ? 0 : numArr[displayNo]}`][index] === 1 ){
                    el.on();
                } else if (numbers[`${(displayNo > numArr.length - 1) ? 0 : numArr[displayNo]}`][index] === 0){
                    el.off();
                }
            })
        })
    }
    let clearDisplay = () => {
        context.fillStyle='#000';
        context.fillRect(0, 0, can.width, can.height);
    }
    return {
        clearDisplay,
        printNum
    } 
}



