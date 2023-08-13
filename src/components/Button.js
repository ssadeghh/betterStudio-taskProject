import React from 'react';

export default function Button({ type }) {
    const buttonText = type === 'add' ? '+' : 'x';

    return (
        <button className={`${type}`}>
            {type === 'add' ? (
                <span className="icon-button">
                    {buttonText}
                </span>
            ) : (
                buttonText
            )}
            {type === 'add' ? ' New' : ''}
        </button>
    );
}