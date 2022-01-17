const timer = $("#current-day");
const timeBlockContainer = $(".container");

//when the page loads 

// show the timer
setInterval(function(){ 
    timer.text(moment().format("YYYY-MM-DD HH:mm:ss"));
}, 1000);

function createRow(time) {
    // each row contains the following structure
    
    // <!-- rows -->
        //       <div class="row">
        //         <article class="col-2">
        //           <!-- time -->
        //           <span class="hour">9am</span>
        //         </article>
        //         <article class="col-8">
        //           <!-- text area -->
        //           <textarea cols="30" rows="10"></textarea>
        //         </article>
        //         <article class="col-2">
        //           <!-- button -->
        //           <button class="saveBtn">Save</button>
        //         </article>
        //       </div> 
    


    const row = $("<div>").attr("class", 'row');
    

    const timeCol = $("<article>").attr("class","col-2");

    const timeSpan = $("<span>").text(time + ":00");
    timeCol.append(timeSpan);

    row.append(timeCol);


// generate all the timeblock rows



// if the row belongs to past time - give it grey color (.past)
// if the row belongs to present time - (.present)
// if the row belongs to the future - (.future)

const timeNow = moment();

const isPast = time < Number (timeNow.format("H"));

const isPresent = time >= Number (timeNow.format("H")) && time <= ( Number (timeNow.format("H")) + 1);

const isFuture = time > Number(timeNow.format("H"));

let colorClass;

if(isPast) {
    colorClass = 'past';
}
if(isPresent) {
    colorClass = 'present';
}
if(isFuture) {
    colorClass = 'future';
}

    const textareaCol = $("<article>").attr("class", "col-8 " + colorClass);
    const textarea = $("<textarea>");



// when the user clicks on the save button

// save the content inside the text area to LS

const existingNote = localStorage.getItem(time + ":00");

if(existingNote){
    textarea.val(existingNote);
}

    textareaCol.append(textarea);

    row.append(textareaCol);

    const buttonCol = $("<article>").attr("class",'col-2');


    const button = $("<button>").attr("class", "saveBtn save-button");
    button.text('Save')
    buttonCol.append(button);
    row.append(buttonCol);

    return row;
}

    const row = createRow(9);

    // generate all the time block rows
    const times = [9, 10, 11, 12, 13, 14, 15, 16, 17]

// each row  
for (let index = 0; index < times.length; index++) {
    const time = times[index];
    const row = createRow(time);
    timeBlockContainer.append(row);
}


// when the user click on the save button for a row
$(document).on("click", ".save-button", function(event) {
    console.log("aaaa");

//  we want to save the content on the current row to local storage
// 1. grab the contect of text area
    console.log(event.target);
    const jButton = $(event.target);
    const jButtonCol = jButton.parent();

    const textarea = jButtonCol.prev().children();
   
    const userInput = textarea.val();
    console.log(userInput)

// 2. use the time as the ls key
    const timeSpan = jButtonCol.prev().prev().children();
    const timeOfRow = timeSpan.text();
    
// 3. save
    localStorage.setItem(timeOfRow, userInput);
});