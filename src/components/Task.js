import React, { useState, useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";
import Button from "./Button";

export default function Task({
    context,
    check,
    handleDeleteTask,
    index,
    setTodos,
    todos,
    requirementTasks,
    section,
    onAddTask,
    listChangeCheckedbox,
    setListChangeCheckedbox,
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

    const timeoutRef = useRef(null);

    const handleCheckboxChange = () => {
        setIsChecked((prevIsChecked) => !prevIsChecked);
        const updatedTasks = [...requirementTasks];
        updatedTasks[index].check = !isChecked;

        const uniqueIds = new Set();
        const uniqueArray = [];

        let temp_array = [...listChangeCheckedbox, updatedTasks[index]];
        for (const obj of temp_array) {
            if (!uniqueIds.has(obj.id)) {
                uniqueIds.add(obj.id);
                uniqueArray.push(obj);
            }
        }

        setListChangeCheckedbox(uniqueArray);
    };

    useEffect(() => {
        if (isEditingTitle && inputRef.current) {
            const input = inputRef.current;
            input.focus();
        }
    }, [isEditingTitle]);

    return (
        <div className={`task ${isEditingTitle ? "" : "dis-flex"}`} ref={drag}>
            <label className="checkbox-container">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className={`checkmark ${isChecked ? "checked" : ""}`}></span>
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
                    className={`${isChecked ? "text-decoration" : ""}`}
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
