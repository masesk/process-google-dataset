document.addEventListener('DOMContentLoaded', function () {
    const download = document.getElementById('download');
    const range = document.getElementById("g-range");
    const rangeValue = document.getElementById("g-range-value");
    const up = document.getElementById("up");
    const down = document.getElementById("down");
    const parseNum = document.getElementById("parse-num");
    download.addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "download", speed: rangeValue.innerHTML, num: parseNum.value }, function (response) { });
        });
        window.close();
    });

    range.addEventListener('change', function (event) {
        rangeValue.innerHTML = event.target.value;
    })
    range.addEventListener('input', function (event) {
        rangeValue.innerHTML = event.target.value;
    })

    up.addEventListener('click', function () {
        parseNum.value = Number(parseNum.value) + 1;
    });

    down.addEventListener('click', function () {
        parseNum.value = Number(parseNum.value) - 1;
    });


});