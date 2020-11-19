
let sliderVal = _getSliderValue();

// initialize colors by mimicking slider movement and setting color based on slider's initial value in HTML
_sliderOnInput({
    "target": {
        "value": `${sliderVal}`
    }
});

// override the luminance of the background for whichever object should be "visible" at the initial slider value
elementObjs.forEach((elemObj) => {

    if( typeof(elemObj.highVal) !== "undefined" 
        && elemObj.lowVal <= sliderVal
        && sliderVal < elemObj.highVal) {
            _setElementColorFromSliderVal(sliderVal, elemObj, 50);
    }
});

