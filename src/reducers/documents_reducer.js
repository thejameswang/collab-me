export default function reducer(state = [], action) {
    switch (action.type) {
        case "SET_DOCS":
            return action.documents;
        case "ADD_DOC":
            const addNewState = [...state];
            const newDoc = {
                name: action.doc.name,
                owner: action.doc._id
            };
            addNewState.push(newDoc);
            return addNewState;
        default:
            return state;
    }
}
