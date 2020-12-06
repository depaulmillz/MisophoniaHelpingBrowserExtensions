/*chrome.tabs.onActivated.addListener(function () {
  chrome.tabs.query(
    { active: true, currentWindow: true }, function (tabs) {
      var url = tabs[0].url;
      if (url == undefined || url.search("netflix.com/watch") < 0) {
        chrome.browserAction.setIcon({ path: "muteoff.png" });
      } else if (
        url.search("netflix.com/watch") >= 0) {
        chrome.browserAction.setIcon({ path: "muteon.png" });
      }
    });
});*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  if (request.injected) {
    chrome.browserAction.setIcon({path: 'muteon.png'});
  } else {
    chrome.browserAction.setIcon({path: 'muteoff.png'});
  }
});