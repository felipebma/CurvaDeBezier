
bonsai.run(document.getElementById('tela'), {
    
    width: 1000,
    height: 500,
    code: function() {
        
        var myShape = new Rect(0, 0, 1000,500);
            myShape.fill('grey');
            myShape.addTo(stage);
            
            var cont =0;
        stage.on('multi:pointerdown',function(e){
            point = new Circle(e.x,e.y,10);
            point.fill('red')
            .on('pointerdown', function(e) {
                x = this.attr('x');
                y = this.attr('y');
                stage.addChild(point);
            })
            .on('multi:drag', function(e){
                this.attr({
                    x: x + e.diffX,
                    y: y + e.diffY
                });
            })
            .on('pointerdown', function(){
                stage.removeChild(point);
                cont--;
            })
            stage.addChild(point);
            console.log(++cont);
        })

    }    
  }
);