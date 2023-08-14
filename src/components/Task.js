import React, { useState, useRef, useEffect } from 'react'
import { useDrag } from 'react-dnd';
import { ItemTypes } from './constants';
import Button from './Button';

export default function Task({ context, check, handleDeleteTask, index, setTodos, todos, requirementTasks, section }) {
    const [, drag] = useDrag({
        type: ItemTypes.TASK, // Specify the item type
        item: { index, section }, // Data to be transferred during the drag
    });
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
        setTodos({
            ...todos,
            [section]: updatedTasks,
        });
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    const handleCheckboxChange = () => {
        setIsChecked(prevIsChecked => !prevIsChecked); // Use functional update

        // Create a copy of the task to move
        const taskToMove = { ...requirementTasks[index] };

        // Update the task's check property
        taskToMove.check = isChecked ? 0 : 1; // Reverse the check values

        // Create new instances of task arrays
        const updatedSectionTasks = [...todos[section]];
        const updatedTargetTasks = isChecked ? [...todos.todo] : [...todos.done]; // Reverse the target sections

        // Remove task from the current section
        updatedSectionTasks.splice(index, 1);

        // Push the copied task to the target section
        updatedTargetTasks.unshift(taskToMove);

        // Update the state and localStorage
        setTimeout(() => {
            setTodos({
                ...todos,
                [section]: updatedSectionTasks,
                [isChecked ? "todo" : "done"]: updatedTargetTasks // Reverse the target section keys
            });
        }, 3000);
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
        <div className={`task ${isEditing ? '' : 'dis-flex'}`} ref={drag}>
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
