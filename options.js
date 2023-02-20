serverButton.addEventListener('click', getInputValue);

function getInputValue(){
    
    // Selecting the input element and get its value 
    var inputServer = document.getElementById("myServer").value;
    var inputToken = document.getElementById("myToken").value;

    // Store the value
    chrome.storage.sync.set({ myServerStored: inputServer }); // 
    chrome.storage.sync.set({ myTokenStored: inputToken }); // Is this a secure way to store the token?
};