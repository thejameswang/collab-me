// Action Creators
// Should return a type and other properties (payload)

export function addDocument(name, owner, collaborators) {
  return {type: 'ADD_DOC', name, owner, collaborators};
}
