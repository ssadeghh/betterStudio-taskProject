import React from 'react'
import Task from './Task'

export default function TodoContainer({
    className,
    title,
    tasksNum,
    tasksTitle,
    check,
}) {
    const tasks = tasksTitle

    return (
        <div className={`${className} todo-container`}>
            <div className="todo-header">
                <h3>{title}</h3>
                <small>{tasksNum} Tasks</small>
            </div>

            {tasks.map((task, index) => (
                <div className="tasks">
                    <Task key={index} context={task} check={check} />
                </div>
            ))}
        </div>
    )
}
