var toMatch = null;

var callback = function (mutationlist, observer) {
  var process = function () {
    var docBody = document.getElementById("trackingForMute").innerText.toLowerCase();
    //var whistleFound = docBody.search("whistl") >= 0;
    //var cheeringFound = docBody.search("cheer") >= 0;
    //var slurpFound = docBody.search("slurp") >= 0;
    if (toMatch) {
      for (i = 0; i < toMatch.length; i++) {
        if (docBody.search(toMatch[i]) >= 0) {
          //console.log("Matched " + toMatch[i]);
          return true;
        }
      }
    }
    return false;
  };
  if (process()) {
    var videoArray = document.getElementsByTagName("video");
    if (videoArray != undefined) {
      var videoZero = videoArray[0];
      if (videoZero !== undefined) {
        if (videoZero.muted !== undefined) {
          videoZero.muted = true;
        }
      }
    }
  }
};

var interval = setInterval(function () {
  chrome.storage.local.get(['tomute'], function (result) {
    //console.log(result.tomute);
    if (result.tomute != null && result.tomute != undefined) {
      toMatch = result.tomute.split("\t");
    }
  });
  if (window.location.pathname.search("watch") >= 0) {
    if (document.getElementsByClassName("player-timedtext")[0] != undefined) {
      document.getElementsByClassName("player-timedtext")[0].setAttribute("id", "trackingForMute");
      const targetNode = document.getElementById("trackingForMute");
      console.log("target node " + targetNode);
      const config = { attributes: true, childList: true, subtree: true };
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
      clearInterval(interval);
    }
  }
}, 1000);