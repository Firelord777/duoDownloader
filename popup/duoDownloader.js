var global = window;

let currentTab = "";
let rawJson = "";

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
const buttonLoadVocab = document.getElementById("loadVocab");

buttonLoadVocab.addEventListener("click", onClick_loadVocab);

function onClick_loadVocab(){
  browser.tabs.sendMessage(currentTab.id, "getVocabList").then(vocabDownloaded, onError); //T Add proper Error Handling.
}

const divDownloadComplete = document.getElementById("downloadComplete");

async function vocabDownloaded(response){
  rawJson = response;

  divIsDuo.hidden = true;
  divDownloadComplete.hidden = false;

  const courseLanguage = document.getElementById("courseLanguage");

  courseLanguage.innerHTML = rawJson.language_string;
}

// Button to download the fetched JSON Data to the users download Directory directly
const buttonDownloadRawJson = document.getElementById("downloadRawJson");
buttonDownloadRawJson.addEventListener("click", onClick_downloadRawJson);

function onClick_downloadRawJson() {
  downloadFile(JSON.stringify(rawJson), "duo.json");
}
  //Downloads a string into a file in the users Download Directory
  //Basicly entirely written with the help of ChatGPT
function downloadFile(text, filename){
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);


  // Create an anchor element and trigger the file download
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = filename; // Specify the filename and extension for the saved file
  downloadLink.click();

  // Delete everything that is no longer needed after the completed download
  URL.revokeObjectURL(url);
  downloadLink.remove();
}