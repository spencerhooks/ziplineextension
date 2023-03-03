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

// Get the user input, do some validation, check the server version for known issues, then store the values. The 
function getInputValue(){
    
    // Select the input element and get its value 
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

    // Check the server version so that we can warn the user about any known issues with their version. Purposely ignore any errors as the
    // version api can be turned off so we cannot know why the request failed.

    // Prepare for version check by adding /api/version to the path of the server that was input by the user
    const hostURL = new URL(inputServer);
    hostURL.pathname = hostURL.pathname + "/api/version";

    // Make the GET call to obtain the version, warn the user if there is a known issue, then store the values
    zipVersion = getVersion(hostURL.href, inputToken)
    .then(response => {
        // If the server version is 3.7.0-rc3 then warn the user about the known bug with the shorten api
        if (response?.versions?.current == "3.7.0-rc3") {
            sendAlert(alertColor="#c27502", alertText="<strong>Warning!</strong> Your settings have been saved, but there's a known bug with this version of Zipline that may cause an error in links copied to the clipboard. Please update your Zipline server");
            chrome.storage.sync.set({ myServerStored: inputServer });
            chrome.storage.sync.set({ myTokenStored: inputToken });
        // Otherwise save the input without raising any warnings
        } else {
            chrome.storage.sync.set({ myServerStored: inputServer });
            chrome.storage.sync.set({ myTokenStored: inputToken });
            sendAlert(alertColor="green", alertText="<strong>Success!</strong> Settings saved");
            setTimeout(function(){location.href = 'index.html'}, 800);
        };
    });
};

// Create an alert by changing the hidden div and making it visible
function sendAlert(alertColor, alertText){
    document.getElementById("alert").style.backgroundColor = alertColor;
    document.getElementById("alert-text").innerHTML = alertText;
    document.getElementById("alert").style.display = "flex";
}

// Listen for clicks on the alert's close button
closebtn.addEventListener('click', function () {document.getElementById("alert").style.display = "none"});

// Listen for click on API Authorization Token info button and show alert with more information
tokenInfo.addEventListener('click', function () {
    sendAlert(alertColor="#216ead", alertText="Copy token from your Zipline dashboard by clicking your username in the top right.")
});

// Listen for click on Server Address info button and show alert with more information
serverInfo.addEventListener('click', function () {
    sendAlert(alertColor="#216ead", alertText="Enter the url of your Zipline server (including the port number, if necessary). This should be what you use to reach the Zipline dashboard. No need to include path to api (i.e. /api/shorten).")
});

// Function to get the version
async function getVersion(url, token) {
    const myresponse = await fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'authorization': token
        },
    })
    .then(response => {
        if (!response.ok) throw response;
        return response.json();
    })
    .then(response => {
        return response;
    })
    .catch(error => {
            if (typeof error.json === "function") {
                error.json().then(jsonError => {
                }).catch(genericError => {
                });
            } else {
            }
    });
    return myresponse;
};