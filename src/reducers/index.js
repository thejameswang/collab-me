import axios from 'axios';
const dbUrl = "/db";

// Inside app/reducers/index.js
const reducer = (state = [], action) => {

  switch (action.type) {
    case 'ADD_DOC':
    console.log("made it to ADD_DOC reducer!");
      // copy new state so no mutations to old state
      const addNewDoc = [...state];

      // create the todo from the action object
      const newDoc = {
        name: action.name
        // password: action.password,
        // owner: {},
        // collaborators: {}
      };

      // okay to mutate our own copy
      addNewDoc.push(newDoc);
      return addNewDoc;

    default:
      return state;
  }
};

export default reducer;
