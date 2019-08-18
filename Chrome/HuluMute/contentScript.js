var x = function () {
    var process = function () {
        var whistleFound = docBody.search("whistl") >= 0;
        var cheeringFound = docBody.search("cheer") >= 0;
        return whistleFound || cheeringFound;
    };
    if (process()) {
        if (document.getElementsByClassName("controls__volume-button--mute").length == 0) {
            var ctrlBtn = document.getElementsByClassName("controls__volume-button")[0];
            ctrlBtn.click();
        }
    }
};
setInterval(x, 1);

