var toMatch = null;

chrome.runtime.sendMessage({injected: false}, function(response) {});

var callback = function(mutationlist, observer) {
  var process = function() {
    var docBody =
        document.getElementById('trackingForMute').innerText.toLowerCase();
    console.log("New change:" + docBody);

    if (toMatch) {
      console.log("To match is set");
      for (i = 0; i < toMatch.length; i++) {
        if (docBody.search(toMatch[i]) >= 0) {
          console.log("To Match: " + toMatch[i]);
          return true;
        }
      }
    }
    return false;
  };
  if (process()) {
    try {
      document.getElementsByClassName("rendererContainer")[0].getElementsByTagName("video")[0].muted = true;
    } catch (error) {
      console.log("Error : " + error);
    }
  }
};

var interval = setInterval(function() {
  chrome.storage.local.get(['tomute'], function(result) {
    if (result.tomute != null && result.tomute != undefined) {
      toMatch = result.tomute.split('\t');
    }
  });
  if (document.getElementsByClassName('webPlayerUIContainer')[0] != undefined) {
    document.getElementsByClassName('webPlayerUIContainer')[0].setAttribute(
        'id', 'trackingForMute');
    const targetNode = document.getElementById('trackingForMute');
    console.log('target node ' + targetNode);
    const config = {attributes: true, childList: true, subtree: true};
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    clearInterval(interval);
    chrome.runtime.sendMessage({injected: true}, function(response) {});
  }

}, 1000);