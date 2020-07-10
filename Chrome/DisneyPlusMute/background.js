chrome.tabs.onActivated.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = tabs[0].url;
    if (url == undefined || url.search('disneyplus.com/video') < 0) {
      // chrome.browserAction.setIcon({path: 'muteoff.png'});
    } else if (url.search('disneyplus.com/video') >= 0) {
      // chrome.browserAction.setIcon({path: 'muteon.png'});
    }
  });
});