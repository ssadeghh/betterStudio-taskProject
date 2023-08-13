import React from 'react';

export default function Button({ type, onClickFun }) {
    const buttonText = type === 'add' ? '+' : 'x';

    return (
        <button className={`${type}`} onClick={onClickFun}>
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