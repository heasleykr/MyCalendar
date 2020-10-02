
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
        UI.$secForm.removeClass('hide');
        UI.$btnShow.html( hideIcon + 'Hide Details');

        // change boolean
        visible = true;
    }
    else{ //Hide details
        UI.$secForm.addClass('hide');
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


    //Parsify this Task Object to string. 
    // var data = JSON.stringify(task);
    //http request 
   // save the task on the backend
   // 'send Task Object to our server database
   $.ajax({
       // Url is always a string type
       url: 'http://fsdi.azurewebsites.net/api/tasks',
       //POST b/c we're sending and recieving data
       type: 'POST',
       // data to be sent. Parse to string. 
       data: JSON.stringify(task),

       //Always used with 'data' to specify what type
       contentType: "application/json",
       success: function(res){
           //print our server repsponse
            console.log(res);
            //show success to user
            $('#alertSuccess').removeClass('hide');

            //set a timer(mili) to remove 
            setTimeout(function(){
                //hide success to user
                $('#alertSuccess').addClass('hide');
            } , 3000);
       },
       error: function(details){
           //print if error 
            console.log("Error :(", details);
       }


   });

   //show success to user
   $('#alertSuccess').removeClass('hide');

}

// Function to request info, using Ajax, from server
function testGet(){
        // Ajax expects an object with configuration 
    $.ajax({

        //This Url is where the server is AT/Located 
        url: 'http://restclass.azurewebsites.net/api/test',
        // You must specifiy type
        type: 'GET',

        //Paramater is the 'response' from the server. 
        // Success means you're getting info back from server!!
        //Conventionally it's a 'res'
        success: function(response){
            //Do this on success
            console.log("req success", response);
        },

        //Parameter is the Error details!
        error: function(details){
            //Do this on Error
            console.log("Error :(", details);
        }


    });

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