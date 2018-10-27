$(document).ready(function(){
    $('#textarea').keyup(function(){
        stateChange();
    });
/* Document preview functionality */
    var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("previewBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    values = document.getElementById("textarea").innerHTML;
    chk = document.getElementById("textarea").innerText;
    if(chk != "" && chk != null)
    {
        document.getElementById("cnt").innerHTML = values;
        modal.style.display = "block";
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
})

$(document).ready(function(){

    $( "#textarea" ).keyup(function() {
        stateChange();
      });

})

var isSearchTrigger = false
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
          document.getElementById("textarea").innerHTML = evt.target.result;
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
  Charactercount();  // function call for character count
    Wordcount(); //function call for word count
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
    Charactercount();  // function call for character count
    Wordcount(); //function call for word count
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
    Charactercount();  // function call for character count
    Wordcount(); //function call for word count
}

/* Function to perform the character count operation*/
function Charactercount()
{
    var countValue= 0;
    countValue = document.getElementById("textarea").innerText.length;
    document.getElementById("charcount").innerText = countValue;
}

/* Function to perform the word count operation*/
function Wordcount()
{
    var wordcountvalue = 0;
    s = document.getElementById("textarea").innerText;
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    wordcountvalue = s.split(' ').length;
	document.getElementById("wordcount").innerHTML = wordcountvalue;
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
    Charactercount();  // function call for character count
    Wordcount(); //function call for word count
}
/*Code for Undo/Redo operations*/

function searchButtonClicked() {
    var searchStr = $("#searchTxtBox").val();
}

function superScript(){
    var selectedText = "";
  if (window.getSelection){
      selectedText = window.getSelection().toString();
  }
  strVariable=selectedText;
  // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand( "superscript"); // executable command to make the selected text as super script.
  } catch(e){
      copysuccess = false;
  }
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

function leftAlign(){
  // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand( "justifyLeft"); // DOM executable command to align the text to the LEFT.
  } catch(e){
      copysuccess = false;
  }
}

function rightAlign(){
   // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand( "justifyRight"); // DOM executable command to align the text to the RIGHT.
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
	 currHtml = document.getElementById("textarea").innerHTML;
     copysuccess = strVariable.toUpperCase(); // executable command to make the selected text as uppercase.
	res = currHtml.replace(selectedText, copysuccess)
	document.getElementById("textarea").innerHTML = res;
}
  catch(e){
      copysuccess = false;
  }
}

function centerAlign(){
  // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand( "justifyCenter"); // DOM executable command to align the text to the CENTER.
  } catch(e){
      copysuccess = false;
  }
}

function Justify(){
  // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand( "justifyFull"); // DOM executable command to justify the full text.
  } catch(e){
      copysuccess = false;
  }
}

function Outdent(){
  // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand( "outdent"); // DOM executable command to outdent the selected text.
  } catch(e){
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
	 currHtml = document.getElementById("textarea").innerHTML;
     copysuccess = strVariable.toLowerCase(); // executable command to make the selected text as lowercase.
	res = currHtml.replace(selectedText, copysuccess)
	document.getElementById("textarea").innerHTML = res;
}
  catch(e){
      copysuccess = false;
  }
}

function Indent(){
  // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand( "indent"); // DOM executable command to outdent the selected text.
    } catch(e){
        copysuccess = false;
    }
  }

/* Code for bullet points*/

function bulletPoints(){
  var selectedText = "";
  if (window.getSelection){
      selectedText = window.getSelection().toString();
  }
  strVariable=selectedText;
  // var to check whether execCommand successfully executed
  var copysuccess;
  try{
      copysuccess = document.execCommand( "insertUnorderedList"); // executable command to make the selected text as bullet.
  } catch(e){
      copysuccess = false;
  }
}

/*Functions for find task*/
function highlightHelper(){
  var searchText=$("#findText").val();
  if(searchText==="" || searchText===undefined || searchText===null){
    alert("Please enter some text in the find area");
  }else{
    if($("#textarea").html()==="" || $("#textarea").html()===undefined || $("#textarea").html()===null){
      alert("Please enter some text in the text area");
    }else{
      highlightAll(searchText);
    }
  }
}

function highlightAll(searchText){
  var regExp=new RegExp(searchText,"g");
  $("#textarea").html(function() {
      return $(this).html().replace(regExp, '<span class="highlight">' + searchText + '</span>');
  });
  document.getElementById("textarea").addEventListener("click", function() {
    removehighlightAll(searchText);
  }, {once : true});
}

function removehighlightAll(searchText){
  var regExp=new RegExp('<span class="highlight">' + searchText + '</span>',"g");
  $("#textarea").html(function() {
      return $(this).html().replace(regExp, searchText);
  });
}


/*Function to hide the "placeholder" text when div contains user-supplied text */
(function ($) {
	$(document).on('change keydown keypress input', 'div[data-placeholder]', function() {
		if (this.textContent) {
			this.dataset.divPlaceholderContent = 'true';
		}
		else {
			delete(this.dataset.divPlaceholderContent);
		}
	});
})(jQuery);

function searchButtonClicked() {
    var searchQuery = $("#searchTxtBox").val();
    remove_highlight();
    isSearchTrigger = false;
    if (searchQuery.length > 0) {
        isSearchTrigger = true;
        highlight(searchQuery);
    }
}

function highlight(text) {
    $("#textarea").html($("#textarea").html().replace(new RegExp(text, 'g'), "<span class='highlight'>" + text + "</span>" ));
}

function remove_highlight() {
    $("#textarea").html($("#textarea").html().replace(new RegExp('class="highlight"', 'g'), "" ));
}


$(document).ready(function() {

    $('#textarea').on( "click", function() {
        if (isSearchTrigger) {
            isSearchTrigger = false;
            remove_highlight();
        } else {
            return;
        }
    });
    
});


