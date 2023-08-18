console.log("DuoDownloader: duoContent script has been loaded.");

// A way to recieve Messages from other script.
// Futureproof by recieving a message, that tells the handler, which function to call.
browser.runtime.onMessage.addListener(onMessage_recieveMessage);

function onMessage_recieveMessage(message){
  console.log("[DuoDownloader]: message recieved: " + message);

  if(message == "getVocabList") return getVocabList(); //Can only be called, when on Duolingo.
}

async function getVocabList(){
  const response = await fetch('https://www.duolingo.com/vocabulary/overview');
    
  const responseJson = await response.json();

  return Promise.resolve(responseJson);
}