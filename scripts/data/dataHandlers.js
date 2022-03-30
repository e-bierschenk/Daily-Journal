let postCollection = []

export const useJournals = () => {
    //Best practice: we don't want to alter the original state, so
    //make a copy of it and then return it
    //The spread operator makes this quick work
    return [...postCollection];
  }

export const getAPIData = () => {
    return fetch("http://localhost:8088/entries?_sort=id&_order=desc")
    .then(response => response.json())
    .then(parsedResponse => {
        postCollection = parsedResponse
        return parsedResponse
    })
}

export const createPost = (postObj) => {
    return fetch("http://localhost:8088/entries", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
    .then(response => response.json())
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/entries/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
}

export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/entries/${postId}`)
    .then(response => response.json())
}

export const updatePost = (postObj) => {
    return fetch(`http://localhost:8088/entries/${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
    .then(response => response.json())
}

/*----------------------
        AUTH
-----------------------*/
let loggedInUser = {}

export const getLoggedInUser = () => loggedInUser

export const logoutUser = () => {
    loggedInUser = {}
    sessionStorage.clear()
}

export const setLoggedInUser = userObj => {
    loggedInUser = userObj
    sessionStorage.setItem("user", JSON.stringify(loggedInUser))
}

export const loginUser = userObj => {
    return fetch(`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
        .then(response => response.json())
        .then(parsedUser => {
            if (parsedUser.length > 0) {
                setLoggedInUser(parsedUser[0])
                return getLoggedInUser()
            } else {
                createUser(userObj)
                    .then(response => setLoggedInUser(response))
            }
        })
}

const createUser = userObj => {
    return fetch(`http://localhost:8088/users`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
}