
    width: 1000,
    height: 500,
    code: function() {
        
        function add(cont){
            document.getElementById('teste').textContent=cont;
        }
        var myShape = new Rect(0, 0, 1000,500);
            myShape.fill('grey');
            myShape.addTo(stage);
            
            var cont =0;
        stage.on('pointerdown',function(e){
            point = new Circle(e.x,e.y,10);
            point.fill('red')
            .on('pointerdown', function(e) {
                x = this.attr('x');
                y = this.attr('y');
                point.addTo(point.parent);
            })
            .on('multi:drag', function(e){
                this.attr({
                    x: x + e.diffX,
                    y: y + e.diffY
                });
            })
            .on('click', function(){
                stage.removeChild(point);
                cont--;
            })
            stage.addChild(point);
            console.log(++cont);
            add(cont);
        })

    }    