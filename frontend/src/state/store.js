import { combineReducers, createStore } from "redux";

const initialState = null;

export const userReducer = (state = null,action)=>{
    switch(action.type){
        case 'SET':
            return {...state, user : action.payload};
        case 'CLEAR':
            return {...state, user : null};
        default:
            return state;
    }
}

const combinedReducers = combineReducers({
    user : userReducer,
})

export const store = createStore(combinedReducers);