var n=1,t=500;
var indexes=[1];
var points=[];




bezierCurve = function(){
    curvePoints=[];
    var indexesX = [], indexesY = [];
    for(var i=0;i<points.length;i++){
        indexesX.push(indexes[i]*points[i].x);
        indexesY.push(indexes[i]*points[i].y);
    }
    var coefA=points.length,coefB=0;
    for(var i=0;i<=t;i++)
}

addPoint = function(){
    
}