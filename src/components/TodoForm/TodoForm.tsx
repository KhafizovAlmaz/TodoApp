import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, {useContext, useState} from 'react';
import { ContextApp } from '../../App';
import { ActionType } from '../../types/stateType';
import { TodoName } from '../../types/todoType';


const TodoForm: React.FC = () => {
    //Используем useState для создания локального state для формы
    const [value, setValue] = useState('');

    //Получаем  dispatch-метод из контекста
    const {changeState} = useContext(ContextApp);
    
    //Отправляем изменение значения input в форме в локальный state
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    
    //Отправляем редьюсеру action - добавление задачи в state, после очищаем input в форме
    const addTodo = (event: React.FormEvent<HTMLFormElement>, todo: TodoName) => {
        event.preventDefault();
        changeState({type: ActionType.ADD, payload: todo});
        setValue('');
    }

    return <form
        onSubmit={(event) => {
            addTodo(event, value)
        } }
    >
        <TextField id="Add todo"
            label={'Add todo'}
            margin="normal"
            size="medium"
            required={true}
            onChange={handleChange}
            value={value} />
        <IconButton color='primary'
            type='submit' sx={{
        '& > :not(style)': { m: 2.5},
        }}>
         <SendIcon />
        </IconButton>

    </form>

}

export default TodoForm;