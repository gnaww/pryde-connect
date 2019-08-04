export function saveStateWithPath(path, state) {
    console.log('save state with path called')
    saveState(state);
    return path;
};

export const saveState = state => {
    let keys = Object.keys(state);
    for (let i in keys) {
        localStorage.setItem(keys[i], JSON.stringify(state[keys[i]]));
    };
};

export const popState = key => {
    let state = JSON.parse(localStorage.getItem(key));
    localStorage.removeItem(key);
    return state;
};
