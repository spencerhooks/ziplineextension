settingsCog.addEventListener('click', function(){location.href = 'settings.html';});

chrome.storage.sync.get(['myServerStored', 'myTokenStored'], function(data) {
    // Show the users domain
    document.getElementById("your-domain").innerHTML = data.myServerStored;
});

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    document.getElementById("destination").innerHTML= tabs[0].url;   // Write current url to destination field
    
    createLink.addEventListener('click', getShortURL);

    function getShortURL(){
        chrome.storage.sync.get(['myServerStored', 'myTokenStored'], function(data) {
                       
            // Create http request headers
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("POST", data.myServerStored+'/api/shorten', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('authorization', data.myTokenStored);

            // Function to get the short url that is returned
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

