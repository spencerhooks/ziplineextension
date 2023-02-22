// Go to the settings page when the user clicks the cog button
settingsCog.addEventListener('click', function(){location.href = 'settings.html';});

// Get the stored value for the users server and indicate that on the page
chrome.storage.sync.get(['myServerStored', 'myTokenStored'], function(data) {
    document.getElementById("your-domain").innerHTML = data.myServerStored;
});

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    // Write url from current tab to destination field
    document.getElementById("destination").innerHTML= tabs[0].url;   
    
    // Listen for a click of the "Create Short Link" button and then request the short URL
    createLink.addEventListener('click', getShortURL);

    // Function to request the short URL
    function getShortURL(){
        chrome.storage.sync.get(['myServerStored', 'myTokenStored'], function(data) {
                       
            // Create http request headers
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("POST", data.myServerStored+'/api/shorten', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('authorization', data.myTokenStored);

            // Function to read the short url that is returned via json
            xhr.onload = () => {
                const shortURL = xhr.response;
                console.log(shortURL);
                // navigator.clipboard.writeText("testingstuff").then();
            };

            // Create json payload
            let serverObj = {};
            serverObj[url="url"] = tabs[0].url;

            // Send request with payload
            xhr.send(JSON.stringify(serverObj));

            // setTimeout(function(){window.close(), 1000});
        });
    };
});

