chrome.commands.onCommand.addListener(function(command) {
  if (command == "insert-key-date") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {content: new Date().toISOString().substr(0,10) + ": "}, function(response) {
        console.log(response.farewell);
      }); 
    });
  }
});