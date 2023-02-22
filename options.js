// Get the stored values and show them to the user via the input boxes
chrome.storage.sync.get(['myServerStored', 'myTokenStored'], function(data) {
    document.getElementById("serverAddress").setAttribute('value', data.myServerStored);
    document.getElementById("apiToken").setAttribute('value', data.myTokenStored);
});

// Add listener to the "Save Settings" button and call function to get & store values
saveButton.addEventListener('click', getInputValue);

function getInputValue(){
    
    // Select the input element and get its value 
    var inputServer = document.getElementById("serverAddress").value;
    var inputToken = document.getElementById("apiToken").value;

    // Store the value
    chrome.storage.sync.set({ myServerStored: inputServer }); // 
    chrome.storage.sync.set({ myTokenStored: inputToken }); // Is this a secure way to store the token?
};

