import * as React from 'react';
import {shallow} from 'enzyme';

import App from "../App";
import {fireEvent, render, waitFor, cleanup} from "@testing-library/react";
import {act} from "@testing-library/react-hooks";

describe('<App />', () => {
    // jest-функция afterEach с переданным коллбеком cleanup вызывается после каждого теста и очищает среду тестирования
    afterEach(cleanup);

    it('renders the component without changes', () => {
        //  метод shallow библиотеки enzyme позволяет производить юнит-тестирование, без отрисовки дочерних компонентов. 
        const component = shallow(<App />);

        // При первом запуске теста будет создан снимок компонента. При последующих тестированиях будет проверяться идентичность снимка с текущим содержимым компонента. Для обновления snapshots необходимо запустить тест с флагом -u: jest -u
        expect(component).toMatchSnapshot();
    });

    it("renders the heading", () => {
        const result = shallow(<App />).contains(<h1>React + TypeScript</h1>);
        expect(result).toBeTruthy();
    });

    // Так как в компоненте будут происходить асинхронные действия (вызываться события на DOM-элементах), оборачиваем тест в async
    it('should render right input value',  async () => {
        
        // render() функция доступна в библиотеке @testing-library/react" и отличается от shallow() тем, что строит настоящее DOM-дерево для тестируемого компонента. Переменная container  — это элемент div, в который будет выведен компонент.
        const {container} = render(<App/>);
        expect(container.querySelector('input').getAttribute('value')).toEqual('');
        act(()=>{
            // вызываем событие изменения инпута и передаём туда значение 'test'
            fireEvent.change(container.querySelector('input'), {
                target: {
                    value: 'test'
                },
            })
        })
        await waitFor(() => {
            // ожидаем получить в инпуте значение 'test'
            expect(container.querySelector('input').getAttribute('value')).toEqual('test');
        });
        act(()=>{
            // вызываем событие клика на кнопку. При этом событии поле инпута должно очищаться
            fireEvent.click(container.querySelector('button'))
        })
        await waitFor(() => {
            // ожидаем получить в инпуте пустое значение атрибута value
            expect(container.querySelector('input').getAttribute('value')).toEqual('');
        });
    });
})
