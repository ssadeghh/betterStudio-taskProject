import React, { useEffect, useState } from "react";
import TodoContainer from "./TodoContainer";
import { v4 as uuidv4 } from "uuid";

export default function Body() {
    const [todos, setTodos] = useState([]);

    const handleDeleteTask = (taskIndex, section) => {
        const updatedTodos = { ...todos };
        updatedTodos[section] = updatedTodos[section].filter(
            (_, index) => index !== taskIndex
        );
        setTodos(updatedTodos);
    };

    const handleAddTask = (newTask, section) => {
        const updatedTodos = { ...todos };
        updatedTodos[section] = [newTask, ...todos[section]];
        setTodos(updatedTodos);
    };

    useEffect(() => {
        const hasInitialDataLS = localStorage.getItem("hasInitialDataLS");
        if (!hasInitialDataLS) {
            // Pre-save initial information
            const preSavedData = {
                todo: [
                    {
                        id: uuidv4(),
                        title: "Learn something fresh & relevant",
                        check: false,
                    },
                    {
                        id: uuidv4(),
                        title:
                            "Start with meditation, exercise & breakfast for a productive day",
                        check: false,
                    },
                    {
                        id: uuidv4(),
                        title: "Read to learn something new every day",
                        check: false,
                    },
                ],
                doing: [
                    {
                        id: uuidv4(),
                        title: "Engage & question in meetings",
                        check: false,
                    },
                    {
                        id: uuidv4(),
                        title: "Use time-blocking for effective days",
                        check: false,
                    },
                ],
                done: [
                    {
                        id: uuidv4(),
                        title: "Use time-blocking for effective days",
                        check: true,
                    },
                    {
                        id: uuidv4(),

                        title:
                            "Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating",
                        check: true,
                    },
                ],
            };
            localStorage.setItem("todos", JSON.stringify(preSavedData));
            localStorage.setItem("hasInitialDataLS", "true");
            setTodos(preSavedData);
        } else {
            const storeTodos = localStorage.getItem("todos");
            if (storeTodos) {
                setTodos(JSON.parse(storeTodos));
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]); // This effect runs whenever todos change

    return (
        <div className="body">
            <TodoContainer
                className="todo"
                title="Todo"
                requirementTasks={todos.todo}
                onDeleteTask={(taskIndex) => handleDeleteTask(taskIndex, "todo")}
                setTodos={setTodos}
                todos={todos}
                onAddTask={(newTask) => handleAddTask(newTask, "todo")}
            />
            <TodoContainer
                className="doing"
                title="Doing 💪"
                requirementTasks={todos.doing}
                onDeleteTask={(taskIndex) => handleDeleteTask(taskIndex, "doing")}
                setTodos={setTodos}
                todos={todos}
                onAddTask={(newTask) => handleAddTask(newTask, "doing")}
            />
            <TodoContainer
                className="done"
                title="Done 🎉"
                requirementTasks={todos.done}
                onDeleteTask={(taskIndex) => handleDeleteTask(taskIndex, "done")}
                setTodos={setTodos}
                todos={todos}
            />
        </div>
    );
}
