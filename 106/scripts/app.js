
// Global variables
var visible = false;
var important = false;
var alert = false;
var showIcon = `<i class="far fa-eye"></i>`;
var hideIcon = `<i class="far fa-minus-square"></i>`;
var nonActive = `<i class="far fa-star"></i>`;
var active = `<i class="fas fa-star"></i>`;
var alertI = `<i class="fas fa-bell"></i>`;
var nonAlert = `<i class="far fa-bell"></i>`;
var taskList = [];

//Cache DOM with an Object
var UI = {};


// Function for the button. Better than an inline anny function
function showDetails(){
    console.log("btn clicked!");

    // Show details
    if(!visible){
        // Show details class on click
        UI.$secForm.removeClass('invisible');
        UI.$btnShow.html( hideIcon + 'Hide Details');

        // change boolean
        visible = true;
    }
    else{ //Hide details
        UI.$secForm.addClass('invisible');
        UI.$btnShow.html(showIcon + 'Show Details');

        // change boolean
        visible = false;
    }
}

// Change 'important button' when clicked
function toggleImportant(){

    console.log("btnImportant clicked");

    if(!important){
        UI.$btnImportant.removeClass("far active");
        UI.$btnImportant.addClass('fas');
        important = true;
    }
    else{
        UI.$btnImportant.removeClass('fas');
        UI.$btnImportant.addClass("far");
        important = false;
    }
}

// Change 'alert button' when clicked
function toggleAlert(){

    console.log("btnAlert clicked");

    if(!alert){
        UI.$btnAlert.removeClass("far");
        UI.$btnAlert.addClass('fas');
        alert = true;
    }
    else{
        UI.$btnAlert.removeClass('fas');
        UI.$btnAlert.addClass("far");
        alert = false;
    }
}

// Function to save a Task from User input
function saveTask(){
    var title = UI.$txtTitle.val();
    var date = UI.$txtDate.val();
    var desc = UI.$txtDescription.val();
    var location = UI.$txtLocation.val();

    // Create task object
    var task = new Task(title, important, date, desc, alert, location);

    //Push into task array
    taskList.push(task);

    // clear the form
    clearForm();
    console.log(taskList);
}

//Function to clear form
function clearForm(){

    //Find all my form values and clear them!
    $(".control").val('');

        //Mark icons as not important
        UI.$btnImportant.removeClass("fas");
        UI.$btnImportant.addClass('far');
        important = false;

        UI.$btnAlert.removeClass('fas');
        UI.$btnAlert.addClass("far");
        alert = false;
}

function init(){
    console.log("main page");

    // user interface Object! Only caches the DOM once
    UI = {
        $btnShow: $('#btnShow'),
        $btnImportant: $('#btnImportant'),
        $secForm: $('#secForm'),
        $btnSave: $('#btnSave'),
        $txtTitle: $('#txtTitle'),
        $txtDate: $('#txtDate'),
        $txtDescription: $('#txtDescription'),
        $btnAlert: $('#btnAlert'),
        $txtLocation: $('#txtLocation'),
    };

    // Get data from servers
    // hook (setUp) events 
        // button event. Function written
        UI.$btnShow.click(showDetails);
        UI.$btnImportant.click(toggleImportant);
        UI.$btnAlert.click(toggleAlert);
        UI.$btnSave.click(saveTask);

}

window.onload = init;