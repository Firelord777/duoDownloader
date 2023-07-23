//Hides the data, when rawData is chosen, because rawData does not need the data selector.
const selectorFileType = document.getElementById("selectorFileType");
selectorFileType.addEventListener("change", onChange_selectorFileType);
function onChange_selectorFileType(){
  const selectorData = document.getElementById("selectorData");
  selectorData.hidden =getSelectedFileType() == "rawData";
}

// Check to test if the user currently is on Duolingo
const divIsDuo = document.getElementById("isDuo");
const divIsNotDuo = document.getElementById("isNotDuo");

function toggleIsDuo(){
  // Get the current tabs
 const url = currentTab.url;
 
 const isDuo = url.includes("www.duolingo.com/");
  
 //Hides and shows the apropriate tabs.
 divIsDuo.hidden = !isDuo;
 divIsNotDuo.hidden = isDuo;
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