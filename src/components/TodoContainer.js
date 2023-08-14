import React from 'react'
import Task from './Task'
import Button from './Button';

export default function TodoContainer({
    className,
    title,
    requirementTasks,
    onDeleteTask,
    setTodos,
    todos,
    onAddTask
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
