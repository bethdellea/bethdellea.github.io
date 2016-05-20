/*
    canvas-animation.js
    
    my lovely fish tankkkkkkkk
    
*/

//When the page has fully loaded, execute the eventWindowLoaded function
window.addEventListener("load",eventWindowLoaded, false);

//-----------------------------------------------------------
//eventWindowLoaded()
//Called when the window has been loaded it then calls the canvasapp() 
function eventWindowLoaded() {
    canvasApp();	
} // eventWindowLoaded()

//-----------------------------------------------------------
//canvasSupport() 
//Check for Canvas Support using modernizr.js
function canvasSupport() {
    return Modernizr.canvas;	
} // canvasSupport()

//-----------------------------------------------------------
//canvasApp() 
//The function where ALL our canvas code will go
function canvasApp() {

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Support */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */    
    
    //-----------------------------------------------------------
    //Check to see if the canvas has a context 
    if (!canvasSupport()) {
        return;	//Canvas not supported so exit the function
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */    

    //-----------------------------------------------------------
    //Setup the canvas object
    var theCanvas = document.getElementById("myCanvas"); //get the canvas element
    var context = theCanvas.getContext("2d");  //get the context
    var canvasHeight = theCanvas.height; //get the heigth of the canvas
    var canvasWidth = theCanvas.width;  //get the width of the canvas
    
    var images = [];
    var imageSources = [
        "./images/underDaSea.jpg", //background image
        //fish image
        "./images/fish1R.png",
        "./images/fish2R.png",
        "./images/fish3R.png",
        "./images/fish4R.png",
        "./images/fish5R.png",
        "./images/fish6R.png",
        "./images/fish7R.png",
        "./images/fish8R.png",
        "./images/fish9R.png",
        "./images/fish10R.png", //index 10
        "./images/fish1.png",
        "./images/fish2.png",
        "./images/fish3.png",
        "./images/fish4.png",
        "./images/fish5.png",
        "./images/fish6.png",
        "./images/fish7.png",
        "./images/fish8.png",
        "./images/fish9.png",
        "./images/fish10.png" //index 20
    ]
    
    var fishes = [];
    
    var numFish = 1; //the number that will appear
    
    var foodPellets = [];
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    
    // loadImages()
    // load all the images
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
                };
            }
            //set the image source
            images[src].src = imageSources[src];
        } //for
      } //loadimages()
            
    
    /* Utility Fuctions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */    
    
    // -----------------------------------------------------------
    //function for getting a random number with in a range	
    function getRandom (min, max) {
        returnable = Math.floor( Math.random() * (max - min) + min );
        while(returnable == 0){
            //edited because 0 moevemet in x or y was annoying me
            //generates new numbers until the number generated is no longer 0
          returnable = Math.floor( Math.random() * (max - min) + min );  
        }
        return returnable;
    }//getRandom

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Event Handlers */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Clear and Draw Canvas */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
//if the fish hit each other, they'll move away from each other
    //-----------------------------------------------------------
    // clear canvas
    function clearCanvas( ) {  
        
        context.drawImage(images[0], 0, 0, canvasWidth, canvasHeight);
       
    } //  clearCanvas()
    
    //-----------------------------------------------------------
    //draw the canvas
    function drawCanvas() {
        
        //clear the canvas
        clearCanvas(  );
        for (var i = 0; i < fishes.length; i++){

            fishes[i].drawSelf();
            fishes[i].swim();
            if(foodPellets){
                collide = fishes[i].collisionCheck();
                if(collide >= 0){
                    foodPellets.splice(collide, 1);
                }
            }
        }
        if(foodPellets){
            for (var i = 0; i < foodPellets.length; i++){
                foodPellets[i].drawSelf();
                foodPellets[i].moveSelf();
            }
            
        }

    } //drawCanvas()
        
    
    
    //placeFish
    function makeFish(num2make){
        for (var i = 0; i < num2make; i ++){
            indx = numFish + i;
            imW=getRandom(50, 130);
            imH=getRandom(30, 110);
            imX=canvasWidth/2 + imW/2;//getRandom(0, canvasWidth-imW);
            imY= 0;//getRandom(0, canvasHeight-imH);
            mX=getRandom(-3, 3);
            mY=getRandom(-2, 2);
            console.log("imX: " + imX + "\timY: " + imY);
            var fish = {
                imgIndex:indx,
                imgW:imW,
                imgH:imH,
                x:imX,
                y:imY,
                moveX:mX,
                moveY:mY,
                initialCheck: function()
                {
                    if(this.moveX < 0){
                        this.imgIndex += 10;
                    }
                    
                },
                drawSelf: function()
                {
                    context.drawImage(images[this.imgIndex], this.x, this.y, this.imgW, this.imgH);
                    
                },
            
                swim: function()
                {
                    if(this.x + this.imgW + this.moveX > canvasWidth){
                        this.imgIndex += 10;
                        this.moveX *= -1;
                        console.log("image index: " + this.imgIndex);                        
                    }
                    if( this.x + this.moveX < 0){
                        this.imgIndex -= 10;
                        console.log("image index: " + this.imgIndex);
                        this.moveX *= -1;
                    }
                    if(this.y + this.imgH + this.moveY > canvasHeight || this.y + this.moveY < 0){
                        this.moveY *= -1;
                    }
                    this.x += this.moveX;
                    this.y += this.moveY;
                },
                collisionCheck: function(){
                    //collision detection code
                    for(var i = 0; i < foodPellets.length; i++){
                        if ((foodPellets[i].x >= this.x) && (this.x + this.imgW >= foodPellets[i].x + foodPellets[i].r) && (this.y <= foodPellets[i].y) && (this.y + this.imgH >= foodPellets[i].y + foodPellets[i].r)){
                            if(this.imgH < canvasHeight/3 && this.imgW < canvasWidth/3){
                                this.imgH ++;
                                this.imgW++;
                            }
                        return i;
                        }
                    }
                   return -1;
                }
                
            }
            fish.initialCheck(); //make sure it's facing its move direction
            fishes.push(fish);
        }
    
    }
    
    function makeFood(){
        var foodcolor = ["rgba(212,191,144,.9)", "rgba(111, 201, 144, .9)", "rgba(200, 221, 182, .9)"]
        //create the food pellets
        for (var i = 0; i < 6; i++){
            imX=canvasWidth/2; //getRandom(0, canvasWidth-imW);
            imY= 0;//getRandom(0, canvasHeight-imH);
            imR = getRandom(2, 5);
            mX= (Math.random() * 10) % 5 - i;
            mY= getRandom(0,3);
            var food = {
                colornum:i,
                movX:mX,
                r:imR,
                x:imX,
                y:imY,
                movY:mY,
                drawSelf: function(){
                    context.beginPath();
                    context.arc(this.x, this.y, this.r*2, 0, Math.PI*2);
                    context.fillStyle = foodcolor[this.colornum % foodcolor.length];
                    context.fill();
                    context.closePath();
                },
                moveSelf: function(){
                    if(this.x + this.movX - this.r*2 > 0 && this.x + this.movX + this.r*2 < canvasWidth){
                        this.x+= this.movX;
                    } else{
                        this.movX = 0;
                    }
                   if(this.y + this.movY + this.r * 2 < canvasHeight){
                       this.y += this.movY;
                   }
                    else{
                        this.movY = 0;
                        this.movX = 0;
                    }
                }
                
            }
            foodPellets.push(food);
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Game Loop */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    
    // -----------------------------------------------------------
    // the game loop
    function gameLoop() {
       // console.log( 'in gameLoop()');
        
        requestAnimationFrame( gameLoop );
        drawCanvas();
        
    }//gameLoop()
    
    // -----------------------------------------------------------
    
    
    loadImages(images, imageSources, function(images){
        var numFrame = 0;
    //start the game loop
         makeFish(numFish);
        gameLoop();
    });
    
    // event listeners
    feedFish.addEventListener("click", eventFeedFish,true);
    addFish.addEventListener("click",eventAddFish, true);
    remFish.addEventListener("click", eventRemFish, true);
    

    function eventFeedFish( e ) {
        
        makeFood();
        
    }
    
    function eventAddFish( e ){
        if(numFish < 10){
            numFish ++;
            makeFish(1);
        }
        
    }
    
    function eventRemFish( e ){
        if(numFish > 0){
            fishes.pop();
            numFish --;
        }
        
    }
    
} //canvasApp()

