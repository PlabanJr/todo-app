import React from "react";
import {
    Status
} from "../../store/reducer";
import "./header.css";

export const VISIBILITY_KEY = 'visibility-list'

const Filters = ({ visibleList, setVisibleList }: { visibleList: Status, setVisibleList: Function }) => {
    const onToggleVisibleList =
        (visibleList: Status) => () => {
            setVisibleList(visibleList)
        };


    return (
        <div className="filters__wrapper">
            <button
                className={
                    visibleList === Status.ACTIVE
                        ? "active"
                        : ""
                }
                onClick={onToggleVisibleList(Status.ACTIVE)}
            >
                Active
            </button>
            <button
                className={
                    visibleList === Status.DONE ? "active" : ""
                }
                onClick={onToggleVisibleList(Status.DONE)}
            >
                Completed
            </button>
        </div>
    );
};

export default Filters;
