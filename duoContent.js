console.log("I am here!");
const duoDownloadLink = "https://www.duolingo.com/vocabulary/overview";
const buttonDownloadRawJson = document.createElement("button");
buttonDownloadRawJson.type = "button";
buttonDownloadRawJson.innerHTML = "DOWNLOAD IT!!";
buttonDownloadRawJson.style = "position:absolute;left:100px;top:150px;z-index:100"

document.body.appendChild(buttonDownloadRawJson);

buttonDownloadRawJson.addEventListener("click", downloadRawJson);

function downloadRawJson(){
    console.log("Test");
    browser.downloads.download({ url: duoDownloadLink });
}


