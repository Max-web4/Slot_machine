window.onload = function(){
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload(["../img/icons.plist"], function () {
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var size = cc.director.getWinSize();
                    let resultOfSpin = "";
                    let spinning = false;
                    //Get random int function
                   let getRandomInt = function (int)
                   {
                    return Math.random() * int;
                   };
                    //Creating textures(sprites) variables
                   let label = cc.LabelTTF.create("Result: " + resultOfSpin);
                   let spinButton = new ccui.Button.create("../img/button_enabled.png");
                   let mesh = new cc.Sprite("../img/mesh.png");
                   let line = new cc.DrawNode();
                   //Creating function for positioning, scaling and addChild for our Textures(sprites)
                   let self = this;
                   let textureCustomizer = function (texture, xAxis, yAxis, scaleValue, z_Index) {
                    texture.setPosition(size.width / xAxis, size.height / yAxis);
                    texture.setScale(scaleValue);
                    self.addChild(texture, z_Index);
                  };
                   //Customizing our sprites with function(position,scale,zIndex)
                   textureCustomizer(label, 4, 8, 1, 1);
                   textureCustomizer(spinButton, 1.3, 8, 1.5, 1);
                   textureCustomizer(mesh, 1.5, 5, 1.4, 0);
                   //And setting color for our label
                   label.setFontFillColor("black");
                   //Winning Indicator Red Line
                   line.drawSegment(cc.p(size.width / 8.4, size.height / 1.8), cc.p(size.width / 1.07, size.height / 1.8), 2 , cc.color("#D30000"));
                   this.addChild(line, 2);
                   
                    
                   
                }
            });
            cc.director.runScene(new MyScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};