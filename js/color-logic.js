let slider = document.getElementById("slider");
slider.oninput = _sliderOnInput;

let sliderParent = document.getElementById("slider-parent");
let documentBody = document.querySelector("body");
let analyticsElem = document.getElementById("analytics");
let bikelapseElem = document.getElementById("bikelapse");
let silverspoon360Elem = document.getElementById("silverspoon360");
let webmidiaudiosyncElem = document.getElementById("webmidiaudiosync");

const defaultLumVal = 50;
const numberOfLinks = 4
const reavealSpan = 360/numberOfLinks;

// THESE ARE THE DROIDS YOU ARE LOOKING FOR
let bikelapseObj = {
    "element": bikelapseElem,
    "lum": defaultLumVal,
    "lowVal": 0,
    "highVal": reavealSpan * 1
}

let analyticsObj = {
    "element": analyticsElem,
    "lum": defaultLumVal,
    "lowVal": reavealSpan * 1,
    "highVal": reavealSpan * 2
}

let silverspoon360Obj = {
    "element": silverspoon360Elem,
    "lum": defaultLumVal,
    "lowVal": reavealSpan * 2,
    "highVal": reavealSpan * 3
}

let webmidiaudiosyncObj = {
    "element": webmidiaudiosyncElem,
    "lum": defaultLumVal,
    "lowVal": reavealSpan * 3,
    "highVal": reavealSpan * 4
}


// ********* THIS IS THE BACKGROUND ********* 
let documentBodyObj = {
    "element": documentBody,
    "lum": defaultLumVal
    // "lowVal": 40,
    // "highVal": 80
}

// THIS IS THE SLIDER'S PARENT DIV
let sliderParentObj = {
    "element": sliderParent,
    "lum": defaultLumVal
}

let elementObjs = [ documentBodyObj, analyticsObj, bikelapseObj, silverspoon360Obj, webmidiaudiosyncObj];



// ************* MAIN SLIDER INPUT CALLBACK ***********************
function _sliderOnInput(event){

    const sliderVal = Number(event.target.value);
    // const sliderVal = event.target.value;
    
    // loop through all the elements and set their color
    elementObjs.forEach((elementObj) => {
        _setElementColorFromSliderVal(sliderVal, elementObj);

    });

}


// ************* SET THE COLOR OF A GIVEN ELEMENT BASED ON SLIDER VALUE ***********************
function _setElementColorFromSliderVal(sliderVal, targetObj, luminance){

    luminance = luminance || _getLuminanceForObj(targetObj, sliderVal);

    targetObj.element.setAttribute("style", `background-color:hsl(${sliderVal}, 100%, ${luminance}%);`);

    if(targetObj.element.nodeName === "A"){
        // console.log(targetObj);
        targetObj.element.style.color = `hsl(${sliderVal}, 100%, 50%)`;
        // targetObj.element.setAttribute("style", `color:hsl(${sliderVal}, 100%, 50%);`);
    }
    
}

// ************* GET THE LUMINANCE BASED ON THE SLIDER VALUE ***********************
function _getLuminanceForObj(targetObj, sliderVal){

    if( typeof(targetObj.highVal) !== "undefined" 
        && targetObj.lowVal <= sliderVal
        && sliderVal < targetObj.highVal) {

        let midVal = targetObj.lowVal + Math.floor((targetObj.highVal - targetObj.lowVal)/2);
        let scaleFactor = defaultLumVal / Math.floor((targetObj.highVal - targetObj.lowVal)/2);

        if(sliderVal <= midVal){
            targetObj.lum = defaultLumVal - (sliderVal - targetObj.lowVal) * scaleFactor;
        }
        else if(midVal < sliderVal){
            targetObj.lum = defaultLumVal - (targetObj.highVal - sliderVal) * scaleFactor;
        }


        // console.log(targetObj.lum, sliderVal);
    }
    else {
        targetObj.lum = defaultLumVal;
    }

    return targetObj.lum;

}







// ************* GETTERS AND SETTERS ***********************
function _getSliderValue(){
    return slider.value;
}