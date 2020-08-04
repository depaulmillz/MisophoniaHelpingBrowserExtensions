var toMatch = null;

chrome.runtime.sendMessage({injected: false}, function(response) {
  console.log('off');
});

var callback = function(mutationlist, observer) {
  var process = function() {
    var docBody =
        document.getElementById('trackingForMute').innerText.toLowerCase();
    if (toMatch) {
      for (i = 0; i < toMatch.length; i++) {
        if (docBody.search(toMatch[i]) >= 0) {
          return true;
        }
      }
    }
    return false;
  };
  if (process()) {
    if (document.getElementsByClassName('controls__volume-button--mute')
            .length == 0) {
      var ctrlBtn =
          document.getElementsByClassName('controls__volume-button')[0];
      ctrlBtn.click();
    }
  }
};

var interval = setInterval(function() {
  chrome.storage.local.get(['tomute'], function(result) {
    if (result.tomute != null && result.tomute != undefined) {
      toMatch = result.tomute.split('\t');
    }
  });
  if (window.location.pathname.search('watch') >= 0) {
    if (document.getElementsByClassName('closed-caption-container')[0] !=
        undefined) {
      document.getElementsByClassName('closed-caption-container')[0]
          .setAttribute('id', 'trackingForMute');
      const targetNode = document.getElementById('trackingForMute');
      console.log('target node ' + targetNode);
      const config = {attributes: true, childList: true, subtree: true};
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
      clearInterval(interval);
      chrome.runtime.sendMessage({injected: true}, function(response) {
        console.log('injected')
      });
    }
  }
}, 1000);