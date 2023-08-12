import React from 'react'
import TodoContainer from './TodoContainer'

export default function Body() {
    return (
        <div className="body">
            <TodoContainer className="todo" title="Todo" tasksNum="3" />
            <TodoContainer className="doing" title="Doing 💪" tasksNum="2" />
            <TodoContainer className="done" title="Done 🎉" tasksNum="2" />
        </div>
    )
}
