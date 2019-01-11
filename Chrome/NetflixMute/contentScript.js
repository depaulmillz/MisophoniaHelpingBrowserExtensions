var x = function () {

    var process = function () {
        var whistleFound = document.body.innerHTML.search("whistle") >= 0 || document.body.innerHTML.search("Whistle") >= 0 || document.body.innerHTML.search("Whistling") >= 0 || document.body.innerHTML.search("whistling") >= 0;
        var cheeringFound = document.body.innerHTML.search("cheer") >= 0 || document.body.innerHTML.search("Cheer") >= 0 || document.body.innerHTML.search("cheering") >= 0 || document.body.innerHTML.search("Cheering") >= 0;
        return whistleFound || cheeringFound;
    };

    if (process()) {
        //document.body.style.backgroundColor = "red";
        //button-volumeMax
        if (document.getElementsByTagName("video") != undefined) {
            if (document.getElementsByTagName("video")[0] !== undefined) {
                if (document.getElementsByTagName("video")[0].muted !== undefined) {
                    document.getElementsByTagName("video")[0].muted = true;
                }
            }
        }
    }
};
setInterval(x, 1);

