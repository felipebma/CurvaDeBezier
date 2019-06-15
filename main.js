var eval = document.getElementById('evaluations');
var canvas = document.getElementById('canvas');
var controlPoints = document.getElementById('controlPoints');
var controlPoligon = document.getElementById('controlPoligonal');
var controlCurve = document.getElementById('BezierCurve');

var ctx = canvas.getContext('2d');
var curves = [], indexes = [];
var grau = 2;
curves[0] = [], indexes[0] = [];
var boundX = canvas.getBoundingClientRect().left;
var boundY = canvas.getBoundingClientRect().top;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var currentCurve = 0;
var move = false;
var globalRadius = 10;
var isHover = false;
var lastCurve = 0;

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radius = globalRadius;
    }
}

function drawWord(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(controlPoints.checked){
        for (var i=0;i<curves[currentCurve].length;i++){
            drawPoint(curves[currentCurve][i]);
        }
    }
    if(controlPoligon.checked){
        drawLinesFromPoints(curves[currentCurve], "pink");
    }
}

function drawLinesFromPoints(points, color){
    for (var i=1;i<points.length;i++){
        drawLine(points[i-1], points[i], color);
    }
}

function drawPoint(pt){
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(pt.x, pt.y, globalRadius , 0, 2*Math.PI);
    ctx.fill();
}

function drawLine(pt1, pt2, color){
    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
}

function isAnyPoint(click){
    console.log(click)
    for (let i = 0; i < curves[currentCurve].length; i++) {
        var element = curves[currentCurve][i];
        if (isInCircle(element, click)){
            return i;
        }
    }
    return -1;
}

function isInCircle(circle, click) {
    var v = {
        x: circle.x - click.x,
        y: circle.y - click.y
    };
    return (Math.sqrt(v.x * v.x + v.y * v.y) <= circle.radius);
}

function updatePoint(index, e){
    if(index != -1){
        curves[currentCurve][index] = new Point(e.clientX - boundX, e.clientY - boundY);
    }
}

function addPoint(pt){
    curves[currentCurve].push(pt);
    indexes[currentCurve][0]=1;
    for(var i=indexes[currentCurve].length-1;i>0;i--){
        indexes[currentCurve][i]=(indexes[currentCurve][i]+indexes[currentCurve][i-1]);
    }    
    indexes[currentCurve].push(1);
    console.log(indexes[currentCurve]);
}
function deletePoint(index){
    curves[currentCurve].splice(index, 1);
}

canvas.addEventListener("dblclick", (e) => {
    isDelete = isAnyPoint({
        x: e.clientX - boundX,
        y: e.clientY - boundY
    });
    if(isDelete!=-1){
        deletePoint(isDelete);
    }else{
        var p = new Point(e.clientX - boundX, e.clientY - boundY);
        addPoint(p);
    }
    drawWord();
});

canvas.addEventListener("mouseup", (e) => {
    isHover = false;
    drawWord();
});

canvas.addEventListener("mousemove", (e) => {
    if(isHover){
        updatePoint(movingPoint, e);
        drawWord(); 
    }
});

canvas.addEventListener("mousedown", (e) => {
    movingPoint = isAnyPoint({
        x: e.offsetX,
        y: e.offsetY
    }) 
    isHover = true;
});

document.getElementById("next").onclick = function(){
    if(lastCurve!=currentCurve){
        currentCurve = currentCurve+1;
        drawWord();
    }
 };

 
 document.getElementById("prev").onclick = function(){
     if(currentCurve != 0){
         currentCurve = currentCurve-1;
         drawWord();
        }
    };
    
document.getElementById("create").onclick = function(){
    lastCurve = lastCurve+1;
    curves[lastCurve] = [];
};

document.getElementById("clear").onclick = function(){
    curves[currentCurve] = [];
    drawWord();
 };

controlPoints.addEventListener(("change"), (e) => {
    drawWord();
});

controlPoligon.addEventListener(("change"), (e) => {
    drawWord();
});

controlCurve.addEventListener(("change"), (e) => {
    drawWord();
});

surfaceOp.addEventListener(("change"), (e) => {
    drawWord();
});

function resizeCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
}
function resizeToFit() {
    var width = parseFloat(window.getComputedStyle(canvas).width);
    var height = parseFloat(window.getComputedStyle(canvas).height);
    resizeCanvas(width, height);
}
resizeToFit();



