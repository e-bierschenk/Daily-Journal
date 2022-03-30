import { renderForm, renderJournal } from "./journalEntryList.js"
import { buildAccordion } from "./accordion.js"
import { getAPIData, useJournals, createPost, deletePost, getSinglePost, updatePost, getLoggedInUser, setLoggedInUser, loginUser, logoutUser } from "./data/dataHandlers.js"
import { renderLoginForm } from "./auth/loginForm.js"

//get API data, then buildoutlist of entries
const startJournal = () => {
    getAPIData()
        .then(journalData => renderJournal(journalData))
        .then(() => {
            buildAccordion()
            renderForm()
        })

}

const checkLoggedIn = () => {
    if (sessionStorage.user) {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")))
        startJournal()
    } else {
        renderLoginForm()
    }
}
checkLoggedIn()


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
            entry: entry,
            userId: getLoggedInUser().id
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
            entry: entry,
            userId: getLoggedInUser().id
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

//event listener for login/register button
document.addEventListener("click", event => {
    if (event.target.id === "registerBtn"){
        //build user object
        const user = {
            name: document.querySelector("input[name='loginName']").value,
            email: document.querySelector("input[name='loginEmail']").value
        }
        //set logged in user
        loginUser(user)
            .then(startJournal)
    }
})

//event listener for logout button
document.addEventListener("click", event => {
    if (event.target.id === "logout") {
        logoutUser()
        document.querySelector("#entryLog").innerHTML = ''
        checkLoggedIn()
    }
})