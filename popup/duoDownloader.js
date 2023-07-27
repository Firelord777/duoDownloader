let currentTab = "";
let courseLanguage = "";
let rawJson = "";

function setCurrentTab(tabs){
  currentTab = tabs[0];
  toggleIsDuo();
}

// Handles any error thrown by a .then() 
function onError(error) {
    console.error(`${error}`);
}

// A button to fetch and download the raw Json vocabList from Duolingo.
const buttonLoadVocab = document.getElementById("loadVocab");
buttonLoadVocab.addEventListener("click", onClick_loadVocab);
// Button to reload the wordlist goes through same listener.
const buttonReloadRawJson = document.getElementById("buttonReloadRawJson");
buttonReloadRawJson.addEventListener("click", onClick_loadVocab);
function onClick_loadVocab(){
  // Goes through a content script to circumvent CORS restrictions.
  browser.tabs.sendMessage(currentTab.id, "getVocabList").then(vocabDownloaded, onError); //T Add proper Error Handling.
}

function vocabDownloaded(response){
  rawJson = response;
  browser.storage.local.set({"rawJson" : rawJson, "rawJsonDate": Date.now()});
  rawJsonLoaded();
}

function rawJsonFromStorage(data){
  //Checks, if rawJson in Storage is older than a day, and ignores it, if thats the case.
  if(data.rawJsonDate === undefined) return;
  if(Date.now() - data.rawJsonDate >= (1000*60*60*24)) return;

  if(data.rawJson === undefined) return; //Check if rawJSON is even in Storage
  rawJson = data.rawJson;
  rawJsonLoaded();
}

//Called by all methods that load the rawJSON data from somewhere, after
function rawJsonLoaded(){
  courseLanguage = rawJson.language_string;
  showDownloadCompleted();
}

//File Download Button
const buttonDownloadFile = document.getElementById("buttonDownloadFile");
buttonDownloadFile.addEventListener("click", onClick_buttonDownloadFile);
function onClick_buttonDownloadFile(){
  switch(getSelectedFileType()){
    case "rawData" : downloadFile(JSON.stringify(rawJson), generateFileName() + ".json"); break;
    case "txt" : downloadFile(generateTableFile("\t", "\n"), generateFileName() + ".txt"); break;
    case "csv" : downloadFile(generateTableFile(",", "\n"), generateFileName() + ".csv"); break;
    case "json" : downloadFile(JSON.stringify(generateJsonFile()), generateFileName() + ".json"); break;
  }
}

browser.tabs.query({ active: true, currentWindow: true }).then(setCurrentTab, onError); //Used to toggle the isDuo Window
browser.storage.local.get(["rawJson", "rawJsonDate"]).then(rawJsonFromStorage, onError); //Used to load rawJson from storage.local and to possibly skip isDuo Window