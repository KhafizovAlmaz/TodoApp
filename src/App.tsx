import React from 'react';
import './App.css';
import TodoForm from './components/TodoForm/TodoForm';
import Typography from '@mui/material/Typography/Typography';
import TodoList from './components/TodoList/TodoList';
import { initialState, todoReducer } from './reducers/todoReducer';
import {useReducer} from "react";
import { ContextState, State, Action } from './types/stateType';

//Создаем контекст с дефолтными значениями state и changeState
export const ContextApp = React.createContext<ContextState>({state:initialState, changeState: () => null});

const App: React.FC = () => {

  //Передаем созданный todoReducer как аргумент в useReducer. В state попадает initialState, а changeState будет его обновлять с помощью todoReducer
  const [state, changeState] = useReducer<React.Reducer<State, Action>>(todoReducer, initialState);

  const ContextValue: ContextState = {
    state,
    changeState
};

  return (
    <div className="App">
      <header className="App-header">
        <Typography component="h1" variant="h2">
          Todo List
        </Typography>
      </header>
      
      {/* Оборачиваем компоненты в контекст и передаем в value стейт и метод его изменения */}
      <ContextApp.Provider value={ContextValue}>
        <TodoForm/>
        <TodoList/>
      </ContextApp.Provider>      
    </div>
  );
}

export default App;
