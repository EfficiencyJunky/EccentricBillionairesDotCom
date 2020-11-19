
// store the height/width of the window
let winHeight = window.innerHeight;
let winWidth = window.innerWidth;

let button = document.getElementById("stop-start");
button.onclick = _toggleTimer;
window.onresize = updateWindowSizeVars;

const _heightScaleFactor = 0.5;
const _heightOffset = 0.25;
const _widthScaleFactor = 0.25;
const _timerInterval = 250;
let _timerID = undefined;

let randomOffsetTopScalar = 0.5;
let randomOffsetWidthScalar = 0.5;


function updateWindowSizeVars() {
    
    winHeight = window.innerHeight;
    winWidth = window.innerWidth;
    _timerCallback(false)
    // console.log("height", winHeight);
}
  



function _timerCallback(resetRandomScalars = true){
    
    if(resetRandomScalars){
        randomOffsetTopScalar = Math.random();
        randomOffsetWidthScalar = Math.random();
    }

    const offsetTop = Math.round(winHeight * (_heightScaleFactor * randomOffsetTopScalar) + (_heightOffset * winHeight) );
    const offsetWidth = Math.round(winWidth * (_widthScaleFactor * randomOffsetWidthScalar));

    // sliderParent.setAttribute("style", `top:${offsetTop}`);
    // sliderParent.setAttribute("style", `right:${offsetWidth}`);
    sliderParent.style.top = `${offsetTop}px`;
    sliderParent.style.left = `${offsetWidth}px`;
    // slider.offsetWidth = `${offsetWidth}px`;

    // console.log("offsetTop", `${offsetTop}px`);
    // console.log("offsetWidth", `${offsetWidth}px`);
}


// _timerStart();


// ################## PRIVATE UI UPDATE METHODS ##################

// starts the timer if it's not running. stops it if it is
function _toggleTimer(event){
    if(_timerID !== undefined){
        _timerStop();
        event.target.innerHTML = "need confusion?";
    }
    else{
        winHeight = window.innerHeight;
        winWidth = window.innerWidth;        
        _timerStart();
        event.target.innerHTML = "need calm?";
    }

}


// starts an interval timer that runs a callback every x milliseconds
function _timerStart() {
    
    if(_timerID === undefined){
        
        _timerID = window.setInterval(_timerCallback , _timerInterval);
    }

}

// stops the currently running interval timer who's ID is stored in "_rabbitAndSliderSyncTimerID"
function _timerStop(){
    if(_timerID !== undefined){

        // garbage collection
        clearInterval(_timerID);
    
        // this lets us know we need a new one
        _timerID = undefined;
    }
}



