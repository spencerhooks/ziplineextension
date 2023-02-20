chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    document.getElementById("my_url").innerHTML = tabs[0].url;

    chrome.storage.sync.get(['myServerStored', 'myTokenStored'], function(data) {
        document.getElementById("my_server").innerHTML = data.myServerStored;   
 
        let serverObj = {};
        serverObj[url="url"] = tabs[0].url;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", data.myServerStored+'/api/shorten', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('authorization', data.myTokenStored);
        xhr.send(JSON.stringify(serverObj));
    });

});




