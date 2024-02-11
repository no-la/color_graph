var mainCanvas, mainContext

function load(){
    mainCanvas = document.getElementById("main-canvas")
    mainContext = mainCanvas.getContext("2d")

    // event
    document.getElementById("send-function").addEventListener("click", sendFunction)
}

// function for event
function sendFunction(e){
    r = document.getElementById("input-R").value
    g = document.getElementById("input-G").value
    b = document.getElementById("input-B").value
    f = getRGBFunction(r, g, b)
    drawGraph(f, mainCanvas, mainContext)
}



// set load event
document.addEventListener("DOMContentLoaded", load)