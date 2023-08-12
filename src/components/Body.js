import React from 'react'
import TodoContainer from './TodoContainer'
import Task from './Task'

export default function Body() {
    return (
        <div className="body">
            <TodoContainer
                className="todo"
                title="Todo"
                tasksNum="3"
                tasksTitle={[
                    'Start with meditation, exercise & breakfast for a productive day',
                    'Read to learn something new every day',
                    'Learn something fresh & relevant',
                ]}
            />
            <TodoContainer
                className="doing"
                title="Doing 💪"
                tasksNum="2"
                tasksTitle={[
                    'Engage & question in meetings',
                    'Use time-blocking for effective days',
                ]}
            />
            <TodoContainer
                className="done"
                title="Done 🎉"
                tasksNum="2"
                tasksTitle={[
                    'Finished online course - check!',
                    'Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating',
                ]}
                check="true"
            />
        </div>
    )
}
