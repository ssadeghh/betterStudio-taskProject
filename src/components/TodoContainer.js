import React from 'react'
import Task from './Task'
import Button from './Button';

export default function TodoContainer({
    className,
    title,
    requirementTasks,
}) {
    const tasks = requirementTasks || [];

    return (
        <div className={`${className} todo-container`}>
            <div className="todo-header">
                <h3>{title}</h3>
                <small>{tasks.length} Tasks</small>
            </div>

            {tasks.map((task, index) => (
                <div className="tasks" key={index}>
                    <Task context={task.title} check={task.check} />
                    <Button type='delete' />
                </div>
            ))}
            {className === 'done' ? '' : <Button type='add' />}
        </div>
    )
}
