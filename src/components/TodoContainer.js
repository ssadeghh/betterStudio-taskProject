import React, { useState, useEffect, useRef } from "react";
import Task from "./Task";
import Button from "./Button";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./constants";
import { v4 as uuidv4 } from "uuid";

export default function TodoContainer({
    className,
    title,
    requirementTasks,
    onDeleteTask,
    setTodos,
    todos,
    onAddTask,
}) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const ref = useRef();
    const [listChangeCheckedbox, setListChangeCheckedbox] = useState([]);
    const timeoutRef = useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            const { index: originalIndex, section: originalSection } = item;
            const newSection = className;
            if (originalSection !== newSection) {
                const updatedOriginalTasks = [...todos[originalSection]];
                const updatedNewTasks = [...todos[newSection]];
                const taskToMove = updatedOriginalTasks.splice(originalIndex, 1)[0];
                if (className === "done") {
                    taskToMove.check = 1;
                } else {
                    taskToMove.check = 0;
                }
                updatedNewTasks.unshift(taskToMove);

                setTodos((prevTodos) => ({
                    ...prevTodos,
                    [originalSection]: updatedOriginalTasks,
                    [newSection]: updatedNewTasks,
                }));
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (listChangeCheckedbox.length > 0) {
            const filteredTasks = listChangeCheckedbox.filter(
                (task) =>
                    todos.todo.every((t) => t.id !== task.id) &&
                    todos.doing.every((t) => t.id !== task.id) &&
                    todos.done.every((t) => t.id !== task.id)
            );

            const updatedTodo = [...todos.todo, ...filteredTasks.filter((task) => !task.check)];
            const updatedDoing = [...todos.doing, ...filteredTasks.filter((task) => !task.check)];
            const updatedDone = [...todos.done, ...filteredTasks.filter((task) => task.check)];
            let finalTodo = []
            let finalDoing = []
            let finalDone = []

            updatedDone.forEach(task => {
                if (task.check == false) {
                    finalTodo.push(task)
                } else {
                    finalDone.push(task)
                }
            });
            updatedTodo.forEach(task => {
                if (task.check == false) {
                    finalTodo.push(task)
                } else {
                    finalDone.push(task)
                }
            });
            updatedDoing.forEach(task => {
                if (task.check == false) {
                    finalDoing.push(task)
                } else {
                    finalDone.push(task)
                }
            });
            console.log(finalTodo)

            const newTimeout = setTimeout(() => {
                setTodos({
                    todo: finalTodo,
                    doing: finalDoing,
                    done: finalDone
                });
                setListChangeCheckedbox([]);
            }, 3000);

            timeoutRef.current = newTimeout;
        }
    }, [listChangeCheckedbox]);

    useEffect(() => {
        drop(ref);
        const handleDragOver = (event) => {
            event.preventDefault();
            setIsDraggingOver(true);
        };

        const handleDragLeave = () => {
            setIsDraggingOver(false);
        };

        ref.current.addEventListener("dragover", handleDragOver);
        ref.current.addEventListener("dragleave", handleDragLeave);

        return () => {
            ref.current.removeEventListener("dragover", handleDragOver);
            ref.current.removeEventListener("dragleave", handleDragLeave);
        };
    }, [drop]);

    const tasks = requirementTasks || [];

    return (
        <div
            className={`${className} todo-container  ${isDraggingOver ? "dragging-over" : ""
                }`}
            ref={ref}
        >
            <div className="todo-header">
                <h3>{title}</h3>
                <small>{tasks.length} Tasks</small>
            </div>

            {tasks.map((task, index) => (
                <div className="tasks" key={uuidv4()}>
                    <Task
                        context={task.title}
                        check={task.check}
                        handleDeleteTask={() => onDeleteTask(index)}
                        index={index}
                        setTodos={setTodos}
                        todos={todos}
                        requirementTasks={requirementTasks}
                        onAddTask={onAddTask}
                        section={className}
                        listChangeCheckedbox={listChangeCheckedbox}
                        setListChangeCheckedbox={setListChangeCheckedbox}
                    />
                </div>
            ))}
            {className === "done" ? (
                ""
            ) : (
                <Button
                    type="add"
                    onClickFun={() => {
                        onAddTask({ id: uuidv4(), title: "", check: 0 });
                    }}
                />
            )}
        </div>
    );
}
