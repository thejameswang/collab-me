// Action Creators
// Should return a type and other properties (payload)

export function addDocument(doc) {
    return {type: 'ADD_DOC', doc};
}

export function setDocuments(documents) {
    return {type: 'SET_DOCS', documents};
}

export function setUser(user) {
    return {type: 'SET_USER', user};
}

export function deleteUser(user) {
    return {type: 'DELETE_USER', user};
}
