// Go to the settings page when the user clicks the cog button
settingsCog.addEventListener('click', function(){location.href = 'settings.html';});

// Get the stored value for the users server and indicate that on the page
chrome.storage.sync.get(['myServerStored'], function(data) {
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

            // Function to read what is returned from the request and take action 
            xhr.onload = () => {
                const shortURL = xhr.response;
                console.log(xhr.status);
                console.log(xhr.response);
                switch (xhr.status) {
                    case 200:
                        document.getElementById("success").style.display = "inline";
                        navigator.clipboard.writeText(shortURL[url]).then();
                        break;
                    case 400:
                        document.getElementById("forbidden").style.display = "inline";
                        break;
                };              
            };

            // Create json payload
            let serverObj = {};
            serverObj[url="url"] = document.getElementById("destination").value;

            // Send request with payload
            xhr.send(JSON.stringify(serverObj));

            // setTimeout(function(){window.close()}, 500);
        });
    };
});

success_closebtn.addEventListener('click', function () {document.getElementById("success").style.display = "none"});
forbidden_closebtn.addEventListener('click', function () {document.getElementById("forbidden").style.display = "none"});