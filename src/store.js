import React, { createContext, useReducer } from 'react';

const initialState = {
    darkMode: true,
}

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'change mode':
                return {darkmode: !state.darkmode}

            default: 
                throw new Error();
        }
    }, initialState);
    return <Provider value = {{ state, dispatch }}>{ children }</Provider>
}

export { store, StateProvider };