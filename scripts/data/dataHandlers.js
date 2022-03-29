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