let slider = document.getElementById("slider");
slider.oninput = _sliderOnInput;

let sliderParent = document.getElementById("slider-parent");
let documentBody = document.querySelector("body");
let linkDivs = document.querySelectorAll(".linkDiv");

let elementObjs = [];
const defaultLumVal = 50;
const numberOfLinks = linkDivs.length;
const reavealSpan = 360/numberOfLinks;

// ********* THIS IS THE BACKGROUND *********
let documentBodyObj = {
    "element": documentBody,
    "lum": defaultLumVal
    // "lowVal": 40,
    // "highVal": 80
}

// Add the BodyObj to the list we will update with the slider's color
elementObjs.push(documentBodyObj);

// ********* CREATE LINKDIV OBJECTS AND ADD TO THE LIST WE WILL UPDATED FROM THE SLIDER *********
// here we iterate through all the linkDivs in the HTML
// for each one we create an object with a reference to the "a" element,
// the defaultLumVal, and the low/high Values for revealing the linkDiv
// everytime we add a new linkDiv, the distance along the slider that is
// dedicated to revealing each linkDiv will get smaller
linkDivs.forEach( (linkDiv, i) => {
    let linkDivObj = {
        "element": linkDiv.querySelector("a"),
        "lum": defaultLumVal,
        "lowVal": reavealSpan * i,
        "highVal": reavealSpan * (i+1)
    }

    elementObjs.push(linkDivObj);

});




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