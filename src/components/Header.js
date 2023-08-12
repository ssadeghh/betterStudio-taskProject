import React from 'react'
import CheckIcon from '../icons/check.png'

export default function Header() {
    return (
        <header>
            <div className="top-header">
                <img src={CheckIcon} alt="CheckIcon" />
                <h2>Task List</h2>
            </div>
            <div className="bottom-header">
                <p>Break your life to simple tasks to get things done!</p>
                <p>
                    Does not matter how many tasks you done, It’s important to
                    break to small tasks and be on progress.
                </p>
            </div>
        </header>
    )
}
