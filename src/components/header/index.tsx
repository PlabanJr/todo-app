import React, { useContext, useMemo } from "react";
import { TodoContext } from "../../context/todoContext";
import Filters from "./filters";
import './header.css';

const Header = () => {
    const { count, visibleList, setVisibleList } = useContext(TodoContext)

    const today = useMemo(() => {
        const now = new Date();
        const date = now.toLocaleString('en-us', {
            weekday: "long",
            month: "long",
            day: "numeric",
        })
        return date;
    }, [])

    return (
        <nav className="header">
            <div className="header__left">
                <h1>{today}</h1>
                <span className="active__tasks__count">{count} active tasks</span>
            </div>

            <div>
                <Filters visibleList={visibleList} setVisibleList={setVisibleList} />
            </div>
        </nav>
    )
}

export default Header;