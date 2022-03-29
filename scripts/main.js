import { renderForm, renderJournal } from "./journalEntryList.js"
import { buildAccordion } from "./accordion.js"
import { getAPIData, useJournals, createPost, deletePost, getSinglePost, updatePost } from "./data/dataHandlers.js"

//get API data, then buildoutlist of entries
const startJournal = () => {
    getAPIData()
        .then((journalData) => renderJournal(journalData))
        .then(() => {
            buildAccordion()
            renderForm()
        })

}

startJournal()

/*----------------------------
       EVENT LISTENERS
-----------------------------*/

// event listener for create post button
const formEl = document.querySelector(".form")
formEl.addEventListener("click", event => {
    event.preventDefault();

    
    if (event.target.id === "journalSubmitBtn") {
        const mood = document.querySelector("#journalMood").value
        const concept = document.querySelector("#journalConcepts").value
        const entry = document.querySelector("#journalText").value

        const postObj = {
            date: Date.now(),
            mood: mood,
            concept: concept,
            entry: entry
        }

        createPost(postObj)
            .then(getAPIData)
            .then(postCollection => renderJournal(postCollection))
            .then(renderForm)
    }
})

//event listener for update post button
formEl.addEventListener("click", event => {
    event.preventDefault()

    if (event.target.id === "journalEditBtn"){
        const id = document.querySelector("input[name='postId'").value
        const date = document.querySelector("input[name='postTime'").value
        const mood = document.querySelector("#journalMood").value
        const concept = document.querySelector("#journalConcepts").value
        const entry = document.querySelector("#journalText").value 

        const postObj = {
            id: id,
            date: date,
            mood: mood,
            concept: concept,
            entry: entry
        }
        
        updatePost(postObj)
            .then(getAPIData)
            .then(response => {
                renderJournal(response)
                renderForm()
            })
    }

})

// event listener for clicks on edit button
const journal = document.querySelector(".journal")

journal.addEventListener("click", (event) => {
    if (event.target.id.startsWith("edit")) {
        getSinglePost(event.target.id.split("--")[1])
            .then((response) => {
                //display results
                renderForm(response)
            })
    }
})

//event listener for cancel button
document.addEventListener("click", event => {
    if (event.target.id === "cancel"){
        renderForm()
    }
})

//event listener for DELETE button
journal.addEventListener("click", (event) => {
    if (event.target.id.startsWith("delete")) {
        deletePost(event.target.id.split("--")[1])
            .then(getAPIData)
            .then(postCollection => renderJournal(postCollection))
    }
})

//event listener for filtering by mood
const filterEl = document.querySelector("#mood-filter")
filterEl.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        const filteredArray = useJournals().filter(journal => journal.mood === filterEl.value)
        renderJournal(filteredArray)
    }
})