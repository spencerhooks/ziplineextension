
// Add listener to the "Save Settings" button and call function to get & store values
saveButton.addEventListener('click', getInputValue);

// var div = document.getElementById("alert");
// div.style.display = "none";

closebtn.addEventListener('click', function () {document.getElementById("alert").style.display = "none"});

function hideElement(){
    document.getElementById("alert").style.display = "none";
};

function getInputValue(){

    document.getElementById("alert").style.display = "inline";
};

