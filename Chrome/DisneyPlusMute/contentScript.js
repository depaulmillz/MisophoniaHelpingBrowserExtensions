var toMatch = null;

chrome.runtime.sendMessage({injected: false}, function(response) {});

chrome.storage.local.get(['tomute'], function(result) {
  if (result.tomute != null && result.tomute != undefined) {
    toMatch = result.tomute.split('\t');
  }
});

var injected = false;

var interval = setInterval(function() {
  if (window.location.pathname.search('video') >= 0) {
    if (document.getElementsByTagName('video') != undefined &&
        document.getElementsByTagName('video')[0] != undefined) {
      const targetNode = document.getElementsByTagName('video')[0];


      try {
        targetNode.textTracks[0].oncuechange = function() {
          var match = false;

          try {
            var docBody =
                targetNode.textTracks[0].activeCues[0].text.toLowerCase();
            if (toMatch) {
              for (i = 0; i < toMatch.length; i++) {
                if (docBody.search(toMatch[i]) >= 0) {
                  match = true;
                  break;
                }
              }
              if (match) {
                var videoArray = document.getElementsByTagName('video');
                if (videoArray != undefined) {
                  var videoZero = videoArray[0];
                  if (videoZero !== undefined) {
                    if (videoZero.muted !== undefined) {
                      console.log('Muted');
                      videoZero.muted = true;
                    }
                  }
                }
                /*document
                    .getElementsByClassName('btm-media-overlays-container')[0]
                    .click();
                var btn = document.getElementsByClassName('mute-btn')[0];
                while (btn == undefined) {
                  btn = document.getElementsByClassName('mute-btn')[0];
                }
                btn.click();*/
              }
            }
          } catch (e) {
          }
        };
        injected = true;
      } catch (err) {
        console.log('Unable to get textTracks');
        injected = false;
      }

      if (injected) {
        clearInterval(interval);
        chrome.runtime.sendMessage({injected: true}, function(response) {});
        console.log('injected');
      }

      // activeCues[0].text.toLowerCase();

      // console.log(docBody);
      // console.log(toMatch);
    }
  }
}, 1000);