// Go to the settings page when the user clicks the cog button
settingsCog.addEventListener('click', function(){location.href = 'settings.html';});

// Get the stored value for the users server and indicate that on the page
chrome.storage.sync.get(['myServerStored'], function(data) {
    try {
        const serverURL = new URL(data.myServerStored);
        document.getElementById("your-domain").innerHTML = serverURL.protocol + "//" + serverURL.hostname;
    } catch {
        document.getElementById("your-domain").innerHTML = data.myServerStored;
    };
});

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    // Write url from current tab to destination field
    document.getElementById("destination").innerHTML= tabs[0].url;   
    
    // Listen for a click of the "Create Short Link" button and then request the short URL
    createLink.addEventListener('click', getShortURL);

    // Function to request the short URL
    function getShortURL(){
        chrome.storage.sync.get(['myServerStored', 'myTokenStored'], function(data) {

            // Make sure path ends in /api/shorten
            const hostURL = new URL(data.myServerStored);
            if (hostURL.pathname != "/api/shorten") {
                hostURL.pathname = hostURL.pathname + "api/shorten";
            };

            // Create json payload
            let serverObj = {};
            serverObj[url="url"] = document.getElementById("destination").value;
            if (document.getElementById("vanity").value) {
                serverObj[vanity="vanity"] = document.getElementById("vanity").value;
            };

            // Make the POST request to get the short link back. The error handling here was difficult for me to understand and is still
            // a bit fuzzy. I made heavy use of stackoverflow examples...
            fetch(hostURL.href, {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': data.myTokenStored
                },
                body: JSON.stringify(serverObj)
              })
              .then(response => {
                if (!response.ok) throw response;
                return response.json();
              })
              .then(response => {
                sendAlert(alertColor="green", alertText="<strong>Success!</strong> Short URL copied to clipboard");
                navigator.clipboard.writeText(response.url).then();
                setTimeout(function(){window.close()}, 800);
                return response;
              })
              .catch(error => {
                    if (typeof error.json === "function") {
                        error.json().then(jsonError => {
                            sendAlert(alertColor="red", alertText="<strong>Error " + error.status + " </strong> " + jsonError.error);
                        }).catch(genericError => {
                            sendAlert(alertColor="red", alertText="<strong>Error " + error.status + " </strong> can't contact server");
                        });
                    } else {
                        sendAlert(alertColor="red", alertText="<strong>Error " + error.status + " </strong> can't contact server");  // Change this alert for typeof error.status === "undefined" and just manually call it a 404 (for Firefox)
                    }
              }); 

        });
    };
});

function sendAlert(alertColor, alertText){
    document.getElementById("alert").style.backgroundColor = alertColor;
    document.getElementById("alert-text").innerHTML = alertText;
    document.getElementById("alert").style.display = "flex";
}

closebtn.addEventListener('click', function () {document.getElementById("alert").style.display = "none"});

// Listen for click on Vanity info button and show alert with more information
vanityInfo.addEventListener('click', function () {
    sendAlert(alertColor="#216ead", alertText="Optional custom link extension for Zipline to use instead of a random string.")
});