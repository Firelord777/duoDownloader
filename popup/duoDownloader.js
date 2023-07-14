let currentTab = "";

// Check to test if the user currently is on Duolingo
const divIsDuo = document.getElementById("isDuo");
const divIsNotDuo = document.getElementById("isNotDuo");

  // Get a list of all tabs
browser.tabs.query({ active: true, currentWindow: true })
  .then(compareTab, onError);

  // Actually performs the check and enables the according div.
function compareTab(tabs){
    currentTab = tabs[0]; // Get the current tabs
    const url = currentTab.url;

    console.log(tabs[0].id + "comp");
    
    const isDuo = url.includes("www.duolingo.com/");
    
    //Hides and shows the apropriate tabs.
    divIsDuo.hidden = !isDuo;
    divIsNotDuo.hidden = isDuo;
}

  // Handles any error thrown by a .then() 
function onError(error) {
    console.error(`${error}`);
}

// A button to fetch and download the raw Json vocabList from Duolingo.
// Goes through a content script to circumvent CORS restrictions.
const buttonDownloadRawJson = document.getElementById("downloadRawJson");

buttonDownloadRawJson.addEventListener("click", downloadRawJson);

function downloadRawJson(){
  browser.tabs.sendMessage(currentTab.id, "getVocabList").then(rawJsonDownloaded, onError); //T Add proper Error Handling.
}

async function rawJsonDownloaded(response){
  
  //T Do something with the response.
  // Or put the whole response Handeling into a background script.
  console.log(response);
}



