var mainCanvas, mainContext

function load(){
    mainCanvas = document.getElementById("main-canvas")
    mainContext = mainCanvas.getContext("2d")

    // event
    document.getElementById("send-function").addEventListener("click", sendFunction)

    // init sub-canvases
    drawExplainCanvas()
    drawGraph((x, y)=>[normalize((x+1)/2)*255, normalize((y+1)/2)*255, 0], getSubCanvas(1))
    drawGraph((x, y)=>[normalize(Math.sqrt(1-x**2-y**2))*255, 0, 0], getSubCanvas(2))
    drawGraph((x, y)=>[normalize(norm(x, y))*255, 0, 0], getSubCanvas(3))
    drawGraph((x, y)=>[0, normalize(radian(x, y))*255, 0], getSubCanvas(4))
    drawGraph((x, y)=>[normalize(norm(x, y))*255, normalize(radian(x, y))*255, 0], getSubCanvas(5))
}


// function for event
function sendFunction(e){
    r = document.getElementById("input-R").value
    g = document.getElementById("input-G").value
    b = document.getElementById("input-B").value
    f = getRGBFunction(r, g, b)
    drawGraph(f, mainCanvas)
}


// get nodes
function getSubCanvas(i){
    canvas = document.getElementById(`sub-canvas-${i}`)
    return canvas
}


// function for init graph
function norm(x, y){
    return Math.sqrt(x**2+y**2)
}
function radian(x, y){
    return (
                ((1+Math.sign(y))/2)*Math.acos(x/Math.sqrt(x**2+y**2))
                + ((1-Math.sign(y))/2)*(Math.acos(-x/Math.sqrt(x**2+y**2))+Math.PI)
            )
            /(2*Math.PI)
}


// draw axes and others
function drawExplainCanvas(){
    canvas = getSubCanvas(0)
    context = canvas.getContext("2d")

    delta = 10

    centerX = canvas.width/2
    centerY = canvas.height/2

    arrowSize = 6

    context.strokeStyle = "#000"
    context.font = "18px Arial"

    // sub-canvas
    context.fillStyle = "#f1f1f1"
    rectSize = 180
    context.lineWidth = 2
    context.fillRect(centerX-rectSize/2, centerY-rectSize/2, rectSize, rectSize)
    context.strokeRect(centerX-rectSize/2, centerY-rectSize/2, rectSize, rectSize)
    
    // reset
    context.fillStyle = "#000"
    context.lineWidth = 1

    // range
    context.fillText("1", centerX-18, centerY-rectSize/2-5)
    context.fillText("-1", centerX-23, centerY+rectSize/2+23)
    context.fillText("1", centerX-rectSize/2-23, centerY-5)
    context.fillText("-1", centerX+rectSize/2+5, centerY-5)

    // x-axis
    context.beginPath();
    context.moveTo(delta, centerY)
    context.lineTo(canvas.width-delta, centerY)
    context.lineTo(canvas.width-delta-arrowSize, centerY-arrowSize)
    context.moveTo(canvas.width-delta, centerY)
    context.lineTo(canvas.width-delta-arrowSize, centerY+arrowSize)
    context.stroke()
    context.fillText("x軸", canvas.width-delta-20, centerY+30)
    // y-axis
    context.beginPath();
    context.moveTo(centerX, canvas.height-delta)
    context.lineTo(centerX, delta)
    context.lineTo(centerX-arrowSize, delta+arrowSize)
    context.moveTo(centerX, delta)
    context.lineTo(centerX+arrowSize, delta+arrowSize)
    context.stroke()
    context.fillText("y軸", centerX+20, delta+20)



}



// set load event
document.addEventListener("DOMContentLoaded", load)