chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    document.getElementById("my_url").innerHTML = tabs[0].url;

    chrome.storage.sync.get(['myServerStored', 'myTokenStored'], function(data) {
        document.getElementById("my_server").innerHTML = data.myServerStored;   
 
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", data.myServerStored+'/api/shorten', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('authorization', data.myTokenStored);

        xhr.onload = () => {
            const shortURL = xhr.response;
            // console.log(shortURL);
            navigator.clipboard.writeText("testingstuff").then();
        };

        let serverObj = {};
        serverObj[url="url"] = tabs[0].url;

        xhr.send(JSON.stringify(serverObj));
    });

});




