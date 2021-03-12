window.onload = function(){
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload(["../img/icons.plist"], function () {
            let MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    let size = cc.director.getWinSize();
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
                  cellsPositioning(0,3,0); //Top row positioning
                  cellsPositioning(3,6,1); // Middle Row positioning
                  cellsPositioning(6,9,2); // Bottom Row positioning
                  //Our Spin Function ;)
                  let makeSpin = function () {
                    //Deleting Win/Not Win text from label before the new spin, adding three dots for better UX
                    label.setString("Result:  ...  ");
                    //Prevent from Button click while Spinning
                    if(spinning) {
                      return;
                    }
                    //Making Spinning status True
                    spinning = true;
                    //Changing Button Texture to Blocked for better UX
                    spinButton.loadTextures("resources/button_disabled.png");
                    //There is the fun begin :D
                    let spinner = setInterval(function(){
                      for (index = 0; index < cells.length; index++) {
                        cells[index].id = Math.floor(getRandomInt(8));
                        cells[index].initWithSpriteFrameName("icons/" + cells[index].id + ".png"); 
                        //It's just the illusion of spin effect, the animation is the most weak part of the project, it can be better 
                        cells[index].runAction(cc.moveBy(0.1, 0 , -10));
                        cellsPositioning(0,3,0);
                        cellsPositioning(3,6,1);
                        cellsPositioning(6,9,2);
                      }
                    }, 200)
                    //Stop Spin in 10 Sec
                    setTimeout(function() { 
                      //Stop SetInterval function
                      clearInterval(spinner); 
                      //Checking for Winning combo
                      checkWin();
                      //Changing Spinning Status back to false
                      spinning = false
                      //Changing Button Texture back to normal
                      spinButton.loadTextures("resources/button_enabled.png");
                    }, 10000);
                  };
                  //CheckWin Function
                  let checkWin = function () {
                    //If 3 empty cells - NOT WIN
                    if (cells[3].id === 5 
                      && cells[4].id === 5 
                      && cells[5].id === 5) 
                    {
                      resultOfSpin = "Not Win";
                    } //If 3 same cells - WIN
                    else if (cells[3].id === cells[4].id 
                      && cells[3].id === cells[5].id 
                      && cells[4].id === cells[5].id) 
                    {
                      resultOfSpin = "Win";
                    }
                      //Else 3 different cells - NOT WIN
                    else 
                    {
                      resultOfSpin = "Not Win";
                    }
                    label.setString("Result: " + resultOfSpin);
                  }

                   
                }
            });
            cc.director.runScene(new MyScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};