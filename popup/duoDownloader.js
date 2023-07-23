let currentTab = "";
let courseLanguage = "";
let rawJson = "";


async function setCurrentTab(){
  const tabs = await browser.tabs.query({ active: true, currentWindow: true }); // Get a list of all tabs
  currentTab = tabs[0];
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
  courseLanguage = rawJson.language_string;

  //Displays the language of the downloaded course. 
  const bCourseLanguage = document.getElementById("courseLanguage");
  bCourseLanguage.innerHTML = courseLanguage;

  divIsDuo.hidden = true;
  divDownloadComplete.hidden = false;
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

// Generate the filename out of the current date and the name of the course
function generateFileName(){ 
  const date = new Date().toJSON().slice(0,10);
  return courseLanguage + "-" + date;
}

// Generates the txt and csv files. As they are both similar in structure.
// Only put in one Charakter as rowSeparator
//T Fix the problem mentioned in the above Comment
function generateTableFile(collumnSeparator, rowSeparator){
  let selectedData = getSelectedData();
  const vocabList = rawJson.vocab_overview;
  let file = "";

  for(vocabItem of vocabList){
    if(selectedData.word) file += vocabItem.normalized_string += collumnSeparator;
    if(selectedData.category) file += vocabItem.skill += collumnSeparator;
    if(selectedData.lastLearned) file += vocabItem.last_practiced += collumnSeparator;

    file = file.slice(0, -1); //Makes sure that the line does not end in a collumnSeparator
    file += rowSeparator;
  }
  return file;
}

function generateJsonFile(){
  let selectedData = getSelectedData();
  const vocabList = rawJson.vocab_overview;
  let file = []; 

  let word;
  for(vocabItem of vocabList){
    word = {};

    if(selectedData.word) word["word"] = vocabItem.normalized_string;
    if(selectedData.category) word["category"] = vocabItem.skill;
    if(selectedData.lastLearned) word["lastLearned"] = vocabItem.last_practiced;

    file.push(word);
  }
  return file;
}

await setCurrentTab();
toggleIsDuo();