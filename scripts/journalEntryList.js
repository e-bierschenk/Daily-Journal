/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data module component
 */
import { usePostCollection } from "./data/dataHandlers.js"
import { journalEntryComponent } from "./journalEntry.js"

// DOM reference to where all entries will be rendered
const entryLog = document.querySelector("#entryLog")

export const renderJournal = (journalList) => {
    // Use the journal entry data from the data module component
    for (const entry of journalList) {
        /*
            Invoke the component that returns an
            HTML representation of a single entry
        */
        entryLog.innerHTML += journalEntryComponent(entry)
    }
}