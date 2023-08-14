import React, { useState, useRef, useEffect } from 'react'
import Button from './Button';

export default function Task({ context, check, handleDeleteTask, index, setTodos, todos, requirementTasks, section }) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(context)
    const textareaRef = useRef(null)
    const [isChecked, setIsChecked] = useState(check);

    const handleSpanClick = () => {
        setIsEditing(true)
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
        // Update the corresponding task in the state
        const updatedTasks = [...requirementTasks];
        updatedTasks[index].title = event.target.value;

        // Update localStorage
        localStorage.setItem("todos", JSON.stringify(todos));
        setTodos({ ...todos, [requirementTasks]: updatedTasks });
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        // Create a copy of the task to move
        const taskToMove = { ...requirementTasks[index] };

        // Update the task's check property
        taskToMove.check = isChecked ? 0 : 1;

        // Create new instances of task arrays
        const updatedSectionTasks = [...todos[section]];
        const updatedDoneTasks = [...todos.done];

        // Remove task from the current section
        updatedSectionTasks.splice(index, 1);

        // Push the copied task to the "Done" section
        updatedDoneTasks.push(taskToMove);

        // Update the state and localStorage
        setTodos({
            ...todos,
            [section]: updatedSectionTasks,
            done: updatedDoneTasks
        });

        localStorage.setItem("todos", JSON.stringify({
            ...todos,
            [section]: updatedSectionTasks,
            done: updatedDoneTasks
        }));
    };


    useEffect(() => {
        if (isEditing && textareaRef.current) {
            const textarea = textareaRef.current
            const textLength = textarea.value.length
            textarea.setSelectionRange(textLength, textLength)
            textarea.focus()
        }
    }, [isEditing])

    return (
        <div className={`task ${isEditing ? '' : 'dis-flex'}`}>
            <label className="checkbox-container">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className={`checkmark ${isChecked ? 'checked' : ''}`}></span>
            </label>
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    className="task-textarea"
                />
            ) : (
                <span onClick={handleSpanClick} className={`${isChecked ? 'text-decoration' : ''}`}>{text ? text : (<input placeholder="new Task" className='new-task'></input>)}</span>
            )}
            <Button
                type='delete'
                onClickFun={() => {
                    handleDeleteTask(index);
                }}
            />
        </div>
    )
}
