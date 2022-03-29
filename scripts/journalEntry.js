/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const journalEntryComponent = (entry) => {
    return `
        <article class="journal__entry" id="entry--${entry.id}">
        <div class="journal__header">
            <h2>Concepts: ${entry.concept}</h2>
            <h3>Mood: ${entry.mood}</h3>
        </div>
        <div class="journal__body">
            <p class="journal__text">${entry.entry}</p>
            <div class="button--edit">
                <button class="button button--edit" id="edit--${entry.id}">Edit</button>
                <button class="button button--delete" id="delete--${entry.id}">Delete</button>
            </div>

        </div>
    `
}

export const journalForm = (postObj = null) => {
    let htmlString =  `
    <div class="form-top-row">
        <fieldset class="form__field">
            <label for="journalDate">Date of entry</label>
            <input type="date" name="journalDate" id="journalDate">
        </fieldset>
        <fieldset class="form__field">
            <label for="journalMood">Mood</label>
            <select name="journalMood" id="journalMood">
                <option value="happy">Happy</option>
                <option value="fine">Fine</option>
                <option value="sad">Sad</option>
                <option value="inspired">Inspired</option>
                <option value="murder">Murderous</option>
            </select>
        </fieldset>
    </div>
        <fieldset class="form__field">
            <label for="journalConcepts">Concepts covered</label>
            <input type="text" name="journalConcepts" id="journalConcepts">
        </fieldset>
        <fieldset class="form__field">
            <label for="journalText">Journal Entry</label>
            <textarea form="journalForm" name="journalText" id="journalText" rows="6" cols="64"></textarea>
        </fieldset>`
        
        if(postObj){
            htmlString += `
            <input type="hidden" value="${postObj.id}" name="postId">
            <input type="hidden" value="${postObj.date}" name="postTime">
            <div id="buttonDiv">
                <button class="button button--delete" id="cancel">Cancel</button>
                <button class="button button--record button--green" id="journalEditBtn">Edit Journal Entry</button>
            </div>
            ` 
        } else {
            htmlString += `
            <div id="buttonDiv">
                <button class="button button--record button--green" id="journalSubmitBtn">Submit Journal Entry</button>
            </div>
            `
        }

    return htmlString
}