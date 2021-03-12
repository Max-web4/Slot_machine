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
                   let label = cc.LabelTTF.create("Result: " + resultOfSpin),
                   spinButton = new ccui.Button.create("../img/button_enabled.png"),
                   mesh = new cc.Sprite("../img/mesh.png"),
                   line = new cc.DrawNode();
                   //Creating function for positioning, scaling and addChild for our Textures(sprites)
                   let self = this,
                   textureCustomizer = function (texture, xAxis, yAxis, scaleValue, z_Index) {
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
                    //Extracting icons from Icons.Plist
                   cc.spriteFrameCache.addSpriteFrames("../img/icons.plist");
                   //Creating array of Slot Cells
                   let cells = [];
                   //Filling it with sprites
                   for (let index = 0; index < 9; index++) {
                    cells.push(new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("icons/" + Math.floor(getRandomInt(8)) + ".png")));
                    this.addChild(cells[index], 1);
                   cells[index].setScale(1);
                   };
                   //Cells positioning by Rows function 
                  let cellsPositioning = function(initialIndex, maxIndex, yAxisIndex) {
                    let Y_pos = [1.32, 1.8, 2.8],
                        X_pos = [4, 1.9, 1.25],
                        pos_index = 0;
                    for (let idx = initialIndex; idx < maxIndex; idx++) {
                      cells[idx].setPosition(size.width / X_pos[pos_index], size.height / Y_pos[yAxisIndex]);
                      pos_index++;
                    }
                  };
                  
                   
                }
            });
            cc.director.runScene(new MyScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};