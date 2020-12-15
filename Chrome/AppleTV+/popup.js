chrome.storage.local.get(['tomute'], function (result) {
    if (result.tomute !== undefined && result.tomute != null) {
        resultSet = result.tomute.split("\t");
        for (i = 0; i < resultSet.length; i++) {
            var btn = document.createElement("button");
            var txt = document.createTextNode("Delete " + resultSet[i]);
            btn.appendChild(txt);
            btn.value = resultSet[i];
            btn.onclick = function () {
                var btnval = this.value;
                chrome.storage.local.get(['tomute'], function (results) {
                    resultSet = results.tomute.split("\t");
                    filterRes = resultSet.filter(function (s) {
                        return s != btnval;
                    });
                    var serialization = null
                    for (i = 0; i < filterRes.length; i++) {
                        if (i == 0) {
                            serialization = filterRes[i];
                        } else {
                            serialization += "\t" + filterRes[i];
                        }
                    }
                    //alert(serialization);
                    chrome.storage.local.set({ 'tomute': serialization }, function () { });
                });
                this.remove();
            };
            document.getElementById("previousterms").appendChild(btn);
        }
    }
});

var addbtn = document.getElementById("addbtn");
addbtn.onclick = function () {
    var term = document.getElementById("newterm").value;
    var terms = null
    chrome.storage.local.get(['tomute'], function (result) {
        if (result.tomute) {
            resultSet = result.tomute.split("\t");
        } else {
            resultSet = null
        }
        //alert("results " + resultSet);
        terms = resultSet;
        if (terms == null || terms == undefined) {
            //alert("null terms");
            terms = [term]
        } else {
            terms.push(term);
        }
        var serialization = null
        for (i = 0; i < terms.length; i++) {
            if (i == 0) {
                serialization = terms[i];
            } else {
                serialization += "\t" + terms[i];
            }
        }
        chrome.storage.local.set({ 'tomute': serialization }, function () {
            var btn = document.createElement("button");
            var txt = document.createTextNode("Delete " + term);
            btn.appendChild(txt);
            btn.value = term;
            btn.onclick = function () {
                //alert(btn.value);
                chrome.storage.local.get(['tomute'], function (results) {
                    var serialization2 = null
                    if (results.tomute) {
                        resultSet2 = results.tomute.split("\t");
                        filterRes = resultSet2.filter(function (s) {
                            return s != btn.value;
                        });
                        for (i = 0; i < filterRes.length; i++) {
                            if (i == 0) {
                                serialization2 = filterRes[i];
                            } else {
                                serialization2 += "\t" + filterRes[i];
                            }
                        }
                        //alert(serialization2);
                    }
                    chrome.storage.local.set({ 'tomute': serialization2 }, function () { });
                });
                btn.remove();
            };
            document.getElementById("previousterms").appendChild(btn);
        });
    });
    document.getElementById("newterm").value = null;
};

var reloadbtn = document.getElementById("reload");
reloadbtn.onclick = function () { 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "reload"}, function(response) {});
      });
};