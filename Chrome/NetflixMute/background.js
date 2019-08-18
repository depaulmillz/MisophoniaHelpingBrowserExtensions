var running = false;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.browserAction.setIcon({
            path: request.newIconPath
        });
        running = true;
    });

chrome.tabs.onActivated.addListener(function () {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var url = tabs[0].url;
        if (url == undefined || url.search("netflix.com/watch") < 0) {
            chrome.browserAction.setIcon({
                path: "muteoff.png"
            });
        } else if (running && url.search("netflix.com/watch") >= 0) {
            chrome.browserAction.setIcon({
                path: "muteon.png"
            });
        }
    });
});


