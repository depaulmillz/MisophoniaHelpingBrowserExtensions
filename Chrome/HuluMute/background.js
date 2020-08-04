chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.injected) {
    chrome.browserAction.setIcon({path: 'muteon.png'});
  } else {
    chrome.browserAction.setIcon({path: 'muteoff.png'});
  }
});