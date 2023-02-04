import React, { useContext, useMemo, useReducer, useRef } from "react";
import { TodoContext } from "../../context/todoContext";
import todosReducer, {
    ActionTypes,
    initialState, Status, Todo
} from "../../store/reducer";
import Item from "./item";
import "./list.css";

const List = () => {
    const { visibleList, setCount } = useContext(TodoContext)
    const [state, dispatch] = useReducer(
        todosReducer,
        initialState
    );
    const inputRef = useRef<HTMLInputElement>(null);

    const onAddItem = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const todoTitle = inputRef.current?.value as string;
        const currentMilSec = new Date().getMilliseconds();

        const newTodo: Todo = {
            id: `${currentMilSec}-${Math.random() * currentMilSec}`,
            title: todoTitle,
            completed: false,
            isImportant: false
        };

        if (inputRef.current) {
            inputRef.current.value = ''
        }

        dispatch({ type: ActionTypes.ADD_TODO, todo: newTodo });
    };

    const onToggleCompleted = (todo: Todo) => () => {
        dispatch({ type: ActionTypes.UPDATE_TODO, id: todo.id, payload: { completed: !todo.completed } });
    };

    const onToggleImportant = (todo: Todo) => () => {
        dispatch({ type: ActionTypes.UPDATE_TODO, id: todo.id, payload: { isImportant: !todo.isImportant } });
    };

    const onDelete = (id: string) => () => {
        dispatch({ type: ActionTypes.REMOVE_TODO, id });
    };

    const visibleTodos = useMemo(() => {
        const todos = state.todos
        const active: Todo[] = [];
        const done: Todo[] = [];

        todos.forEach((todo: Todo) => {
            if (!todo.completed) {
                if (todo.isImportant) {
                    active.unshift(todo)
                } else {
                    active.push(todo)
                }
            } else {
                done.push(todo)
            }
        })

        return visibleList === Status.DONE ? done : active;
    }, [visibleList, state])

    return (
        <main className="list__wrapper">
            <form className="task__creator" onSubmit={onAddItem}>
                <input
                    placeholder="Add your task here...."
                    ref={inputRef}
                />
                <button type="submit">Add Task</button>
            </form>

            {visibleTodos.length === 0 ?
                <div className="empty__section">No {visibleList === Status.ACTIVE ? 'active' : ''} tasks!</div> :
                <ul className="list">
                    {visibleTodos.map((todo: Todo) => {
                        const { id } = todo;

                        return (
                            <li key={id}>
                                <Item
                                    item={todo}
                                    onDelete={onDelete(id)}
                                    onToggleCompleted={onToggleCompleted(todo)}
                                    onToggleImportant={onToggleImportant(todo)}
                                />
                            </li>
                        );
                    })}
                </ul>}
        </main>
    );
};

export default List;
