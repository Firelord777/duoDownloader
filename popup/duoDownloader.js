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

buttonLoadVocab.addEventListener("click", loadVocab);

function loadVocab(){
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

const buttonDownloadRawJson = document.getElementById("downloadRawJson");
buttonDownloadRawJson.addEventListener("click", downloadRawJson);


function downloadRawJson() {
  downloadFile(JSON.stringify(rawJson))
}

function downloadFile(text){
  // Create a new Blob object from the data
  const blob = new Blob([text], { type: 'application/json' });

  // Generate a temporary URL for the blob
  const url = URL.createObjectURL(blob);


  // Create an anchor element to trigger the file download
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'data.json'; // Specify the filename and extension for the saved file
  downloadLink.click();

  // Clean up the temporary URL after the download is initiated
  URL.revokeObjectURL(url);

  downloadLink.remove();
}


