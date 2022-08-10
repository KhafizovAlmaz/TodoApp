import React, { useContext } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ContextApp } from "../../App";
import { Todo } from "../../types/todoType";
import { ActionType } from "../../types/stateType";

const TodoList: React.FC = () => {
    //Получаем state и dispatch-метод из контекста
    const {state, changeState} = useContext(ContextApp);

    //Отправляем редьюсеру action - удаление задачи из state
    const deleteTodo = (todoForRemoving: Todo) => {
        changeState({type: ActionType.REMOVE, payload: todoForRemoving})
    }

    //Отправляем редьюсеру action - обновляем статус задачи
    const toggleClick = (todoForChange: Todo) => {
        changeState({type: ActionType.TOGGLE, payload: todoForChange})
    }

    return <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', margin: 'auto' }}>
        {state.todos.map((todo,i) => (
            <ListItem key={i} 
            dense button 
            secondaryAction={
                <IconButton edge="end" aria-label="delete" size="large" onClick={()=>deleteTodo(todo)}>
                    <DeleteIcon />
                </IconButton>
            }>
                <Checkbox tabIndex={-1} disableRipple  onChange={()=>toggleClick(todo)} checked={todo.isDone}/>
                <ListItemText primary={todo.name} sx={todo.isDone ? { textDecoration: 'line-through', color: 'gray'} : null}/>
        </ListItem>
        ))}
    </List>
}

export default TodoList;