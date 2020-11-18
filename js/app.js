
let sliderVal = _getSliderValue();

// initialize colors by mimicking slider movement and setting color based on slider's initial value in HTML
_sliderOnInput({
    "target": {
        "value": `${sliderVal}`
    }
});