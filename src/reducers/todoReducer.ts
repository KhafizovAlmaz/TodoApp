import  React from "react";
import {State, Action, ActionType} from "../types/stateType";

//Создаем state
export const initialState: State = {
    todos: []
};

//Создаем редьюсер, который принимает state и объект action с полями type и payload 
export const todoReducer: React.Reducer<State, Action> = (state = initialState, action):State => {
    switch (action.type) {
        case ActionType.ADD: {
            return {...state, todos: [...state.todos, {
                    name: action.payload,
                    isDone: false
                }]}
        }
        case ActionType.REMOVE: {
            return {...state, todos:  [...state.todos.filter(todo => todo !== action.payload)]}
        }
        case ActionType.TOGGLE: {
            return {...state, todos: [...state.todos.map((todo) => (todo !== action.payload ? todo : {...todo, isDone: !todo.isDone}))]}
        }
        default: throw new Error('Unexpected action');
    }
};