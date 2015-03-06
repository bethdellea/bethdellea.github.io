$(document).ready(function () {
    var buttontext = "";
    var placetext = "<p class=\"temp\">000-000-0000</p>";
    //var numclicks = 0;
    $('.keypad').on('click',function(){
            //use # to clear the box and re-type your number
        if ($(this).html()=="#"){
            buttontext = "";
            $('#displayBox').html(placetext);
        } else{
            //if (numclicks < 10) {
            if (buttontext.length < 12) {
                if (buttontext.length==3 || buttontext.length ==7){
                    //automatically add dashes where appropriate for a USA phone number
                    buttontext = buttontext +"-"+ $(this).html();
                    $('#displayBox').html("<p>"+buttontext+"</p>");
                } else{
                    buttontext = buttontext + $(this).html();
                    $('#displayBox').html("<p>"+buttontext+"</p>");
                }
            } else {
                //if a "full-length" number, simulate dialing if * is pressed
                if ($(this).html()=="*" && buttontext.length == 12){
                    alert('Dialing....');
                } else{               
                alert('This is too many digits to be a valid phone number!');
                }
            }
        }
    });

});