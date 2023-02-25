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

            requestURL(hostURL, data.myTokenStored, serverObj).then((data) => {
                data.json().then((payload) => {
                    console.log(data.status);
                    switch (data.status) {
                        case 200:
                            sendAlert(alertColor="green", alertText="<strong>Success!</strong> Short URL copied to clipboard");
                            navigator.clipboard.writeText(payload[url]).then();
                            break;
                        case 400:
                            sendAlert(alertColor="red", alertText="<strong>Request Error!</strong> " + payload.error);
                            break;
                        case 401:
                            sendAlert(alertColor="red", alertText="<strong>Auth Error!</strong> " + payload.error);
                            break;
                        case 405 || 405:
                            sendAlert(alertColor="red", alertText="<strong>Uknown Host!</strong> server not found");
                        default:
                            sendAlert(alertColor="red", alertText="<strong>Uknown Response!</strong> something went wrong");
                    };
                });
            });


            // setTimeout(function(){window.close()}, 800);
        });
    };
});

function sendAlert(alertColor, alertText){
    document.getElementById("alert").style.backgroundColor = alertColor;
    document.getElementById("alert-text").innerHTML = alertText;
    document.getElementById("alert").style.display = "inline";
}

closebtn.addEventListener('click', function () {document.getElementById("alert").style.display = "none"});

async function requestURL(url = '', auth = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': auth
        },
        body: JSON.stringify(data)
    })
    .catch( err => {
        sendAlert(alertColor="red", alertText="<strong>Request Failed!</strong> " + err);
    });

    return response;

};