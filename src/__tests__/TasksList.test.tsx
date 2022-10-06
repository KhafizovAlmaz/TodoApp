import * as React from 'react';
import {ContextApp} from "../App";
import { initialState } from "../reducers/todoReducer";

import {shallow} from "enzyme";
import {cleanup, render} from "@testing-library/react";

import TodoList from "../components/TodoList/TodoList";
import {State} from "../types/stateType";

describe('<TodoList />',() => {

    afterEach(cleanup);

// Создаём тестовый стейт
    const testState: State = {
        newTodo: '',
        todos: [{name: 'test', isDone: false}, {name: 'test2', isDone: false}]
    }

// Передаём в ContextApp созданный тестовый стейт
    const Wrapper = () => {
        return (
            <ContextApp.Provider value={{state: testState, changeState: () => null}}>
                <TodoList/>
            </ContextApp.Provider>
            )
    }

    it('renders the component without changes', () => {
        const component = shallow(<Wrapper/>);
        expect(component).toMatchSnapshot();
    });

    it('should render right tasks length', async () => {
        const {container} = render(<Wrapper/>);

        // Проверяем длину отображаемого списка
        expect(container.querySelectorAll('li')).toHaveLength(testState.todos.length);
    });

})