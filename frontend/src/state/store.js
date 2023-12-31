import { createStore } from "redux";

const initialState = { user : null};

export const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'SET':
            return { user : action.payload };
        case 'CLEAR':
            return initialState;
        default:
            return state;
    }
}

export const store = createStore(userReducer);