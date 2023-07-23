// Check to test if the user currently is on Duolingo
const divIsDuo = document.getElementById("isDuo");
const divIsNotDuo = document.getElementById("isNotDuo");
function toggleIsDuo(){
  const url = currentTab.url;
 
  const isDuo = url.includes("www.duolingo.com/");
  
  //Hides and shows the apropriate tabs.
  divIsDuo.hidden = !isDuo;
  divIsNotDuo.hidden = isDuo;
}

function showDownloadCompleted(){
  const divDownloadComplete = document.getElementById("downloadComplete");
  //Displays the language of the downloaded course. 
  const bCourseLanguage = document.getElementById("courseLanguage");
  bCourseLanguage.innerHTML = courseLanguage;
  
  divIsDuo.hidden = true;
  divDownloadComplete.hidden = false;
}

//reads the value of the filetype selector
function getSelectedFileType(){
  const selectedIndex = selectorFileType.selectedIndex;
  return selectorFileType[selectedIndex].value;
}

//Reads out which checkBoxes have been checked
function getSelectedData(){
  const dataCheckBoxes = document.getElementsByClassName("selectorDataCheckBox");
  var selectedBoxes = {};
  for(dCheckBox of dataCheckBoxes){
    selectedBoxes[dCheckBox.name] = dCheckBox.checked;
  }
  return selectedBoxes;
}

//Hides the data, when rawData is chosen, because rawData does not need the data selector.
const selectorFileType = document.getElementById("selectorFileType");
selectorFileType.addEventListener("change", onChange_selectorFileType);
function onChange_selectorFileType(){
  const selectorData = document.getElementById("selectorData");
  selectorData.hidden =getSelectedFileType() == "rawData";
}

//Downloads a string into a file in the users Download Directory
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