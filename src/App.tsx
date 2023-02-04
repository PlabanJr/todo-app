import React from "react";
import "./App.css";
import Header from "./components/header";
import List from "./components/list";
import { TodoProvider } from "./context/todoContext";

function App() {
  return (
    <TodoProvider>
      <div className="app__wrapper">
        <Header />
        <List />
      </div>
    </TodoProvider>
  );
}

export default App;
