//T Optimize with Set instead of Array for words[]
function generateUniqueVocabList(){
  const vocabList = rawJson.vocab_overview;
  let uniqueVocabList = [];
  let words = [];

  for(vocabItem of vocabList){
    // Check, whether a word is already in the uniqueVocabList
    let word = vocabItem.normalized_string;
    if (words.includes(word)) continue;
    words.push(word);

    uniqueVocabList.push(vocabItem);
  }

  return uniqueVocabList;
}

// Generate the filename out of the current date and the name of the course
function generateFileName(){ 
  const date = new Date().toJSON().slice(0,10);
  return courseLanguage + "-" + date;
  }
  
  // Generates the txt and csv files. As they are both similar in structure.
  // Only put in one Charakter as rowSeparator
  //T Fix the problem mentioned in the above Comment
function generateTableFile(collumnSeparator, rowSeparator, vocabList){
  let selectedData = getSelectedData();
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
  
function generateJsonFile(vocabList){
  let selectedData = getSelectedData();
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