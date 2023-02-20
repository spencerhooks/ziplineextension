chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let current_url = tabs[0].url
    document.getElementById("my_url").innerHTML = tabs[0].url;
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://mars.hooks.casa:3000/api/shorten", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('authorization', 'z7WlYEWNIBzGlv7bb77NgSqp.MTY3Njg2NTA1OTg0NA');
    xhr.send(JSON.stringify({
        url: current_url
    }));
});