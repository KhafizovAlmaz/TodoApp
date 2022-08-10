import {Todo, Todos} from "./todoType";
import {Dispatch} from "react";

//В состоянии хранится массив уже созданных задач
export type State = {
    todos: Todos
}

//Пишем возможные типы действий со стейтом
export enum ActionType {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    TOGGLE = 'TOGGLE'
}

//Для действия ADD доступна передача только строковых значений
type ActionStringPayload = {
    type: ActionType.ADD 
    payload: string
}

// Для действий TOGGLE и REMOVE доступна передача только объекта типа Todo
type ActionObjectPayload = {
    type: ActionType.TOGGLE | ActionType.REMOVE,
    payload: Todo
}

//Объединяем предыдущие две группы для использования в редьюсере
export type Action = ActionStringPayload | ActionObjectPayload;

//Наш контекст состоит из стейта и функции-редьюсера, в которую будут передаваться Action. Тип Dispatch импортируется из библиотеки react
export type ContextState = {
    state: State;
    changeState: Dispatch<Action>
}