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
// Goes through a content script to circumvent CORS restrictions.
const buttonLoadVocab = document.getElementById("loadVocab");

buttonLoadVocab.addEventListener("click", onClick_loadVocab);
function onClick_loadVocab(){
  browser.tabs.sendMessage(currentTab.id, "getVocabList").then(vocabDownloaded, onError); //T Add proper Error Handling.
}

function vocabDownloaded(response){
  rawJson = response;
  browser.storage.local.set({"rawJson" : rawJson});
  rawJsonLoaded();
}

function rawJsonIsStored(data){
  if(data == null) return;
  rawJson = JSON.parse(data.rawJson);
  rawJsonLoaded();
}

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

browser.tabs.query({ active: true, currentWindow: true }).then(setCurrentTab, onError);

browser.storage.local.get("rawJson").then(rawJsonIsStored, onError);
