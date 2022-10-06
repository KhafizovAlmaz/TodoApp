import {todoReducer} from "../reducers/todoReducer";
import {ActionType, Action, State} from "../types/stateType";
import {Todo} from "../types/todoType";

describe('todoReducer',()=>{
    it('returns new state for "Add" type', () => {
        // Создаём стейт с пустым массивом задач
        const initialState: State = {newTodo: '', todos: []};

        // Создаём действие 'ADD' и передаём в него текст 'new todo'
        const updateAction: Action = {type: ActionType.ADD, payload: 'new todo'};

        // Вызываем редьюсер с переданными стейтом и экшеном
        const updatedState = todoReducer(initialState, updateAction);

        // Ожидаем получить в стейте добавленную задачу
        expect(updatedState).toEqual({newTodo: '', todos: [{name: 'new todo', isDone: false}]});
    });

    it('returns new state for "Remove" type', () => {
        const todo: Todo = {name: 'new todo', isDone: false}
        const initialState: State = {newTodo: '', todos: [todo]};
        const updateAction: Action = {type: ActionType.REMOVE, payload: todo};
        const updatedState = todoReducer(initialState, updateAction);
        expect(updatedState).toEqual({newTodo: '', todos: []});
    });

    it('returns new state for "Toggle" type', () => {
        const todo: Todo = {name: 'new todo', isDone: false}
        const initialState: State = {newTodo: '', todos: [todo]};
        const updateAction: Action = {type: ActionType.TOGGLE, payload: todo};
        const updatedState = todoReducer(initialState, updateAction);
        expect(updatedState).toEqual({newTodo: '', todos: [{name: 'new todo', isDone: true}]});
    });

})