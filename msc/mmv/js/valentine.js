/*
    canvas-animation.js
    
    my lovely valentine makerrrrrrrrr
    
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
    
    var bgIdx;
    var backgrounds = [];
    var images = [];
    //var messages = [];
    var bgSources = [
        "./images/bgs/color1.png",
        "./images/bgs/color2.png",
        "./images/bgs/color3.png",
        "./images/bgs/color4.png",
        "./images/bgs/color5.png",
        "./images/bgs/color6.png",
        "./images/bgs/color7.png",
        "./images/bgs/color8.png",
        "./images/bgs/color9.png",
        "./images/bgs/color10.png",
        "./images/bgs/color11.png",
        "./images/bgs/color12.png",
        "./images/bgs/color13.png",
        "./images/bgs/color14.png",
        "./images/bgs/color15.png",
        "./images/bgs/color16.png",
        "./images/bgs/color17.png",
        "./images/bgs/color18.png",
        "./images/bgs/color19.png",
        "./images/bgs/color20.png",
        "./images/bgs/extracolor1.png",
        "./images/bgs/extracolor2.png",
        "./images/bgs/extracolor3.png",
        "./images/bgs/extracolor4.png",
        "./images/bgs/extracolor5.png",
        "./images/bgs/extracolor6.png"
    ]
    
    var imageSources = [
        "./images/clips/bemineheart.png",
        "./images/clips/flatStar.png",
        "./images/clips/heart3d.png",
        "./images/clips/kissmeheart.png",
        "./images/clips/romance1.png",
        "./images/clips/romance2.png",
        "./images/clips/romance3.png",
        "./images/clips/romance4.png",
        "./images/clips/romance5.png",
        "./images/clips/romance6.png",
        "./images/clips/romance7.png", 
        "./images/clips/romance8.png",
        "./images/clips/romance9.png",
        "./images/clips/romance10.png",
        "./images/clips/romance11.png",
        "./images/clips/romance12.png",
        "./images/clips/romance13.png",
        "./images/clips/romance14.png",
        "./images/clips/romance15.png",
        "./images/clips/romance17.png",
        "./images/clips/romance25.png",
        "./images/clips/romance26.png",
        "./images/clips/romance27.png",
        "./images/clips/romance28.png",
        "./images/clips/romance29.png",
        "./images/clips/romance30.png",
        "./images/clips/xoheart.png"

    ]

    var decs = [];
    var msgs = [];
    var numDecs = 1; //the number that will appear
    var numMsgs = 0;
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
            
    function loadBg( backgrounds, bgSources, callback ) {
        var loadedImages = 0;
        
        // for each imageSource
        for ( var src = 0; src < bgSources.length; src++ ) {
            //create a new image object
            backgrounds[src] = new Image();
            
            //load the image 
            backgrounds[src].onload = function() {
                if( ++loadedImages >= bgSources.length ) {
                    callback( backgrounds );
                };
            }
            //set the image source
            backgrounds[src].src = bgSources[src];
        } //for
      } //loadBg()
            
    /* Utility Fuctions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */    
    
    // -----------------------------------------------------------
    //function for getting a random number with in a range	
    function getRandom (min, max) {
        returnable = Math.floor( Math.random() * (max - min) + min );
       /* while(returnable == 0){
            //edited because 0 movemet in x or y was annoying me
            //generates new numbers until the number generated is no longer 0
          returnable = Math.floor( Math.random() * (max - min) + min );  
        } */
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
        
        context.drawImage(backgrounds[bgIdx], 0, 0, canvasWidth, canvasHeight);
       
    } //  clearCanvas()
    
    //-----------------------------------------------------------
    //draw the canvas
    function drawCanvas() {
        
        //clear the canvas
        clearCanvas(  );
        for (var i = 0; i < decs.length; i++){

            decs[i].drawSelf();
           
        } //unFortunately this leaves messages always on top of images. it'll do.
        for (var i = 0; i < msgs.length; i++){
            msgs[i].drawSelf();
        }
        
    } //drawCanvas()
        
    
    
    //make & place decorations
    function makeDec(num2make){
        for (var i = 0; i < num2make; i ++){
            indx = getRandom(0,images.length);
            imW = getRandom(50, 130);
            imH = getRandom(30, 110);
            imX = getRandom(0, canvasWidth-imW);
            imY = getRandom(0, canvasHeight-imH);
            var dec = {
                imgIndex:indx,
                imgW:imW,
                imgH:imH,
                x:imX,
                y:imY,
               
                drawSelf: function()
                {
                    context.drawImage(images[this.imgIndex], this.x, this.y, this.imgW, this.imgH);
                }
            }            
            decs.push(dec);
        }
    
    }
    
    function makeMsg(msg){
        //get message color
        //get message font size
        //idk what else
        var r = getRandom(0, 255);
        var g = getRandom(0, 255);
        var b = getRandom(0, 255);
        var color = "rgb("+r+","+g+","+b+")";
        var lum = (0.2126*r + 0.7152*g + 0.0722*b);
        if(lum > .5){ var shadow = "#3a3a3a";}
        else{
            var shadow = "#aaa";
        }
        var size = getRandom(25, 100);
        var message = {
            msgCol: color,
            msgShadow: shadow,
            msgSz: size,
            text: msg,
            x: getRandom(0, canvasWidth - context.measureText(this.text).width + 6),
            y: getRandom(55, canvasHeight-15),
            getWidth: function(){
              var txtWdth =  context.measureText(this.text).width;
                if(this.x + txtWdth > canvasWidth){
                    this.x = canvasWidth - txtWdth - 3;
                }
            },
            drawSelf: function(){
                context.font = this.msgSz + "px Comic Sans MS";
                context.fillStyle = this.msgShadow;
                this.getWidth();
                context.fillText(this.text, this.x+2, this.y+2);
                context.fillStyle = this.msgCol;
                context.fillText(this.text, this.x, this.y);
                
            }
        }
        msgs.push(message);
        
        
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
    
    loadBg(backgrounds, bgSources, function(){
        
        bgIdx = getRandom(0, backgrounds.length);
    });
    loadImages(images, imageSources, function(images){
        var numFrame = 0;
        drawCanvas();
        //gameLoop();
    });
    
    // event listeners
    addDec.addEventListener("click",eventAddDec, true);
    remDec.addEventListener("click", eventRemDec, true);
    addMsg.addEventListener("click", eventAddMsg, true);
    remMsg.addEventListener("click", eventRemMsg, true);
    saveCanvas.addEventListener("click", eventSavePic, true);
    editMore.addEventListener("click", eventMoreEdits, true);
    
    function eventSavePic( e ){
        
        var img = theCanvas.toDataURL("image/png");
       

        window.open( img,   '_blank' );


        theCanvas.classList.add("hidden");
        saveCanvas.classList.add("hidden");
    }
    
    function eventMoreEdits( e ){
        
        theCanvas.classList.remove("hidden");
        saveCanvas.classList.remove("hidden");
        editMore.classList.add("hidden");
    }
    
    function eventAddMsg( e ){
        numMsgs++;
        var mess = document.getElementById("valMsg").value;
        makeMsg(mess);
        drawCanvas();
    }
    
    function eventRemMsg( e ){
        if(numMsgs > 0){
            msgs.pop();
            numMsgs--;
            drawCanvas()
        }
        
    }
    
    function eventAddDec( e ){
            numDecs++;
            makeDec(1);
            drawCanvas();
        
    }
    
    function eventRemDec( e ){
        if(numDecs > 0){
            decs.pop();
            numDecs --;
            drawCanvas();
        }
        
    }
    
} //canvasApp()

