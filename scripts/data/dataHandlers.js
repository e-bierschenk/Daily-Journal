let postCollection = []

export const usePostCollection = () => {
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