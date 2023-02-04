import { Star, X } from "phosphor-react";
import React from "react";
import { Todo } from "../../store/reducer";
import './list.css';

type Props = {
    item: Todo
    onDelete: () => void
    onToggleCompleted: () => void
    onToggleImportant: () => void
}

const Item = (props: Props) => {
    const { item, onDelete, onToggleCompleted, onToggleImportant } = props;

    return (
        <div className={`list__item ${item.completed ? 'done' : 'incomplete'}`}>
            <div className="list__item__left">
                <button className="toggle" onClick={onToggleCompleted} />
                <p>{item.title}</p>
            </div>
            <div className="list__item__right">
                <button className={`star ${item.isImportant && 'important'}`} onClick={onToggleImportant}>
                    <Star size='1.5rem' color="#a7727d" weight={item.isImportant ? 'fill' : 'regular'} />
                </button>
                <button className="delete" onClick={onDelete}>
                    <X size='1.5rem' />
                </button>
            </div>
        </div >
    )
}

export default Item;