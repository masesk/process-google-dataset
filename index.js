chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var urls = []
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const downloadMetadata = () => {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:json/plain/* margin: 0 auto; */;charset=utf-8,' +

            encodeURIComponent(JSON.stringify(urls)));
        pom.setAttribute('download', `${document.title.replace(/\s/g, '')}.json`);

        pom.style.display = 'none';
        document.body.appendChild(pom);

        pom.click();

        document.body.removeChild(pom);
    }


    const getData = async (overlay, text, stopExecution, num) => {
        const searchArea = document.querySelector("[data-cid]");
        const imgs = searchArea.getElementsByTagName("img")
        var i;
        var total = 0;
        for (i = 0; i < imgs.length; i++) {
            total += 1
            if (stopExecution.value) {
                break;
            }
            if (imgs[i].width <= 100) {
                continue
            }
            imgs[i].click()
            text.innerHTML = `Parsing Images...[ ${total} ]`
            await sleep(message.speed * 1000).then(() => {
                var el = document.querySelector("[style='opacity: 1;']")
                urls.push(el.getElementsByTagName("img")[1].src)
            })
            if(i === num-1){
                break;
            }
        }
        enableScrolling()
        overlay.remove()
        downloadMetadata()

    }
    const disableScrolling = () => {
        var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = function () { window.scrollTo(x, y); };
    }


    const enableScrolling = () => {
        window.onscroll = function () { };
    }
    if(message.num <= 0){
        return
    }
    if (message.action === "download") {
        var overlay = document.createElement('div')
        var btn = document.createElement('button')
        var text = document.createElement('div')
        overlay.setAttribute("id", "pgd_overlay")
        text.setAttribute("style", "color: white; padding-top: 25%; font-size: 55px; justify-content: center; align-items: center;text-align: center; vertical-align: middle;")
        btn.setAttribute("style", "cursor: pointer; margin-top: 30px; margin-left: calc(50% - 150px); border-radius: 25px; color: dimgrey; font-size: 40px; justify-content: center; align-items: center; text-align: center; vertical-align: middle; width: 300px; background-color: aliceblue;")
        text.innerHTML = "Parsing Images...[ 0% ]"
        btn.innerHTML = "Stop Parsing"
        overlay.setAttribute("style", "overflow: hidden; position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.7); z-index: 999; cursor: pointer;")
        disableScrolling()
        overlay.appendChild(text)
        overlay.appendChild(btn)
        document.body.appendChild(overlay)
        var stopExecution = { value: false }
        getData(overlay, text, stopExecution, message.num)
        btn.addEventListener('click', event => {
            btn.innerHTML = "Please wait..."
            btn.disabled = true;
            stopExecution.value = true
        });
    }

});


