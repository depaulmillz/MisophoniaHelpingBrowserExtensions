var toMatch = null;
var targetNode = null;
var video = null;
var interval = null;

document.addEventListener("keypress", function(event) {
  console.log(event.keyCode);
  if (event.keyCode == 109 || event.keyCode == 77) {
    try {
      var curr = video.muted;
      video.muted = !curr;
    } catch (error) {
      console.log("Error : " + error);
    }
  }
});

function tree_dfs(currNode, idLookingFor){

  //const lookingFor = currNode.getElementById(idLookingFor);
  //if(lookingFor != undefined && lookingFor != null){
  //  return lookingFor;
  //}

  if (currNode.id == idLookingFor)
    return currNode;

  if(currNode.shadowRoot != undefined && currNode.shadowRoot != null){
    var shadow = tree_dfs(currNode.shadowRoot, idLookingFor);
    if (shadow != null){
      return shadow
    }
  }
  var children = currNode.childNodes;
  for(var i = 0;  i < children.length; ++i){
    var res = tree_dfs(children[i], idLookingFor);
    if(res != null){
      return res;
    }
  }

  return null
}

function tree_dfs_video(currNode){

  //const lookingFor = currNode.getElementById(idLookingFor);
  //if(lookingFor != undefined && lookingFor != null){
  //  return lookingFor;
  //}

  console.log(currNode.tagName);

  if (currNode.tagName == "VIDEO")
    return currNode;

  if(currNode.shadowRoot != undefined && currNode.shadowRoot != null){
    var shadow = tree_dfs_video(currNode.shadowRoot);
    if (shadow != null){
      return shadow
    }
  }
  var children = currNode.childNodes;
  for(var i = 0;  i < children.length; ++i){
    var res = tree_dfs_video(children[i]);
    if(res != null){
      return res;
    }
  }

  return null
}

var callback = function(mutationlist, observer) {
  console.log(mutationlist);
  console.log(observer);
  var process = function() {
    var docBody = targetNode.innerText.toLowerCase();
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
      video.muted = true;
    } catch (error) {
      console.log("Error : " + error);
    }
  }
};

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

      interval = setInterval(function() {
        targetNode = tree_dfs(document.getElementsByTagName('apple-tv-plus-player')[0], 'video-container');
        if (targetNode != null){
          video = tree_dfs_video(targetNode);
          console.log(video);
          console.log(targetNode);
          const config = {attributes: true, childList: true, subtree: true};
          const observer = new MutationObserver(callback);
          observer.observe(targetNode, config);
          clearInterval(interval);
          chrome.runtime.sendMessage({injected: true}, function(response) {});
          console.log("Injected on" + targetNode);
        }
      }, 1000);

    }
    sendResponse();
  }
);

