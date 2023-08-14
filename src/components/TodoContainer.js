import React, { useState, useEffect, useRef } from 'react'
import Task from './Task'
import Button from './Button';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './constants';

export default function TodoContainer({
    className,
    title,
    requirementTasks,
    onDeleteTask,
    setTodos,
    todos,
    onAddTask
}) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const ref = useRef();

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => {
            const { index: originalIndex, section: originalSection } = item;
            const newSection = className; // The current section where the drop occurred
            if (originalSection !== newSection) {
                // Handle the task movement from originalSection to newSection
                const updatedOriginalTasks = [...todos[originalSection]];
                const updatedNewTasks = [...todos[newSection]];
                const taskToMove = updatedOriginalTasks.splice(originalIndex, 1)[0];
                if (className === 'done') {
                    taskToMove.check = 1;
                } else {
                    taskToMove.check = 0; // Reset check status when moving tasks
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
        drop(ref); // Pass the ref of the container to the drop function

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
        <div className={`${className} todo-container  ${isDraggingOver ? "dragging-over" : ""}`} ref={ref}>
            <div className="todo-header">
                <h3>{title}</h3>
                <small>{tasks.length} Tasks</small>
            </div>

            {tasks.map((task, index) => (
                <div className="tasks" key={index}>
                    <Task
                        context={task.title}
                        check={task.check}
                        handleDeleteTask={() => onDeleteTask(index)}
                        index={index}
                        setTodos={setTodos}
                        todos={todos}
                        requirementTasks={requirementTasks}
                        onAddTask={onAddTask}
                        section={className} />
                </div>
            ))}
            {className === 'done' ? '' : <Button
                type='add'
                onClickFun={() => { onAddTask({ title: '', check: 0 }); }} />}
        </div>
    )
}
