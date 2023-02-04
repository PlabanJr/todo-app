export enum Status {
    ACTIVE = 'active',
    DONE = 'done',
}

export enum ActionTypes {
    ADD_TODO,
    REMOVE_TODO,
    UPDATE_TODO,
}

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    isImportant: boolean;
};

export type TodoState = {
    todos: Todo[];
};

export const initialState: TodoState = {
    todos: [],
};

const todosReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TODO:
            return { ...state, todos: [action.todo, ...state.todos] };

        case ActionTypes.REMOVE_TODO: {
            const updatedTodos = state.todos.filter(
                (todo: Todo) => todo.id !== action.id
            );

            return { ...state, todos: updatedTodos };
        }

        case ActionTypes.UPDATE_TODO: {
            const updatedTodos = state.todos.map(
                (todo: Todo) => {
                    if (todo.id === action.id) {
                        todo = { ...todo, ...action.payload }
                    }

                    return todo
                }
            );

            return { ...state, todos: updatedTodos };
        }

        default:
            return initialState;
    }
};

export default todosReducer;
