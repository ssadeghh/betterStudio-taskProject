import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './constants';
import Button from './Button';

export default function Task({
    context,
    check,
    handleDeleteTask,
    index,
    setTodos,
    todos,
    requirementTasks,
    section,
    onAddTask
}) {
    const [, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { index, section },
    });

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [taskCheck, setTaskCheck] = useState([])
    const [text, setText] = useState(context);
    const inputRef = useRef(null);
    const [isChecked, setIsChecked] = useState(check);

    const handleTitleClick = () => {
        setIsEditingTitle(true);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleBlur = () => {
        setIsEditingTitle(false);

        const updatedTasks = [...requirementTasks];
        updatedTasks[index].title = text;
        setTodos({
            ...todos,
            [section]: updatedTasks,
        });
    };

    const timeoutRef = useRef(null);

    const handleCheckboxChange = () => {
        setIsChecked((prevIsChecked) => !prevIsChecked);
        const taskToMove = { ...requirementTasks[index] };
        setTaskCheck(taskToMove.check)
        taskToMove.check = isChecked ? 0 : 1;

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        const newTimeout = setTimeout(() => {
            if (taskCheck !== taskToMove.check) {
                const updatedSectionTasks = [...todos[section]];
                const updatedTargetTasks = isChecked ? [...todos.todo] : [...todos.done];

                updatedSectionTasks.splice(index, 1);
                updatedTargetTasks.unshift(taskToMove);

                setTodos({
                    ...todos,
                    [section]: updatedSectionTasks,
                    [isChecked ? 'todo' : 'done']: updatedTargetTasks,
                });
            }
        }, 3000);

        timeoutRef.current = newTimeout;
    };

    useEffect(() => {
        if (isEditingTitle && inputRef.current) {
            const input = inputRef.current;
            input.focus();
        }
    }, [isEditingTitle]);

    return (
        <div className={`task ${isEditingTitle ? '' : 'dis-flex'}`} ref={drag}>
            <label className="checkbox-container">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className={`checkmark ${isChecked ? 'checked' : ''}`}></span>
            </label>
            {isEditingTitle ? (
                <input
                    ref={inputRef}
                    value={text}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    className="task-input"
                />
            ) : (
                <span
                    onClick={handleTitleClick}
                    className={`${isChecked ? 'text-decoration' : ''}`}
                >
                    {text ? text : <input placeholder="new Task" className="new-task" />}
                </span>
            )}
            <Button
                type="delete"
                onClickFun={() => {
                    handleDeleteTask(index);
                }}
            />
        </div>
    );
}
