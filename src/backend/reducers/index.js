import axios from 'axios';
const dbUrl = "/db";

// Inside app/reducers/index.js
const reducer = (state = {
    documents: {}
}, action) => {

  switch (action.type) {

    case 'ADD_DOC':
    console.log("made it");
    //   // copy new state so no mutations to old state
    //   const addIdeaState = [...state];
      //
    //   // create the todo from the action object
    //   const newDoc = {
    //     name: action.name,
    //     password: action.password,
    //     owner: action.owner,
    //     collaborators: action.collaborators
    //   };
    //   // okay to mutate our own copy
    //   addIdeaState.push(newDoc);
    //   return addIdeaState;
    return state;

    default:
      return state;
  }
};

export default reducer;
