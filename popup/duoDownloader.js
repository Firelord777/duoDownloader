const duoDownloadLink = "https://www.duolingo.com/vocabulary/overview";

//Check to test if the user currently is on Duolingo
const divIsDuo = document.getElementById("isDuo");
const divIsNotDuo = document.getElementById("isNotDuo");

// Get the currently active tab
browser.tabs.query({ active: true, currentWindow: true })
  .then(compareTab, onError);

//Actually performs the check and enables the according div.
function compareTab(tabs){
    const currentTab = tabs[0];
    const url = currentTab.url;
    
    const isDuo = url.includes("www.duolingo.com/");
    
    divIsDuo.hidden = !isDuo;
    divIsNotDuo.hidden = isDuo;
}

//Handles any error thrown by a .then() 
function onError(error) {
    console.log(`Error: ${error}`);
}

const buttonDownloadRawJson = document.getElementById("downloadRawJson");

buttonDownloadRawJson.addEventListener("click", downloadRawJson)

function downloadRawJson(){
  browser.downloads.download({ url: duoDownloadLink });
}

/**const userAction = async () => {
  const response = await fetch('https://www.duolingo.com/vocabulary/overview', {"mode": "cors"});
  //const myJson = await response.json(); //extract JSON from the http response
  console.log(response);
  //pIsDuo.innerHTML = myJson["language_string"];
}**/

