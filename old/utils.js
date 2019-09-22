function validJsDate(formattedDate){
    console.log("jebghkgjr");
    
    let yearMonthDay = formattedDate.split("-");
    if(yearMonthDay.length !== 3){
        return null;
    }
    let year = yearMonthDay[0];
    let month = yearMonthDay[1];
    let day = yearMonthDay[2];
    if(year < 0 || year < 1000){
        return null;
    }
    if(month < 1 || month > 12){
        return null;
    }
    if(day < 1 || day > 31){
        return null;
    }

    let actualJsDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day))
    return actualJsDate;
}

function spliceString(str, index, count, add) {
    // We cannot pass negative indexes directly to the 2nd slicing operation.
    if (index < 0) {
      index = str.length + index;
      if (index < 0) {
        index = 0;
      }
    }
  
    return str.slice(0, index) + (add || "") + str.slice(index + count);
  }

  function formatDateInput(inputText){
    if(inputText.length > 4 && inputText[4]!=="-"){
        inputText = spliceString(inputText, 4, 0, "-"); 
    }
    if(inputText.length > 7 && inputText[7]!=="-"){
        inputText = spliceString(inputText, 7, 0, "-"); 
    }
    if(inputText[inputText.length-1]==="-"){
        inputText = inputText.slice(0, -1);
    }
    if(inputText.length > 10){
        inputText = inputText.slice(0, 10);
    }
    return inputText;
  }