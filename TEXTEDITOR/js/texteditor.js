
$(document).ready(function(){

    $( "#textarea" ).keyup(function() {
        stateChange();
      });

})

function newFile()
{

   var txt;
	var text = $("#textarea").html();
    if (text.length > 0)
	{
		 if (confirm("Do you want to save?")) {
			saveFile();
			document.getElementById("textarea").innerHTML="";
		}
		else
		{
			document.getElementById("textarea").innerHTML="";
		}
	}
}
function readFile(file) {
      var reader = new FileReader();
      reader.onload = readSuccess;
      function readSuccess(evt) {
          document.getElementById("textarea").value = evt.target.result;
      };
      reader.readAsText(file);
  }

function openFile()
{
  $('#selectedFile').trigger('click');
}

function saveFile()
{
    var text = $("#textarea").html();
    if (text.length > 0)
    {
        downloadFile(text, "NewTextDocument.txt", "text/plain;charset=utf-8");
        $('#saveTaskModal').modal()
    }
}

function downloadFile(filedata, filename, filetype) {
    var file = new Blob([filedata], {type: filetype});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        var temp_anchor = document.createElement("a"),
                url = URL.createObjectURL(file);
        temp_anchor.href = url;
        temp_anchor.download = filename;
        document.body.appendChild(temp_anchor);
        temp_anchor.click();
        setTimeout(function() {
            document.body.removeChild(temp_anchor);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

/*Code for cut and copy operation - start*/
//global variable to hold the cut or copied text
var strVariable="";
//function to copy text on click of copy button
function copy(){
  var selectedText = "";
  if (window.getSelection){
      selectedText = window.getSelection().toString();
  }
  strVariable=selectedText;
// var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand("copy"); // run command to copy selected text to clipboard
  } catch(e){
      copysuccess = false;
  }
}
//function to cut text on click of cut button
function cut(){
  var selectedText = "";
  if (window.getSelection){
      selectedText = window.getSelection().toString();
  }
  strVariable=selectedText;
  // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand("cut"); // run command to cut selected text to clipboard
  } catch(e){
      copysuccess = false;
  }
}
/* Code for cut and copy operation-end*/
/*Code for Undo/Redo operations*/
var pastUndo =[];
var futureRedo =[];
/* Disable buttons on load */
function buttondisable()
{
document.getElementById("undoBtn").disabled = true;
document.getElementById("redoBtn").disabled = true;
}
/* Function to perform the undo operation*/
function undoAction() {
    var acutualelemnt ="";
    if(pastUndo.length > 0)
    {
        acutualelemnt = pastUndo.pop(); //Taking out the last added item from past array
        futureRedo.push(acutualelemnt); //Added to the future array for redo operation
        document.getElementById("redoBtn").disabled = false;
        
        document.getElementById("textarea").innerHTML = "";
        if(acutualelemnt != undefined)
        {
            document.getElementById("textarea").innerHTML = acutualelemnt;
        }
    }
    else if(pastUndo.length ==0)
    {
        document.getElementById("textarea").innerHTML = "";
        document.getElementById("undoBtn").disabled = true;
    }
}
/* Function to check the changes within the text area*/
function stateChange()
{
    var currHtml = "";
    currHtml = document.getElementById("textarea").innerHTML;
    pastUndo.push(currHtml); //Each change will be added to the past array
    if(pastUndo.length >0)
    {
        document.getElementById("undoBtn").disabled = false;
    }
}
/* Function to perform the redo operation*/
function redoAction() {
    var acutualdata = "";
    if(futureRedo.length > 0)
    {
    acutualdata = futureRedo.pop();
    pastUndo.push(acutualdata);
    document.getElementById("undoBtn").disabled = false;
    document.getElementById("textarea").innerHTML = "";
    document.getElementById("textarea").innerHTML = acutualdata;
    }
    else{
        document.getElementById("redoBtn").disabled = true;
    }
}
/*Code for Undo/Redo operations*/


function searchButtonClicked() {
    var searchStr = $("#searchTxtBox").val();
    console.log(searchStr);
}

/* Code for Subscript*/

function subScript(){
  var selectedText = "";
  if (window.getSelection){
      selectedText = window.getSelection().toString();
  }
  strVariable=selectedText;
  // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand( "subscript"); // executable command to make the selected text as sub script.
  } catch(e){
      copysuccess = false;
  }
}

/* Code for Uppercase */
function upperCase(){
  var selectedText = "";
  if (window.getSelection){
      selectedText = window.getSelection().toString();
  }
  strVariable=selectedText;
  // var to check whether execCommand successfully executed
  var copysuccess = [];
  var res;
  try{
	  console.log("entered");
	 currHtml = document.getElementById("textarea").innerHTML;
	 console.log(currHtml);
     copysuccess = strVariable.toUpperCase(); // executable command to make the selected text as uppercase.
	 console.log(copysuccess);
	res = currHtml.replace(selectedText, copysuccess)
	document.getElementById("textarea").innerHTML = res;
	console.log(res);
}
  catch(e){
      copysuccess = false;
  }
}


/* Code for Lowercase */

function lowerCase(){
  var selectedText = "";
  if (window.getSelection){
      selectedText = window.getSelection().toString();
  }
  strVariable=selectedText;
  // var to check whether execCommand successfully executed
  var copysuccess = [];
  var res;
  try{
	  console.log("entered");
	 currHtml = document.getElementById("textarea").innerHTML;
	 console.log(currHtml);
     copysuccess = strVariable.toLowerCase(); // executable command to make the selected text as lowercase.
	 console.log(copysuccess);
	res = currHtml.replace(selectedText, copysuccess)
	document.getElementById("textarea").innerHTML = res;
	console.log(res);
}
  catch(e){
      copysuccess = false;
  }
}






