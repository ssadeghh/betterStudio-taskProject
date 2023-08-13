import React, { useEffect, useState } from 'react'
import TodoContainer from './TodoContainer'
import Task from './Task'

export default function Body() {
    const [todos, setTodos] = useState([]);
    const [hasInitialData, setHasInitialData] = useState(false);

    useEffect(() => {
        const storedHasInitialData = localStorage.getItem("hasInitialData");

        if (storedHasInitialData) {
            setHasInitialData(true);
            const storeTodos = localStorage.getItem("todos");
            if (storeTodos) {
                setTodos(JSON.parse(storeTodos));
            }
        }
    }, []);

    useEffect(() => {
        if (!hasInitialData) {
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
            localStorage.setItem("hasInitialData", true);
            setTodos(preSavedData);
            setHasInitialData(true);
        }
    }, [hasInitialData]);

    // const saveDataToLocalStorage = () => {
    //     // Save data to localStorage
    //     const dataToSave = { todo: ['another one'] };
    //     localStorage.setItem("todos", JSON.stringify(dataToSave));
    //     setTodos(dataToSave); // Update state
    // };

    return (
        <div className="body">
            <TodoContainer
                className="todo"
                title="Todo"
                tasksNum="3"
                requirementTasks={todos.todo}
            />
            <TodoContainer
                className="doing"
                title="Doing 💪"
                tasksNum="2"
                requirementTasks={todos.doing}
            />
            <TodoContainer
                className="done"
                title="Done 🎉"
                tasksNum="2"
                requirementTasks={todos.done}
            />
        </div>
    )
}
