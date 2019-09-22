// last entry 2018 06 22
// first entry 2016 12 28
// became PR 2019 01 14

class App{
        // App Variables
        tripList = [];
        nbDaysBeforeApply = null;
        dateFirstEntryString = null;
        datePr = null;
        nbDays = null;

        // HTML Elements
        firstEntryElmt = null;
        datePrElmt = null;
        nbDaysBeforeApplyElmt = null;
        historyStartElmt = null;
        dateFirstEntryStringElmt = null;

        constructor(){
            this.initHtmlElement()
        }

        initHtmlElement(){
            try{
                this.firstEntryElmt = document.getElementById("dateFirstEntry");
                this.datePrElmt = document.getElementById("datePr");
                this.nbDaysBeforeApplyElmt = document.getElementById("nbDaysBeforeApply");
                this.historyStartElmt = document.getElementById("historyStart");
                this.dateFirstEntryStringElmt = document.getElementById("dateFirstEntryString");

                if(this.firstEntryElmt && this.datePrElmt){
                    this.firstEntryElmt.addEventListener("input", (event)=>{
                        this.firstEntryElmt.value = formatDateInput(event.target.value);
                        this.dateFirstEntry = validJsDate(this.firstEntryElmt.value);
                        this.dateFirstEntryStringElmt.innerText = this.dateFirstEntry;
                    })
                }
                else{
                    throw "impossible to find date input elements"
                }
            }
            catch(err){
                console.error(err);
            }
        }
}

let myApp = null;
window.onload = function(){
    try{
        myApp = new App();
    }
    catch(err){
        console.error(err);
    }
    
    
}

