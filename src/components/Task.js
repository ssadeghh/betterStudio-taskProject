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
}) {
    const [, drag] = useDrag({
        type: ItemTypes.TASK,
        item: { index, section },
    });

    const [isEditingTitle, setIsEditingTitle] = useState(false);
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

    const handleCheckboxChange = () => {
        setIsChecked((prevIsChecked) => !prevIsChecked);

        const taskToMove = { ...requirementTasks[index] };
        taskToMove.check = isChecked ? 0 : 1;

        const updatedSectionTasks = [...todos[section]];
        const updatedTargetTasks = isChecked ? [...todos.todo] : [...todos.done];

        updatedSectionTasks.splice(index, 1);
        updatedTargetTasks.unshift(taskToMove);

        setTimeout(() => {
            setTodos({
                ...todos,
                [section]: updatedSectionTasks,
                [isChecked ? 'todo' : 'done']: updatedTargetTasks,
            });
        }, 3000);
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
