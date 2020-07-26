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
        var cues = targetNode.textTracks[0].cues;
        var currentCue = targetNode.textTracks[0].activeCues[0];
        var idx = 0;
        for (; idx < cues.length; idx++) {
          if (currentCue == cues[idx]) {
            break;
          }
        }
        if (idx == cues.length) {
          console.log('Reset idx');
          idx = 0;
        }
        var docBody = cues[idx].text.toLowerCase();
        if (currentCue != undefined) {
          docBody += currentCue.text.toLowerCase();
        }
        if (toMatch) {
          for (i = 0; i < toMatch.length; i++) {
            if (docBody.search(toMatch[i]) >= 0) {
              targetNode.muted = true;
              console.log('muted');
              break;
            }
          }
        }
      } catch (e) {
        console.log(e)
      }

      try {
        targetNode.textTracks[0].oncuechange = function() {
          try {
            var cues = targetNode.textTracks[0].cues;
            var currentCue = targetNode.textTracks[0].activeCues[0];
            var docBody = currentCue.text.toLowerCase();

            var idx = 0;
            for (; idx < cues.length; idx++) {
              if (currentCue == cues[idx]) {
                break;
              }
            }
            if (idx == cues.length) {
              console.log('Reset idx');
              idx = 0;
            }

            docBody = docBody + cues[idx].text.toLowerCase();
            if (toMatch) {
              for (i = 0; i < toMatch.length; i++) {
                if (docBody.search(toMatch[i]) >= 0) {
                  targetNode.muted = true;
                  console.log('muted');
                  break;
                }
              }
            }
          } catch (e) {
            console.log(e);
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