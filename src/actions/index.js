// Action Creators
// Should return a type and other properties (payload)

export function addDocument(name, password, owner, collaborators) {
  return {type: 'ADD_DOC', name, password, owner, collaborators};
}
