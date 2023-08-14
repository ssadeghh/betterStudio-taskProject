import React, { useEffect, useState } from 'react'
import TodoContainer from './TodoContainer'

export default function Body() {
    const [todos, setTodos] = useState([]);

    const handleDeleteTask = (taskIndex, section) => {
        const updatedTodos = { ...todos };
        updatedTodos[section] = updatedTodos[section].filter((_, index) => index !== taskIndex);
        setTodos(updatedTodos)
    };

    const handleAddTask = (newTask, section) => {
        const updatedTodos = { ...todos };
        updatedTodos[section] = [newTask, ...todos[section]];
        setTodos(updatedTodos)
    };

    useEffect(() => {
        const hasInitialDataLS = localStorage.getItem("hasInitialDataLS");
        if (!hasInitialDataLS) {
            // Pre-save initial information
            const preSavedData = {
                todo: [
                    { title: 'Start with meditation, exercise & breakfast for a productive day', check: 0 },
                    { title: 'Read to learn something new every day', check: 0 },
                    { title: 'Learn something fresh & relevant', check: 0 }
                ],
                doing: [
                    { title: 'Engage & question in meetings', check: 0 },
                    { title: 'Use time-blocking for effective days', check: 0 }
                ],
                done: [
                    { title: 'Use time-blocking for effective days', check: 1 },
                    { title: 'Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating', check: 1 }
                ]
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
        // Update localStorage whenever todos state changes
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]); // This effect runs whenever todos change

    return (
        <div className="body">
            <TodoContainer
                className="todo"
                title="Todo"
                requirementTasks={todos.todo}
                onDeleteTask={(taskIndex) => handleDeleteTask(taskIndex, 'todo')}
                setTodos={setTodos}
                todos={todos}
                onAddTask={(newTask) => handleAddTask(newTask, 'todo')}
            />
            <TodoContainer
                className="doing"
                title="Doing 💪"
                requirementTasks={todos.doing}
                onDeleteTask={(taskIndex) => handleDeleteTask(taskIndex, 'doing')}
                setTodos={setTodos}
                todos={todos}
                onAddTask={(newTask) => handleAddTask(newTask, 'doing')}
            />
            <TodoContainer
                className="done"
                title="Done 🎉"
                requirementTasks={todos.done}
                onDeleteTask={(taskIndex) => handleDeleteTask(taskIndex, 'done')}
                setTodos={setTodos}
                todos={todos} />
        </div>
    )
}
