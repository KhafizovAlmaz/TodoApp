export type TodoName = string;

// Созданная задача имеет название и статус готовности
export type Todo = {
    name: string;
    isDone: boolean
}

export type Todos = Todo[];