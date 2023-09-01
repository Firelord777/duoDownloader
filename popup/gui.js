// Shows one of the windows, and make sure, that ONLY one is shown.
function showWindow(windowKey){
  const windows = {
    "isDuo" : document.getElementById("isDuo"),
    "isNotDuo" : document.getElementById("isNotDuo"),
    "downloadComplete" : document.getElementById("downloadComplete")
  }

  for (wKey in windows) windows[wKey].hidden = true; // Hides all windows.
  windows[windowKey].hidden = false; // Shows the one requested to be shown.
}

function currentTabIsDuo(){
  const url = currentTab.url;
  return url.includes("www.duolingo.com/");
}

// Selects, wether isDuo or isNotDuo is shown.
function toggleIsDuo(){
  if(currentTabIsDuo()) showWindow("isDuo");
  else showWindow("isNotDuo");
}

//Two functions to disable a button and enable the wait cursor, while a button action is performed.
function buttonWait(button){ //Disables
  button.disabled = true;
  button.style.cursor = "wait";
}
function buttonWaitFinished(button){ //Enables again
  button.disabled = false;
  button.style.cursor = "default";
}

function showErrorBox(error){
  browser.scripting.executeScript({
    target: {
      tabId: currentTab.id,
    },
    func: (errorMessage) => {
      alert("[DuoDownloader] \n The error: \n" + errorMessage + "\n has been thrown. \n If the problem persists contact: \n dev@mhuckle.de \n with the error message.");      
    },
    args: [error.message]
  });
}

// Constructs the DownloadCompleted div then displays it.
function showDownloadCompleted(){
  // Displays Courselanguage
  const bCourseLanguage = document.getElementById("courseLanguage");
  bCourseLanguage.textContent = courseLanguage;

  //Displays Coursewordcount
  const bWordCount = document.getElementById("wordCount");
  bWordCount.textContent = rawJson.vocab_overview.length;

  // Toggles the wordlist reload button
  const buttonReloadRawJson = document.getElementById("buttonReloadRawJson");
  const buttonRRJDisabled = document.getElementById("buttonRRJDisabled");
  buttonReloadRawJson.hidden = !currentTabIsDuo();
  buttonRRJDisabled.hidden = currentTabIsDuo();
  showWindow("downloadComplete");
}

// Reads the value of the filetype selector
function getSelectedFileType(){
  const selectedIndex = selectorFileType.selectedIndex;
  return selectorFileType[selectedIndex].value;
}

// Reads out which checkBoxes have been checked
function getSelectedData(){
  const dataCheckBoxes = document.getElementsByClassName("selectorDataCheckBox");
  var selectedBoxes = {};
  for(dCheckBox of dataCheckBoxes){
    selectedBoxes[dCheckBox.name] = dCheckBox.checked;
  }
  return selectedBoxes;
}

// Hides the data selector, when rawData is chosen, because rawData does not need the data selector.
const selectorFileType = document.getElementById("selectorFileType");
selectorFileType.addEventListener("change", onChange_selectorFileType);
function onChange_selectorFileType(){
  const selectorData = document.getElementById("selectorData");
  selectorData.hidden =getSelectedFileType() == "rawData";
}