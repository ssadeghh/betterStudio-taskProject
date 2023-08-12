import React from 'react'

export default function TodoContainer({ className, title, tasksNum }) {
    return (
        <div className={`${className} todo-container`}>
            <div className="todo-header">
                <h3>{title}</h3>
                <small>{tasksNum} Tasks</small>
            </div>
        </div>
    )
}
