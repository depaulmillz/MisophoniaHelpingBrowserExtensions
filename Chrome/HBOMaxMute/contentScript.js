var toMatch = null;

chrome.storage.local.get(['tomute'], function(result) {
  if (result.tomute != null && result.tomute != undefined) {
    toMatch = result.tomute.split('\t');
  }
});

chrome.runtime.sendMessage({injected: false}, function(response) {});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if(request.message === "reload" ) {
      console.log("Reload");
      chrome.runtime.sendMessage({injected: false}, function(response) {});

      chrome.storage.local.get(['tomute'], function(result) {
        if (result.tomute != null && result.tomute != undefined) {
          toMatch = result.tomute.split('\t');
        }
      });

      var interval = setInterval(function() {
        if (document.getElementsByTagName('video')[0] != undefined) {
          try {
            document.getElementsByTagName('video')[0].parentElement.parentElement.parentElement.setAttribute(
              'id', 'trackingForMute');
              const targetNode = document.getElementById('trackingForMute');
              console.log('target node ' + targetNode);
              const config = {attributes: true, childList: true, subtree: true};
              const observer = new MutationObserver(callback);
              observer.observe(targetNode, config);
              clearInterval(interval);
              chrome.runtime.sendMessage({injected: true}, function(response) {});
          
          } catch (err) {
            console.log("Muter error " + err);
          }
        }
      
      }, 1000);
    }
    sendResponse();
  }
);

document.addEventListener("keypress", function(event) {
  console.log(event.keyCode);
  if (event.keyCode == 109 || event.keyCode == 77) {
    try {
      var curr = document.getElementsByTagName('video')[0].muted;
      document.getElementsByTagName('video')[0].muted = !curr;
    } catch (error) {
      console.log("Error : " + error);
    }
  }
});

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
      document.getElementsByTagName('video')[0].muted = true;
    } catch (error) {
      console.log("Error : " + error);
    }
  }
};

var interval = setInterval(function() {
  if (document.getElementsByTagName('video')[0] != undefined) {
    try {
      document.getElementsByTagName('video')[0].parentElement.parentElement.parentElement.setAttribute(
        'id', 'trackingForMute');
        const targetNode = document.getElementById('trackingForMute');
        console.log('target node ' + targetNode);
        const config = {attributes: true, childList: true, subtree: true};
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
        clearInterval(interval);
        chrome.runtime.sendMessage({injected: true}, function(response) {});
    
    } catch (err) {
      console.log("Muter error " + err);
    }
  }

}, 1000);