// Get the stored values and show them to the user via the input boxes
chrome.storage.sync.get(['myServerStored', 'myTokenStored'], function(data) {
    if (data.myServerStored != undefined) {
        document.getElementById("serverAddress").setAttribute('value', data.myServerStored);
    }
    if (data.myTokenStored != undefined) {
        document.getElementById("apiToken").setAttribute('value', data.myTokenStored);
    }
});

// Add listener to the "Save Settings" button and call function to get & store values
saveButton.addEventListener('click', getInputValue);

// Add listener to the cancel button and move back to the main page
cancelButton.addEventListener('click', function(){location.href = 'index.html';});

function getInputValue(){
    
    // Selecting the input element and get its value 
    var inputServer = document.getElementById("serverAddress").value;
    var inputToken = document.getElementById("apiToken").value;

    // Do some input validation and show alerts based on what we find
    // First check for a valid URL
    try {
        new URL(inputServer);
    } catch {
        sendAlert(alertColor="red", alertText="<strong>Invalid URL</strong> Please enter valid URL");
        return;
    };

    // Check to see if token is correct length
    if (inputToken.length != 43) {
        sendAlert(alertColor="red", alertText="<strong>Invalid Token Length</strong> Check token");
        return;
    };

    // Store the value
    chrome.storage.sync.set({ myServerStored: inputServer });
    chrome.storage.sync.set({ myTokenStored: inputToken });
    sendAlert(alertColor="green", alertText="<strong>Success!</strong> Settings saved");
    setTimeout(function(){location.href = 'index.html'}, 800);

};

// Create an alert by changing the hidden div and making it visible
function sendAlert(alertColor, alertText){
    document.getElementById("alert").style.backgroundColor = alertColor;
    document.getElementById("alert-text").innerHTML = alertText;
    document.getElementById("alert").style.display = "inline";
}

// Listen for clicks on the alert's close button
closebtn.addEventListener('click', function () {document.getElementById("alert").style.display = "none"});

// Listen for click on API Authorization Token info button and show alert with more information
tokenInfo.addEventListener('click', function () {
    sendAlert(alertColor="blue", alertText="Copy token from your Zipline dashboard by clicking your username in the top right.")
});

// Listen for click on Server Address info button and show alert with more information
serverInfo.addEventListener('click', function () {
    sendAlert(alertColor="blue", alertText="Enter the url of your Zipline server (including the port number if necessary). This should be what you use for the dashboard. No need to include path to api (i.e. /api/shorten).")
});