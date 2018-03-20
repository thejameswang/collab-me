export default function reducer(state = {}, action) {
  switch (action.type) {
  case "SET_USER":
    return action.user;
  case "DELETE_USER":
    return {};
  default:
    return state;
  }
}
