
const pIsDuo = document.getElementById("isDuo");


// Get the currently active tab
browser.tabs.query({ active: true, currentWindow: true })
  .then(compareTab, onError);


function compareTab(tabs){
    const currentTab = tabs[0];
    const url = currentTab.url;
    
    const isDuo = url.includes("www.duolingo.com/");
    pIsDuo.innerHTML = isDuo;
}

function onError(error) {
    console.log(`Error: ${error}`);
  }