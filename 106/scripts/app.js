


// Global variables
var visible = false;
var color = false;

//Cache DOM with an Object
var UI = {};


// Function for the button. Better than an inline anny function
function showDetails(){
    console.log("btn clicked!");

    // Show details
    if(!visible){
        // Show details class on click
        UI.$secForm.removeClass('invisible');
        UI.$btnShow.text('Hide Details');

        // change boolean
        visible = true;
    }
    else{ //Hide details
        UI.$secForm.addClass('invisible');
        UI.$btnShow.text('Show Details');

        // change boolean
        visible = false;
    }
}

// Change 'details button' color when clicked
function changeColors(){

    console.log("btnColor clicked");

    if(!color){
        UI.$btnColor.removeClass('btn-secondary');
        UI.$btnColor.addClass('btn-danger');
        color = true;
    }
    else{
        UI.$btnColor.removeClass('btn-danger');
        UI.$btnColor.addClass('btn-secondary');
        color = false;
    }
}


function init(){
    console.log("main page");

    // user interface Object! Only caches the DOM once
    UI = {
        $btnShow: $('#btnShow'),
        $btnColor: $('#btnColor'),
        $secForm: $('#secForm')
    };

    // Get data from servers

    // hook (setUp) events 
        // button event. Function written
        UI.$btnShow.click(showDetails);
        UI.$btnColor.click(changeColors);
    // Set the text of the an input field
    $input = $('#txtTitle').val("Katelynn Heasley");

}

window.onload = init;