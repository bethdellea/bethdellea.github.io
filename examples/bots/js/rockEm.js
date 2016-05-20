/*
    rockEm.js
    game functionality for this robots game!
*/

//-----------------------------------------------------------
//When the page has fully loaded, execute the eventWindowLoaded function
window.addEventListener("load", eventWindowLoaded, false);
//-----------------------------------------------------------

//-----------------------------------------------------------
//eventWindowLoaded()
//Called when the window has been loaded it then calls the canvasapp() 
function eventWindowLoaded() {
    canvasApp();	
} // eventWindowLoaded()
//-----------------------------------------------------------

//-----------------------------------------------------------
//canvasSupport() 
//Check for Canvas Support using modernizr.js
function canvasSupport() {
    return Modernizr.canvas;	
} // canvasSupport()
//-----------------------------------------------------------

//-----------------------------------------------------------
//canvasApp() 
//The function where ALL our canvas code will go
function canvasApp() {

    //-----------------------------------------------------------
    //Check to see if the canvas has a context 
    if (!canvasSupport()) {
        return;	//Canvas not supported so exit the function
    }
    
    
    function changeScore(){
        document.getElementById("scoreKeeper").innerHTML = gameswon + " - " + gameslost;
    }
    /* --------------------------------------------------------- */
    /* Math Utility Fuctions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //get a random number with in a range	
    function getRandom(min, max) {
        return Math.floor( Math.random() * (max - min) + min );
    }//getRandom()
    
    /* --------------------------------------------------------- */
    /* Image Utility Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // create and load image objects into an array based on an image source array
    function loadImages( images, imageSources, callback ) {
        var loadedImages = 0;
        
        // for each imageSource
        for ( var src = 0; src < imageSources.length; src++ ) {
            //create a new image object
            images[src] = new Image();
            
            //load the image 
            images[src].onload = function() {
                if( ++loadedImages >= imageSources.length ) {
                    callback( images );
                }; //if
            } //onload()
            
            //set the image source
            images[src].src = imageSources[src];
            
        } //for
        
      } //loadimages()

    /* --------------------------------------------------------- */
    /* Canvas Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
        
    //-----------------------------------------------------------
    //Setup the canvas object
    var theCanvas = document.getElementById("myCanvas"); //get the canvas element
    var canvasHeight = theCanvas.height; //get the heigth of the canvas
    var canvasWidth = theCanvas.width;  //get the width of the canvas
    var context = theCanvas.getContext("2d");  //get the context

    var level = 1; // 1 for easy, 2 for med, 3 for hard
    var gameOver = false;
    var version = "";
    var gameswon = 0;
    var gameslost = 0;
    var updatedTally = false;
    var aiNames = ["Watson", "Robby", "Marvin", "XJ-9", "C-3PO", "R2-D2", "Mr. Roboto", "Ultron"];
    var aiNameIdx = 0;
    /* --------------------------------------------------------- */
    /* Image Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    var llegYpos = 92;
    var rlegYpos = 86;
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // declare an array to hold the image objects
    var images = [];
    
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // declare an array for image sources and assign the image sources
    // put the bg image first
    // bot parts follow, in sets by bot color
    var imageSources = [
        // background image
      "./img/arena.png",        //[0]    //technically doesn't even have to be here!
           //turqBot
        "./img/turqArm.png",    //[1]
        "./img/turqHead.png",   //[2]
        "./img/turqLeg.png",    //[3]
        "./img/turqTorso.png",  //[4]
            //yellowBot
        "./img/yellowArm.png",  //[5]
        "./img/yellowHead.png", //[6]
        "./img/yellowLeg.png",  //[7]
        "./img/yellowTorso.png",//[8]
            //whiteBot 
        "./img/whiteArm.png",   //[9]
        "./img/whiteHead.png",  //[10]
        "./img/whiteLeg.png",   //[11]
        "./img/whiteTorso.png", //[12]
            //blueBot
        "./img/blueArm.png",    //[13]
        "./img/blueHead.png",   //[14]
        "./img/blueLeg.png",    //[15]
        "./img/blueTorso.png",   //[16]
        
        //REVERSE, REVERSE!
            //turqBot
        "./img/turqArmF.png",    //[17]
        "./img/turqHeadF.png",   //[18]
        "./img/turqLegF.png",    //[19]
        "./img/turqTorsoF.png",  //[20]
            //yellowBot
        "./img/yellowArmF.png",  //[21]
        "./img/yellowHeadF.png", //[22]
        "./img/yellowLegF.png",  //[23]
        "./img/yellowTorsoF.png",//[24]
            //whiteBot 
        "./img/whiteArmF.png",   //[25]
        "./img/whiteHeadF.png",  //[26]
        "./img/whiteLegF.png",   //[27]
        "./img/whiteTorsoF.png", //[28]
            //blueBot
        "./img/blueArmF.png",    //[29]
        "./img/blueHeadF.png",   //[30]
        "./img/blueLegF.png",    //[31]
        "./img/blueTorsoF.png"   //[32]
        
        
    ]; //imageSource    

   var botArray = [];
    /* --------------------------------------------------------- */
 
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Event Handlers */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
                
    //-----------------------------------------------------------

    //event listeners
    start.addEventListener("click", eventGameStart, true);
    
    //key event listenter
    window.addEventListener( "keydown", eventKeyDown, true );

    //-----------------------------------------------------------
    //event handler for start button
    function eventGameStart( e ){

        botArray = [];
        makeBots();
        
        botArray[0].adjustBody();
        botArray[1].adjustBody();
        
        clearCanvas();
        gameOver = false;
        updatedTally = false;
        //pick a name for the enemy robot
        aiNameIdx = getRandom(0, aiNames.length);

        //version = userInput.type.value; //norm or cs
        level = + userInput.lvl.value;//1, 2, or 3
        botArray[0].colorNum = 0;
        botArray[0].colorNum = + userInput.colors.value; 
        if(botArray[0].colorNum == 1){
            botArray[1].colorNum = 5;
        }else if(botArray[0].colorNum == 5){
            botArray[1].colorNum = 9;
        }else if(botArray[0].colorNum == 9){
            botArray[1].colorNum = 13
        }else{
            botArray[1].colorNum = 1
        }
        //1, 5, 9, 13
        console.log("you just hit the start button! calling gameLoop...");
        gameLoop();
    }
    
    //-----------------------------------------------------------
    //event handler for key down
    function eventKeyDown( e ) {
        
        //get the key pressed
        var keyPressed = String.fromCharCode(e.keyCode);
        //console.log( keyPressed );
        
        //-----------------------------------------------------------
        //move or change the ship or fire the laser
        
        //attack the other bot
        if ( keyPressed == " " ) { 
            
            if(botArray[0].hp > 0 && botArray[1].hp > 0){
                if(botArray[0].attacking != true){
                    //no attacking while you're already attacking!
                    var aiDam =  botArray[0].attack();
                    botArray[1].hp -= aiDam; //ai bot takes the damage of your hit

                    if(botArray[1].hp > 0){
                        //can only attack if it's still alive

                        var hitchance = getRandom(0, 100);
                        //attack the other bot
                        if(level == 1){
                        if(hitchance > 70){
                               //30% chance of this happening
                               var pDam = botArray[1].attack();
                               botArray[0].hp -= pDam; // you take damage from the hit
                           }
                        }
                        else if(level == 2){
                            if(hitchance > 40){
                                //60% chance of this happening
                                var pDam = botArray[1].attack();
                                botArray[0].hp -= pDam; // you take damage from the hit
                            }
                        }
                        else{ //level == 3
                            if (hitchance > 10){
                                //90% chance of this happening
                                var pDam = botArray[1].attack();
                                botArray[0].hp -= pDam; // you take damage from the hit
                            }
                        }
                    }
                }
            }
        }
                
    }//eventKeyDown()

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Clear and Draw Canvas */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    // clear canvas
    function clearCanvas( ) { 
        context.clearRect(0, 0 ,canvasWidth, canvasHeight);
    } //  clearCanvas()
            
    //-----------------------------------------------------------
    //draw the canvas
    function drawCanvas() {
        
        //1. clear the canvas
        clearCanvas( );

        botArray[0].drawSelf();
        botArray[1].drawSelf();
        drawHealth();
       
    } //drawCanvas()

    function drawResults(){
        
        if(botArray[0].hp > botArray[1].hp){
            //player wins
            context.font = "60pt pizzabot";
            context.fillStyle = "rgba(255,255,46,.9)";
            context.fillText("YOU WiN", canvasWidth/4-6,canvasHeight/2);
        }
        else{
            //ai wins
            context.font = "60pt pizzabot";
            context.fillStyle = "rgba(46,255,255,.9)";
            context.fillText("YOU LOSE", canvasWidth/4-6,canvasHeight/2);
        }
        
    }
    function drawHealth(){
       //make a general box @ set spot for each
       //filledness is % of hp left (would be gr8 if boxes could be 100px for 100hp)
       //when they hit thresholds the color changes (it'd be gr8 if I could find code to do this smoother)
        
        phpX = canvasWidth/3;
        phpY = (canvasHeight/5)*4 + 3;
        aihpX = ((canvasWidth/3) * 2) - 35;
        aihpY = phpY;
        
        var pBotgrad = getHealthGrad(botArray[0].hp, phpX, phpY);
        var aiBotgrad = getHealthGrad(botArray[1].hp, aihpX, aihpY);
        
        //draw hp boxes
        context.beginPath();
        context.strokeRect(phpX-1, phpY-1, 101, 32);
        context.strokeRect(aihpX-1, aihpY-1, 101, 32);
        context.closePath();
        
        //draw player's hp
        context.fillStyle = pBotgrad;
        context.fillRect(phpX, phpY, 100, 30);
        
        //draw ai hp
        context.fillStyle = aiBotgrad;
        context.fillRect(aihpX, aihpY, 100, 30);
        
        
        //can't have negaitve health, and the game is basically over now anyway
        if(botArray[0].hp < 0){
            botArray[0].hp = 0;
        }
        if(botArray[1].hp < 0){
            botArray[1].hp = 0;
        }
        
        
        //add hp values
        context.font = "20pt pizzabot";
        context.fillStyle = "rgba(33, 33, 33, 1)";
        context.fillText(botArray[0].hp, phpX +5, phpY + 23);
        context.fillText(botArray[1].hp, aihpX +5, aihpY + 23);
        
        
        
        // draw names below each of the robots
        // so players know which one they are
        context.font = "28pt pizzabot";
        context.fillStyle = "rgba(220, 220, 200, 1)";
        context.fillText("You", phpX, phpY + 63);
        context.fillText(aiNames[aiNameIdx], aihpX, aihpY + 63);
        //faking a text shadow here wooooo!
        context.fillStyle = "rgba(55, 55, 55, 1)";
        context.fillText("You", phpX+2, phpY + 65);
        context.fillText(aiNames[aiNameIdx], aihpX+2, aihpY + 65);
        
        
    }
   
    function getHealthGrad(botHp, x, y){
        var grad;
        //if hp is on a 0-100 scale this works, else we pretend it's a %
        //x and y are paramters so that the gradient will draw within the hp box -- otherwise the gradient doesn't look the same for both
        if (botHp > 90){
            //first grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#00ff00");
            grad.addColorStop(1, "#33ff00");
        }
        else if(botHp > 80){
            //second grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#33ff00");
            grad.addColorStop(.9, "#66ff00");
            grad.addColorStop(1, "rgba(0,0,0,0)");
        }
        else if(botHp > 70){
            //third grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#66ff00");
            grad.addColorStop(.8, "#99ff00");
            grad.addColorStop(.95, "rgba(0,0,0,0)");
        }
        else if(botHp > 60){
            //fourth grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#99ff00");
            grad.addColorStop(.7, "#ccff00");
            grad.addColorStop(.85, "rgba(0,0,0,0)");
        }
        else if(botHp > 50){
            //fifth grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#ccff00");
            grad.addColorStop(.6, "#ffff00");
            grad.addColorStop(.75, "rgba(0,0,0,0)");
        }
        else if(botHp > 40){
            //sixth grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#ffff00");
            grad.addColorStop(.5, "#ffcc00");
            grad.addColorStop(.65, "rgba(0,0,0,0)");
        }
        else if(botHp > 30){
            //seventh grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#ffcc00");
            grad.addColorStop(.4, "#ff9900");
            grad.addColorStop(.55, "rgba(0,0,0,0)");
        }
        else if(botHp > 20){
            //eighth grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#ff9900");
            grad.addColorStop(.3, "#ff6600");
            grad.addColorStop(.45, "rgba(0,0,0,0)");
        }
        else if(botHp > 10){
            //ninth grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#ff6600");
            grad.addColorStop(.2, "#ff3300");
            grad.addColorStop(.35, "rgba(0,0,0,0)");
        }        
        else if(botHp > 0){ //botHp < 10
            //tenth grad
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "#ff3300");
            grad.addColorStop(.1, "#ff0000");
            grad.addColorStop(.25, "rgba(0,0,0,0)");
        }
        else{ //you're dead
            grad = context.createLinearGradient(x, y, x + 100, y + 30);
            grad.addColorStop(0, "rgba(1,1,1, .5)");
            grad.addColorStop(1, "rgba(5,5,5, .7)");
        }
        
        return grad;
    }

    //color num --- 
        //defaults to 1 because that's the first option in the dropdown
        // 1 = turq
        // 5 = yellow
        // 9 = white
        // 13 = bleu
    
    //makeBots
    function makeBots(){
        var pBot = {
            attacking: false,
            hp: 100,
            colorNum: 9,
            headX: canvasWidth/3,
            headY: 40,
            bodyX: 20,
            bodyY: 50,
            larmX: 15,
            larmY: 10,
            rarmX: 10,
            rarmY: 15,
            llegX: 10,
            llegY: 143,
            rlegX: 65,
            rlegY: 143,
            xMove: 3,
            attack: function(){
                //something for the animation of it I guess??
                var goalPos = canvasWidth/3;
                this.attacking = true;
                var damageDone = getRandom(3, 12);
                
                this.xMove = 3;
                this.headX += 4;
                this.bodyX += 4;
                this.larmX += 4;
                this.rarmX += 4;
                this.llegX += 4;
                this.rlegX += 4;
                
                return damageDone;
            },
            makeMove: function(){
                var goalPos = canvasWidth/3; //well this is the head pos  
                if(this.headX > canvasWidth/2){
                    this.xMove *= -1;
                }
                else if(this.headX <= goalPos){
                    this.xMove = 0;
                    this.attacking = false;
                }
                    this.headX += this.xMove;
                    this.bodyX += this.xMove;
                    this.larmX += this.xMove;
                    this.rarmX += this.xMove;
                    this.llegX += this.xMove;
                    this.rlegX += this.xMove;
            },
            adjustBody: function(){
                this.bodyX = this.headX - 5,
                this.bodyY = this.headY + 80,
                this.larmX = this.bodyX + 15,
                this.larmY = this.bodyY + 20,
                this.rarmX = this.bodyX + 38,
                this.rarmY = this.bodyY + 5,
                this.llegX = this.bodyX + 4,
                this.llegY = this.bodyY + 108,
                this.rlegX = this.bodyX + 30,
                this.rlegY = this.bodyY + 108
            },
            drawSelf: function(){
                //figure out which color limb to draw
                //organized this way because I realized there were 4 colors and 4 pieces to the robot, really.
                //works esp. well because background is @ pos 0
                var armIdx = this.colorNum;
                var headIdx = 1 + this.colorNum;
                var legIdx = 2 + this.colorNum;
                var torsoIdx = 3 + this.colorNum;
                
                
                //draw head
                context.drawImage(images[headIdx], this.headX, this.headY, 60, 80);
                
                //draw right arm
                context.drawImage(images[armIdx], this.rarmX, this.rarmY, 90, 30);
                
                //legs go behind the torso so they don't have to align perfectly
                    
                //draw left leg
                context.drawImage(images[legIdx], this.llegX, this.llegY, 30, llegYpos); 
                llegYpos+= .5;
                if (llegYpos > 92){
                    llegYpos -= 12;
                }
                //draw right leg
                context.drawImage(images[legIdx], this.rlegX, this.rlegY, 30, rlegYpos);         
                rlegYpos+= .5;
                if(rlegYpos > 90){
                    rlegYpos -= 12;
                }    
                //draw torso
                context.drawImage(images[torsoIdx], this.bodyX, this.bodyY, 60, 110);
               
                //draw left arm
                context.drawImage(images[armIdx], this.larmX, this.larmY, 90, 30);
            
            }
        }
        
       
        
        var aiBot = {
            attacking: false,
            hp: 100,
            colorNum: 5,
            headX: canvasWidth-canvasWidth/3,
            headY: 40,
            bodyX: 20,
            bodyY: 50,
            larmX: 15,
            larmY: 10,
            rarmX: 10,
            rarmY: 15,
            llegX: 10,
            llegY: 143,
            rlegX: 65,
            rlegY: 143,
            xMove: -3,
            attack: function(){
                //something for the animation of it I guess??
                this.attacking = true;
                this.xMove = -3;
                var damageDone = getRandom(5, 12);
                
                //initial movement so the move function will know what to do
                this.headX += -4;
                this.bodyX += -4;
                this.larmX += -4;
                this.rarmX += -4;
                this.llegX += -4;
                this.rlegX += -4;
                
                return damageDone;
            },
            makeMove: function(){
                var goalPos = canvasWidth-canvasWidth/3; //well this is the head pos  
                if(this.headX < canvasWidth/2){
                    this.xMove *= -1;
                }
                else if(this.headX >= goalPos){
                    this.xMove = 0;
                    this.attacking = false;
                }
                    this.headX += this.xMove;
                    this.bodyX += this.xMove;
                    this.larmX += this.xMove;
                    this.rarmX += this.xMove;
                    this.llegX += this.xMove;
                    this.rlegX += this.xMove;
            },
            takeDamage: function(){
                
                 ///////////// -------------------------------
                //the parameter stiuation is less than workinng rihgt nwo
                
                this.hp -= amt;
            },
                        adjustBody: function(){
                this.bodyX = this.headX + 5,
                this.bodyY = this.headY + 80,
                this.larmX = this.bodyX - 55,
                this.larmY = this.bodyY + 20,
                this.rarmX = this.bodyX - 35,
                this.rarmY = this.bodyY + 5,
                this.llegX = this.bodyX + 4,
                this.llegY = this.bodyY + 108,
                this.rlegX = this.bodyX + 30,
                this.rlegY = this.bodyY + 108
            },
            drawSelf: function(){
                //figure out which color limb to draw
                //organized this way because I realized there were 4 colors and 4 pieces to the robot, really.
                //works esp. well because background is @ pos 0
                var armIdx = this.colorNum + 16;
                var headIdx = 1 + this.colorNum + 16;
                var legIdx = 2 + this.colorNum + 16;
                var torsoIdx = 3 + this.colorNum + 16;
                
                 //ai bot color numbers:
                    // t = 17       (1)
                    // y = 21       (5)
                    // w = 25       (9)
                    // b = 29       (13)
                
                //draw head
                context.drawImage(images[headIdx], this.headX, this.headY, 60, 80);
                
                //draw right arm
                context.drawImage(images[armIdx], this.rarmX, this.rarmY, 90, 30);
                
                //legs go behind the torso so they don't have to align perfectly
                    
                //draw left leg
                context.drawImage(images[legIdx], this.llegX, this.llegY, 30, llegYpos);                
                //draw right leg
                context.drawImage(images[legIdx], this.rlegX, this.rlegY, 30, rlegYpos);         
                
                //draw torso
                context.drawImage(images[torsoIdx], this.bodyX, this.bodyY, 60, 110);
               
                //draw left arm
                context.drawImage(images[armIdx], this.larmX, this.larmY, 90, 30);
            
            }
            
        }
        
        botArray.push(pBot);
        botArray.push(aiBot);
    }
    
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    // Game Loop
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    
    // is the game over?
    function isGameOver(){
        if(botArray[0].hp <= 0 || botArray[1].hp <= 0){
            if(botArray[0].hp  > 0 && updatedTally == false){
                gameswon ++;
                updatedTally = true;
            }
            if(botArray[1].hp > 0 && updatedTally == false){
                gameslost++;
                updatedTally = true;
            }
            
            return true;
        }
        else{
            return false;
        }
    }    
    
    //-----------------------------------------------------------
    // the game loop
    function gameLoop() {
        //should stop the game if it's over
            //request the next animation frame
            requestAnimationFrame( gameLoop );
            
            //do the bots need to move? get on that
            if(botArray[0].attacking == true){
                botArray[0].makeMove();
            }
            if(botArray[1].attacking == true){
                botArray[1].makeMove();
            }
            //draw the canvas
            drawCanvas();
            gameOver = isGameOver();
            if(gameOver){
                drawResults();
                changeScore();
                console.log("Games Won: " + gameswon + " Games Lost: " + gameslost);
        }
    } // gameLoop()

    //-----------------------------------------------------------
    //load the images and then call gameLoop()
    loadImages( images, imageSources, function(images) {         
        
        //message so we know the images loaded 
        console.log( "images loaded");
        
        
        //call game loop
       // gameLoop();
        
    });    

} //canvasApp()
//-----------------------------------------------------------
