export default function reducer(state = {}, action) {
    switch (action.type) {
        case "SET_CURRENT":
        console.log(action);
            return action.current;
        default:
            return state;
    }
}
