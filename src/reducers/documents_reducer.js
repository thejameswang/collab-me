export default function reducer(state = [], action) {
    switch (action.type) {
        case "SET_DOCS":
            return action.documents;
        case "ADD_DOC":
            const addNewState = [...state];
            console.log(action);
            // create the todo from the action object
            const newDoc = {
                name: action.doc.name,
                owner: action.doc._id
            };
            // okay to mutate our own copy
            addNewState.push(newDoc);
            return addNewState;
        default:
            return state;
    }
}
