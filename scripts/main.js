import { renderJournal } from "./journalEntryList.js"
import { buildAccordion } from "./accordion.js"
import { getAPIData } from "./data/dataHandlers.js"

//get API data, then buildoutlist of entries
const startJournal = () => {
    getAPIData()
    .then((journalData) => renderJournal(journalData))
    .then(() => buildAccordion())
}

startJournal()