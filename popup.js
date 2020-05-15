document.addEventListener('DOMContentLoaded', function () {
    var link = document.getElementById('download');
    var range = document.getElementById("g-range");
    var rangeValue = document.getElementById("g-range-value");
    link.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "download", speed: rangeValue.innerHTML }, function (response) { });
        });
        window.close();
    });

    range.addEventListener('change', function (event) {
        rangeValue.innerHTML = event.target.value;
    })
    range.addEventListener('input', function (event) {
        rangeValue.innerHTML = event.target.value;
    })
});