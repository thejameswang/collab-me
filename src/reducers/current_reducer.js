export default function reducer(state = {}, action) {
    switch (action.type) {
        case "SET_CURRENT":
            return action.current;
        default:
            return state;
    }
}
