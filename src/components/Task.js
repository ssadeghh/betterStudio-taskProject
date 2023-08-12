import React, { useState, useRef, useEffect } from 'react'

export default function Task({ context, check }) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(context)
    const textareaRef = useRef(null)
    const [isChecked, setIsChecked] = useState(check);

    const handleSpanClick = () => {
        setIsEditing(true)
    }

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
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
        <div className="task">
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
                <span onClick={handleSpanClick} className={`${isChecked ? 'text-decoration' : ''}`}>{text}</span>
            )}
        </div>
    )
}
