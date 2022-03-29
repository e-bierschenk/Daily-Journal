/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data module component
 */
import { useJournals } from "./data/dataHandlers.js"
import { journalEntryComponent, journalForm } from "./journalEntry.js"


export const renderJournal = (journalList) => {
    // DOM reference to where all entries will be rendered
    const entryLog = document.querySelector("#entryLog")

    entryLog.innerHTML=''
    // Use the journal entry data from the data module component
    for (const entry of journalList) {
        /*
            Invoke the component that returns an
            HTML representation of a single entry
        */
        entryLog.innerHTML += journalEntryComponent(entry)
    }
}

export const renderForm = (postObj = null) => {
    const formEl = document.querySelector("#journalForm")
    formEl.innerHTML = journalForm(postObj)

    if(postObj){
        const conceptEl = document.querySelector("#journalConcepts")
        const entryEl = document.querySelector("#journalText")
        const selectEl = document.querySelector("#journalMood")

        conceptEl.value = postObj.concept
        entryEl.value = postObj.entry
        selectEl.value = postObj.mood.toLowerCase()
    }
}