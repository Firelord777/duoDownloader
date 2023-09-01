let currentTab = "";
let courseLanguage = "";
let rawJson = "";

function setCurrentTab(tabs){
  currentTab = tabs[0];
  toggleIsDuo();
}

// Handles any error thrown by a .then() 
function onError(error) {
    console.error("[DuoDownloader]: ${error}");
}

function handleMajorError(error){
  onError(error);
  showErrorBox(error);
}

// A button to fetch and download the raw Json vocabList from Duolingo.
const buttonLoadVocab = document.getElementById("loadVocab");
buttonLoadVocab.addEventListener("click", onClick_loadVocab);
// Button to reload the wordlist goes through same listener.
const buttonReloadRawJson = document.getElementById("buttonReloadRawJson");
buttonReloadRawJson.addEventListener("click", onClick_loadVocab);

async function onClick_loadVocab(event){
  buttonWait(event.target);

  try{
    // Goes through a content script to circumvent CORS restrictions.
    response = await browser.scripting.executeScript({
      target: {
        tabId: currentTab.id,
      },
      func: async () => {
        console.log("[DuoDownloader]: The download of the rawJson data has been requested.");

        const response = await fetch('https://www.duolingo.com/vocabulary/overview');
        const responseJson = await response.json();
      
        return Promise.resolve(responseJson);
      }
    });

    result = response[0].result;

    vocabDownloaded(result);
  }catch(error){
    handleMajorError(error);
  }

  buttonWaitFinished(event.target);
}

//Stores the downloaded rawJson and proceeds from there.
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

// Downloads a given file to the users download directory
function downloadFile(text, filename){
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  browser.downloads.download({url: url,  filename: filename});
}

//File Download Button
const buttonDownloadFile = document.getElementById("buttonDownloadFile");
buttonDownloadFile.addEventListener("click", onClick_buttonDownloadFile);
function onClick_buttonDownloadFile(){
  if(getSelectedData().removeDuplicates) vocabList = generateUniqueVocabList();
  else vocabList = rawJson.vocab_overview;
  
  switch(getSelectedFileType()){
    case "rawData" : downloadFile(JSON.stringify(rawJson, null, 4), generateFileName() + ".json"); break;
    case "txt" : downloadFile(generateTableFile("\t", "\n", vocabList), generateFileName() + ".txt"); break;
    case "csv" : downloadFile(generateTableFile(",", "\n", vocabList), generateFileName() + ".csv"); break;
    case "json" : downloadFile(JSON.stringify(generateJsonFile(), null, 4, vocabList), generateFileName() + ".json"); break;
  }
}

//Called every time the popUp is opened.
browser.tabs.query({ active: true, currentWindow: true }).then(setCurrentTab, onError); //Used to toggle the isDuo Window
browser.storage.local.get(["rawJson", "rawJsonDate"]).then(rawJsonFromStorage, onError); //Used to load rawJson from storage.local and to possibly skip isDuo Window