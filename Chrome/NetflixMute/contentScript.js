
var callback = function (mutationlist, observer) {
  var process = function () {
    var docBody = document.body.innerHTML.toLowerCase();
    var whistleFound = docBody.search("whistl") >= 0;
    var cheeringFound = docBody.search("cheer") >= 0;
    var slurpFound = docBody.search("slurp") >= 0;
    return whistleFound || cheeringFound || slurpFound;
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