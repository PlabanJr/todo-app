import React, { createContext, useState } from "react";
import { Status } from "../store/reducer";

export const TodoContext = createContext<any>({
    count: 0,
    visibleList: Status.ACTIVE,
    setVisibleList: () => { },
    setCount: () => { },
});

export const TodoProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [visibleList, setVisibleList] = useState(
        Status.ACTIVE
    );

    return (
        <TodoContext.Provider
            value={{
                count,
                visibleList,
                setVisibleList,
                setCount,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
