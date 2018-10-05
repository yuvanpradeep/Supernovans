
function newFile()
{

   var txt;
	var text = $("#textarea").val();
    if (text.length > 0)
	{
		 if (confirm("Do you want to save?")) {
			saveFile();
			document.getElementById("textarea").value="";
		} 
	}
}
function readFile(file) {
      var reader = new FileReader();
      reader.onload = readSuccess;
      function readSuccess(evt) {
	  console.log(evt.target.result);
          document.getElementById("textarea").value = evt.target.result;          
      };
      reader.readAsText(file);
  }

function openFile()
{
	$('#selectedFile').trigger('click', function(e) {
      readFile(e.srcElement.files[0]);
  }); 
}

function saveFile()
{
    var text = $("#textarea").val();
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


	