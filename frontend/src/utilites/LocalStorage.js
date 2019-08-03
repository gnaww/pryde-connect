export function saveStateWithPath(path, state) {
    saveState(state);
    return path;
}

export const saveState = state => {
    var keys = Object.keys(state);
    for (var i in keys) {
        localStorage.setItem(keys[i], JSON.stringify(state[keys[i]]));
    }
}

export const popState = key => {
    var state = JSON.parse(localStorage.getItem(key));
    sessionStorage.removeItem(key);
    return state;
}